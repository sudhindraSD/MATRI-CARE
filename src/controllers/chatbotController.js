import { GoogleGenerativeAI } from '@google/generative-ai';
import ChatMessage from '../models/ChatMessage.js';
import UserProfile from '../models/UserProfile.js';
import ErrorResponse from '../utils/errorResponse.js';

// Initialize Google Gemini AI with validation
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('🚨 GEMINI_API_KEY is not set in environment variables!');
} else {
  console.log('✅ Gemini API Key loaded:', apiKey.substring(0, 20) + '...');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Test API connection on startup
if (apiKey) {
  (async () => {
    try {
      console.log('📞 Testing Gemini API connection...');
      const result = await model.generateContent('Hello, this is a test message.');
      const response = await result.response;
      console.log('✅ Gemini API connection successful!');
      console.log('💬 Test response:', response.text().substring(0, 50) + '...');
    } catch (error) {
      console.error('❌ Gemini API connection failed:', error.message);
    }
  })();
}

// AI-powered response generation with user context
const generateResponse = async (message, userId) => {
  try {
    // Get user profile for personalized responses
    const profile = await UserProfile.findOne({ user: userId });
    
    // Build personalized context
    let userContext = 'User Profile: ';
    if (profile) {
      if (profile.gestationalAgeWeeks) {
        userContext += `Currently ${profile.gestationalAgeWeeks} weeks pregnant. `;
      }
      if (profile.age) {
        userContext += `Age: ${profile.age} years. `;
      }
      if (profile.bloodPressure?.systolic) {
        userContext += `Last BP: ${profile.bloodPressure.systolic}/${profile.bloodPressure.diastolic} mmHg. `;
      }
      if (profile.weight && profile.height) {
        const bmi = (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1);
        userContext += `BMI: ${bmi}. `;
      }
      if (profile.hasHypertension) userContext += 'Has hypertension. ';
      if (profile.hasDiabetes) userContext += 'Has diabetes. ';
      if (profile.stressLevel) userContext += `Stress level: ${profile.stressLevel}/10. `;
    }
    
    // Check for emergency keywords first
    const emergencyKeywords = [
      'bleeding', 'severe pain', 'emergency', 'cant breathe', 'chest pain',
      'heavy bleeding', 'sudden severe headache', 'vision problems', 'seizure',
      'high fever', 'severe vomiting', 'water broke', 'contractions'
    ];
    
    const isEmergency = emergencyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    
    if (isEmergency) {
      return {
        response: '🚨 EMERGENCY ALERT: Based on your message, this could be a medical emergency. Please call emergency services (911) immediately or go to the nearest hospital emergency room right away. Do not wait - your safety and your baby\'s safety are the top priority.',
        intent: 'emergency',
        confidence: 0.95,
        sentiment: 'urgent',
        tags: ['emergency', 'urgent'],
        isUrgent: true
      };
    }
    
    // Create comprehensive prompt for AI with formatting
    const prompt = `You are MATRI-CARE AI, a pregnancy health assistant. 

${userContext}

User Question: "${message}"

FORMATTING REQUIREMENTS:
1. Start with emoji + **bold heading**
2. Use **bold** for key terms and sections
3. Use bullet points with • for lists
4. Structure with clear sections
5. Add emojis for visual appeal
6. Use line breaks between sections

CONTENT GUIDELINES:
• Give direct, focused answers
• Keep responses under 200 words
• Use simple language
• Include medical disclaimers when needed
• Be warm and supportive

EXAMPLE FORMAT:
🤰 **Main Topic**

**Key Points:**
• Important point 1
• Important point 2

**When to Call Doctor:**
• Serious symptom 1
• Serious symptom 2

⚠️ **Note:** Consult your healthcare provider for personalized advice.

Now respond following this format:`;

    console.log('🤖 Sending request to Gemini AI...');
    console.log('Prompt length:', prompt.length);
    
    // Generate AI response with timeout
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout after 30 seconds')), 30000)
      )
    ]);
    
    const response = await result.response;
    const responseText = response.text();
    
    console.log('✅ AI Response received, length:', responseText.length);
    
    // Analyze intent and sentiment
    let intent = 'general';
    let confidence = 0.8;
    let sentiment = 'neutral';
    let tags = [];
    
    // Simple intent classification
    const messageLower = message.toLowerCase();
    if (messageLower.includes('eat') || messageLower.includes('food') || messageLower.includes('diet')) {
      intent = 'nutrition';
      tags = ['nutrition', 'diet'];
    } else if (messageLower.includes('exercise') || messageLower.includes('workout')) {
      intent = 'exercise';
      tags = ['exercise', 'fitness'];
    } else if (messageLower.includes('symptom') || messageLower.includes('pain')) {
      intent = 'symptoms';
      tags = ['symptoms', 'health'];
    } else if (messageLower.includes('baby') || messageLower.includes('fetal')) {
      intent = 'fetal_development';
      tags = ['baby', 'development'];
    } else if (messageLower.includes('appointment') || messageLower.includes('doctor')) {
      intent = 'medical_care';
      tags = ['appointments', 'medical'];
    }
    
    return {
      response: responseText,
      intent,
      confidence,
      sentiment,
      tags,
      isUrgent: false
    };
    
  } catch (error) {
    console.error('🚨 AI Response Error Details:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    
    // More specific error handling
    let fallbackMessage = 'I\'m having trouble connecting to my AI services right now. ';
    
    if (error.message && error.message.includes('API_KEY')) {
      fallbackMessage += 'There seems to be an issue with the API configuration. ';
    } else if (error.message && error.message.includes('quota')) {
      fallbackMessage += 'The AI service is temporarily at capacity. ';
    } else if (error.message && error.message.includes('network')) {
      fallbackMessage += 'There\'s a network connectivity issue. ';
    }
    
    fallbackMessage += 'For your safety, please consult with your healthcare provider about your question. You can also find reliable pregnancy information from reputable sources like the American College of Obstetricians and Gynecologists (ACOG).';
    
    // Fallback response if AI fails
    return {
      response: fallbackMessage,
      intent: 'fallback',
      confidence: 0.3,
      sentiment: 'neutral',
      tags: ['fallback', 'error'],
      isUrgent: false
    };
  }
};

