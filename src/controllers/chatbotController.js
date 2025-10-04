import ChatMessage from '../models/ChatMessage.js';
import UserProfile from '../models/UserProfile.js';
import ErrorResponse from '../utils/errorResponse.js';

// Simple keyword-based response system (can be replaced with AI/ML model)
const generateResponse = async (message, userId) => {
  const lowerMessage = message.toLowerCase();
  
  // Get user profile for personalized responses
  const profile = await UserProfile.findOne({ user: userId });
  
  let response = '';
  let intent = 'general';
  let confidence = 0.5;
  let sentiment = 'neutral';
  let tags = [];
  let isUrgent = false;

  // Emergency keywords
  if (
    lowerMessage.includes('bleeding') ||
    lowerMessage.includes('severe pain') ||
    lowerMessage.includes('emergency') ||
    lowerMessage.includes('cant breathe') ||
    lowerMessage.includes('chest pain')
  ) {
    response = '⚠️ This sounds like an emergency. Please call emergency services immediately or go to the nearest hospital. If you\'re experiencing severe bleeding, severe abdominal pain, difficulty breathing, or chest pain, seek immediate medical attention.';
    intent = 'emergency';
    confidence = 0.95;
    sentiment = 'urgent';
    tags = ['emergency', 'urgent'];
    isUrgent = true;
  }
  // Blood pressure queries
  else if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
    if (profile && profile.bloodPressure) {
      response = `Your last recorded blood pressure was ${profile.bloodPressure.systolic}/${profile.bloodPressure.diastolic} mmHg on ${new Date(profile.bloodPressure.lastChecked).toLocaleDateString()}. Normal blood pressure during pregnancy is below 140/90 mmHg. If you're experiencing headaches, vision changes, or swelling, please contact your healthcare provider.`;
    } else {
      response = 'Blood pressure monitoring is important during pregnancy. Normal BP is below 140/90 mmHg. Please track your readings regularly and consult your healthcare provider if you notice any concerning changes.';
    }
    intent = 'health_query';
    confidence = 0.85;
    tags = ['blood_pressure', 'vital_signs'];
  }
  // Fetal movement queries
  else if (lowerMessage.includes('baby') && (lowerMessage.includes('movement') || lowerMessage.includes('kick'))) {
    response = 'Fetal movements are a good sign of your baby\'s well-being. You should feel at least 10 movements in 2 hours. If you notice decreased movement or no movement for several hours, contact your healthcare provider immediately.';
    intent = 'fetal_movement';
    confidence = 0.9;
    tags = ['fetal_movement', 'baby_health'];
  }
  // Nutrition queries
  else if (lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
    response = 'During pregnancy, focus on a balanced diet rich in:\n• Fruits and vegetables\n• Whole grains\n• Lean proteins\n• Dairy products\n• Prenatal vitamins with folic acid\n\nAvoid raw fish, unpasteurized dairy, deli meats, and limit caffeine. Stay hydrated by drinking plenty of water.';
    intent = 'nutrition';
    confidence = 0.8;
    tags = ['nutrition', 'diet', 'lifestyle'];
  }
  // Exercise queries
  else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('physical activity')) {
    response = 'Regular exercise during pregnancy is beneficial! Aim for 30 minutes of moderate activity most days. Safe activities include walking, swimming, prenatal yoga, and stationary cycling. Avoid contact sports and activities with fall risk. Always consult your healthcare provider before starting any exercise program.';
    intent = 'exercise';
    confidence = 0.85;
    tags = ['exercise', 'physical_activity', 'lifestyle'];
  }
  // Medication queries
  else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('drug')) {
    response = 'Always consult your healthcare provider before taking any medication during pregnancy. Some medications are safe, while others may harm your baby. Never stop prescribed medications without medical advice. Keep a list of all medications you\'re taking.';
    intent = 'medication';
    confidence = 0.9;
    tags = ['medication', 'safety'];
  }
  // Symptoms queries
  else if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('discomfort')) {
    response = 'Common pregnancy symptoms include nausea, fatigue, back pain, and swelling. However, contact your healthcare provider if you experience:\n• Severe abdominal pain\n• Heavy bleeding\n• Severe headaches\n• Vision changes\n• Sudden swelling\n• Fever over 100.4°F\n• Decreased fetal movement';
    intent = 'symptoms';
    confidence = 0.75;
    tags = ['symptoms', 'health_concerns'];
  }
  // Appointment queries
  else if (lowerMessage.includes('appointment') || lowerMessage.includes('checkup') || lowerMessage.includes('visit')) {
    response = 'Regular prenatal checkups are essential. Typical schedule:\n• Weeks 4-28: Every 4 weeks\n• Weeks 28-36: Every 2 weeks\n• Weeks 36-40: Weekly\n\nYour healthcare provider may adjust this based on your needs. Use the calendar feature to track your appointments.';
    intent = 'appointment';
    confidence = 0.85;
    tags = ['appointment', 'prenatal_care'];
  }
  // Gestational age queries
  else if (lowerMessage.includes('week') || lowerMessage.includes('trimester') || lowerMessage.includes('due date')) {
    if (profile && profile.gestationalAgeWeeks) {
      const trimester = profile.gestationalAgeWeeks <= 13 ? 'first' : profile.gestationalAgeWeeks <= 27 ? 'second' : 'third';
      response = `You are currently at ${profile.gestationalAgeWeeks} weeks of pregnancy (${trimester} trimester). Each week brings new developments for your baby. Make sure to attend all scheduled prenatal appointments.`;
    } else {
      response = 'Pregnancy is divided into three trimesters:\n• First trimester: Weeks 1-13\n• Second trimester: Weeks 14-27\n• Third trimester: Weeks 28-40\n\nPlease update your profile with your gestational age for personalized information.';
    }
    intent = 'gestational_age';
    confidence = 0.8;
    tags = ['gestational_age', 'pregnancy_info'];
  }
  // Greeting
  else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    response = 'Hello! I\'m here to help you with pregnancy-related questions and information. How can I assist you today?';
    intent = 'greeting';
    confidence = 0.95;
    sentiment = 'positive';
    tags = ['greeting'];
  }
  // Default response
  else {
    response = 'Thank you for your message. I\'m here to provide general pregnancy information. For specific medical advice, please consult your healthcare provider. You can ask me about:\n• Nutrition and diet\n• Exercise and physical activity\n• Common symptoms\n• Prenatal care\n• Fetal development\n• Emergency signs';
    intent = 'general';
    confidence = 0.5;
    tags = ['general'];
  }

  return {
    response,
    intent,
    confidence,
    sentiment,
    tags,
    isUrgent
  };
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
        message: chatMessage.message,
        response: chatMessage.response,
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
      .sort({ createdAt: -1 })
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
