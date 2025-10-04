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
    
    // Create comprehensive prompt for AI
    const prompt = `You are MATRI-CARE AI, a pregnancy health assistant. 

${userContext}

User Question: "${message}"

IMPORTANT: Give CLEAR, DIRECT, and FOCUSED answers. Don't overwhelm with too much information.

Guidelines:
1. Start with a direct answer to the question
2. Keep it simple and easy to understand
3. Use the user's profile information when relevant
4. Give 2-3 key practical points maximum
5. Be warm but concise
6. If serious, clearly state when to contact a doctor
7. Maximum 150 words - be concise!
8. Use simple language, avoid medical jargon
9. Focus ONLY on what they asked about
10. Don't add unnecessary background information

Respond as MATRI-CARE AI:`;

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
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return next(new ErrorResponse('Please provide a message', 400));
    }

    // Generate response
    const {
      response,
      intent,
      confidence,
      sentiment,
      tags,
      isUrgent
    } = await generateResponse(message, req.user.id);

    // Save chat message
    const chatMessage = await ChatMessage.create({
      user: req.user.id,
      message: message.trim(),
      response,
      intent,
      confidence,
      sentiment,
      tags,
      isUrgent,
      flaggedForReview: isUrgent
    });

    res.status(200).json({
      success: true,
      data: {
        _id: chatMessage._id,
        message: chatMessage.message,
        response: chatMessage.response,
        sender: 'bot',
        intent: chatMessage.intent,
        isUrgent: chatMessage.isUrgent,
        timestamp: chatMessage.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get chat history
// @route   GET /api/v1/chatbot/history
// @access  Private
export const getChatHistory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const messages = await ChatMessage.find({ user: req.user.id })
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip(skip);

    const total = await ChatMessage.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: messages
    });
  } catch (err) {
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