// @desc    Send message to chatbot
// @route   POST /api/v1/chatbot/message  
// @access  Private
export const sendMessage = async (req, res, next) => {
  try {
    const { message, response, intent, confidence, source, isUrgent, tags } = req.body;

    if (!message || message.trim() === '') {
      return next(new ErrorResponse('Please provide a message', 400));
    }

    let finalResponse, finalIntent, finalConfidence, finalSentiment, finalTags, finalIsUrgent;

    // 🎯 HYBRID MODE: If response is provided (from client-side chatbot), use it
    if (response) {
      console.log('💾 Saving hybrid client-side chatbot response to MongoDB');
      finalResponse = response;
      finalIntent = intent || 'general';
      finalConfidence = confidence || 0.85;
      finalSentiment = isUrgent ? 'urgent' : 'neutral';
      finalTags = tags || [];
      finalIsUrgent = isUrgent || false;
    } else {
      // 🤖 FALLBACK: Generate response using backend AI if no response provided
      console.log('🤖 Generating backend AI response');
      const aiResponse = await generateResponse(message, req.user.id);
      finalResponse = aiResponse.response;
      finalIntent = aiResponse.intent;
      finalConfidence = aiResponse.confidence;
      finalSentiment = aiResponse.sentiment;
      finalTags = aiResponse.tags;
      finalIsUrgent = aiResponse.isUrgent;
    }

    // Save chat message to MongoDB
    const chatMessage = await ChatMessage.create({
      user: req.user.id,
      message: message.trim(),
      response: finalResponse,
      intent: finalIntent,
      confidence: finalConfidence,
      sentiment: finalSentiment,
      tags: finalTags,
      isUrgent: finalIsUrgent,
      flaggedForReview: finalIsUrgent,
      context: {
        source: source || 'backend_ai',
        hybrid: !!response // Track if this was from hybrid approach
      }
    });

    console.log('✅ Chat message saved to MongoDB:', chatMessage._id);

    res.status(200).json({
      success: true,
      data: {
        _id: chatMessage._id,
        message: chatMessage.message,
        response: chatMessage.response,
        sender: 'bot',
        intent: chatMessage.intent,
        confidence: chatMessage.confidence,
        source: source || 'backend_ai',
        isUrgent: chatMessage.isUrgent,
        timestamp: chatMessage.createdAt
      }
    });
  } catch (err) {
    console.error('❌ Error saving chat message:', err);
    next(err);
  }
};

// @desc    Get chat history
// @route   GET /api/v1/chatbot/history
// @access  Private
export const getChatHistory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const chatMessages = await ChatMessage.find({ user: req.user.id })
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip(skip);

    // 💬 FORMAT FOR FRONTEND: Convert to alternating user/bot message format
    const formattedMessages = [];
    chatMessages.forEach(msg => {
      // Add user message
      formattedMessages.push({
        _id: msg._id + '_user',
        message: msg.message,
        sender: 'user',
        timestamp: msg.createdAt
      });
      
      // Add bot response
      formattedMessages.push({
        _id: msg._id,
        message: msg.message,
        response: msg.response,
        sender: 'bot',
        timestamp: msg.createdAt,
        isUrgent: msg.isUrgent,
        source: msg.context?.source || 'backend_ai',
        confidence: msg.confidence,
        category: msg.intent,
        tier: msg.context?.source === 'gemini_ai' ? 2 : (msg.context?.hybrid ? 1 : 2)
      });
    });

    const total = await ChatMessage.countDocuments({ user: req.user.id });

    console.log(`📋 Loaded ${formattedMessages.length} messages for user ${req.user.id}`);

    res.status(200).json({
      success: true,
      count: formattedMessages.length,
      total: total * 2, // Each chat message creates 2 UI messages
      page,
      pages: Math.ceil(total / limit),
      data: formattedMessages
    });
  } catch (err) {
    console.error('❌ Error fetching chat history:', err);
    next(err);
  }
};

// @desc    Get urgent messages (for health workers)
// @route   GET /api/v1/chatbot/urgent
// @access  Private/HealthWorkers
export const getUrgentMessages = async (req, res, next) => {
  try {
    const messages = await ChatMessage.find({
      isUrgent: true,
      flaggedForReview: true
    })
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark message as reviewed
// @route   PUT /api/v1/chatbot/review/:id
// @access  Private/HealthWorkers
export const reviewMessage = async (req, res, next) => {
  try {
    const { reviewNotes } = req.body;

    const message = await ChatMessage.findByIdAndUpdate(
      req.params.id,
      {
        flaggedForReview: false,
        reviewedBy: req.user.id,
        reviewNotes
      },
      { new: true, runValidators: true }
    );

    if (!message) {
      return next(
        new ErrorResponse(`Message not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (err) {
    next(err);
  }
};
