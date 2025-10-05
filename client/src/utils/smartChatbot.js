// 🤖 SMART HYBRID CHATBOT SYSTEM
// Prioritizes custom dataset first, then falls back to external AI

// 📚 CUSTOM PREGNANCY KNOWLEDGE BASE
const PREGNANCY_DATASET = {
  // General Pregnancy Questions
  nutrition: {
    keywords: ['eat', 'food', 'diet', 'nutrition', 'hungry', 'appetite', 'meal', 'snack', 'vitamin', 'iron', 'anemia', 'deficiency'],
    responses: {
      'what should i eat': {
        answer: "🍎 Great question! During pregnancy, focus on:\n\n🥗 **Balanced Meals:**\n• Leafy greens (spinach, kale) - rich in folate\n• Lean proteins (chicken, fish, eggs, dal)\n• Whole grains (brown rice, oats, quinoa)\n• Dairy products (milk, yogurt, paneer)\n\n🍊 **Essential Nutrients:**\n• Iron-rich foods (beans, meat, dried fruits)\n• Calcium sources (dairy, sesame seeds)\n• Omega-3 (fish, walnuts, flaxseeds)\n\n❌ **Avoid:** Raw fish, unpasteurized dairy, excessive caffeine, alcohol\n\nEat small, frequent meals to manage nausea! 💝",
        confidence: 0.95,
        category: 'nutrition',
        source: 'custom_dataset'
      },
      'foods to avoid': {
        answer: "⚠️ Important foods to avoid during pregnancy:\n\n🐟 **Seafood:**\n• Raw/undercooked fish (sushi, sashimi)\n• High mercury fish (shark, king mackerel)\n• Raw shellfish\n\n🥛 **Dairy:**\n• Unpasteurized milk and cheese\n• Soft cheeses (brie, camembert)\n\n🥩 **Meat & Eggs:**\n• Raw or undercooked meat\n• Raw eggs (cookie dough, mayo)\n• Deli meats (unless heated)\n\n☕ **Beverages:**\n• Alcohol (completely avoid)\n• Limit caffeine (<200mg/day)\n• Energy drinks\n\nWhen in doubt, cook it thoroughly! 🔥",
        confidence: 0.98,
        category: 'safety',
        source: 'custom_dataset'
      },
      'iron rich foods': {
        answer: "🩸 Iron-rich foods for pregnancy power:\n\n🥩 **Best Iron Sources:**\n• Red meat (beef, lamb) - highest absorption\n• Chicken and turkey\n• Fish (salmon, sardines, tuna)\n• Liver (small amounts only)\n\n🌱 **Plant-Based Iron:**\n• Spinach, kale, Swiss chard\n• Beans, lentils, chickpeas\n• Tofu and tempeh\n• Pumpkin seeds, cashews\n• Dark chocolate (in moderation)\n\n🍎 **Iron-Fortified Foods:**\n• Fortified cereals and breads\n• Fortified plant milks\n• Fortified nutritional yeast\n\n💡 **Boost Absorption:**\n• Pair with vitamin C (citrus, tomatoes, bell peppers)\n• Cook in cast iron cookware\n• Add lemon juice to meals\n\n❌ **Avoid With Iron:**\n• Tea and coffee (wait 1-2 hours)\n• Calcium supplements\n• Whole grains (at same meal)\n\nAim for 27mg iron daily during pregnancy! 💪",
        confidence: 0.95,
        category: 'nutrition',
        source: 'custom_dataset'
      }
    }
  },

  symptoms: {
    keywords: ['symptom', 'feel', 'pain', 'nausea', 'tired', 'fatigue', 'sick', 'uncomfortable', 'deficient', 'iron', 'weak', 'dizzy', 'breathless'],
    responses: {
      'morning sickness': {
        answer: "🤢 Morning sickness is very common! Here's how to manage it:\n\n✨ **Natural Remedies:**\n• Ginger tea or ginger candies\n• Small, frequent meals (every 2-3 hours)\n• Crackers before getting out of bed\n• Peppermint tea or aromatherapy\n\n🍋 **Helpful Foods:**\n• Bland foods (toast, rice, bananas)\n• Cold foods (they have less smell)\n• Lemon water or lemon drops\n• Avoid spicy, greasy, or strong-smelling foods\n\n⏰ **When to Call Doctor:**\n• Severe vomiting (can't keep fluids down)\n• Weight loss\n• Dehydration signs\n\nThis usually improves by 12-16 weeks! 💪",
        confidence: 0.92,
        category: 'symptoms',
        source: 'custom_dataset'
      },
      'fatigue tired': {
        answer: "😴 Pregnancy fatigue is totally normal! Your body is working hard:\n\n💤 **Why You're Tired:**\n• Increased progesterone hormone\n• Body building placenta\n• Increased blood volume\n• Emotional changes\n\n⚡ **Energy Boosters:**\n• Take short naps (15-20 minutes)\n• Go to bed earlier\n• Light exercise (walking, prenatal yoga)\n• Iron-rich foods (if anemia is ruled out)\n\n🌟 **Self-Care Tips:**\n• Ask for help with chores\n• Stay hydrated\n• Eat small, frequent meals\n• Gentle stretching\n\n📞 **Call Doctor If:**\n• Extreme fatigue affecting daily life\n• Accompanied by other concerning symptoms\n\nRest is productive during pregnancy! 💝",
        confidence: 0.90,
        category: 'symptoms',
        source: 'custom_dataset'
      },
      'iron deficient': {
        answer: "🩸 Iron deficiency is common during pregnancy! Here's what to know:\n\n⚠️ **Signs of Iron Deficiency:**\n• Extreme fatigue and weakness\n• Pale skin, nails, or inner eyelids\n• Shortness of breath\n• Cold hands and feet\n• Strange cravings (ice, starch)\n• Restless leg syndrome\n\n🍎 **Iron-Rich Foods:**\n• Red meat, chicken, fish\n• Spinach, kale, and leafy greens\n• Beans, lentils, and chickpeas\n• Fortified cereals\n• Dried fruits (raisins, apricots)\n\n💡 **Absorption Tips:**\n• Take with vitamin C (orange juice, tomatoes)\n• Avoid tea/coffee with iron-rich meals\n• Cook in iron cookware\n• Don't take with calcium supplements\n\n👩‍⚕️ **Important:**\n• Get blood tests to confirm\n• Your doctor may prescribe iron supplements\n• Take supplements on empty stomach if tolerated\n\n🚨 **Call Doctor If:**\n• Severe fatigue affecting daily life\n• Dizziness or fainting\n• Rapid heartbeat\n\nYour body needs 27mg iron daily during pregnancy! 💪",
        confidence: 0.94,
        category: 'symptoms',
        source: 'custom_dataset'
      }
    }
  },

  exercise: {
    keywords: ['exercise', 'workout', 'physical', 'activity', 'gym', 'yoga', 'walk', 'run'],
    responses: {
      'safe exercise': {
        answer: "🏃‍♀️ Exercise is great for pregnancy! Here's what's safe:\n\n✅ **Recommended Activities:**\n• Walking (30 minutes daily)\n• Swimming (excellent full-body workout)\n• Prenatal yoga\n• Stationary cycling\n• Light weight training\n\n🎯 **Exercise Guidelines:**\n• Aim for 150 minutes/week moderate activity\n• Stay hydrated\n• Avoid overheating\n• Listen to your body\n\n❌ **Activities to Avoid:**\n• Contact sports (soccer, basketball)\n• Activities with fall risk (skiing, horseback riding)\n• Scuba diving\n• Hot yoga/saunas\n• Lying flat on back after 20 weeks\n\n⚠️ **Stop Exercise If:**\n• Chest pain, dizziness\n• Vaginal bleeding\n• Contractions\n• Shortness of breath\n\nAlways check with your doctor first! 💪",
        confidence: 0.94,
        category: 'fitness',
        source: 'custom_dataset'
      }
    }
  },

  medical: {
    keywords: ['doctor', 'appointment', 'checkup', 'test', 'ultrasound', 'blood', 'medical'],
    responses: {
      'when call doctor': {
        answer: "📞 Call your doctor immediately for:\n\n🚨 **Emergency Signs:**\n• Severe abdominal pain\n• Heavy bleeding (soaking a pad in 1 hour)\n• Severe headache with vision changes\n• High fever (>101°F)\n• Persistent vomiting\n• Signs of infection\n\n⚠️ **Concerning Symptoms:**\n• No fetal movement (after 28 weeks)\n• Severe swelling (face, hands)\n• Painful urination\n• Unusual discharge\n• Severe back pain\n\n📋 **Regular Checkups:**\n• Monthly visits (up to 28 weeks)\n• Bi-weekly (28-36 weeks)\n• Weekly (36+ weeks)\n\n💡 **Always Call If:**\n• You're worried about something\n• Gut feeling something's wrong\n• Questions about medications\n\nBetter safe than sorry! Your doctor is there to help 💝",
        confidence: 0.96,
        category: 'medical',
        source: 'custom_dataset'
      }
    }
  },

  medications: {
    keywords: ['medicine', 'medication', 'drug', 'pill', 'tablet', 'safe', 'take'],
    responses: {
      'safe medications': {
        answer: "💊 Medication safety during pregnancy:\n\n✅ **Generally Safe:**\n• Paracetamol/Acetaminophen (for pain/fever)\n• Certain antibiotics (as prescribed)\n• Prenatal vitamins\n• Iron supplements\n• Some antacids\n\n⚠️ **Use with Caution:**\n• Some cold medications\n• Certain antibiotics\n• Always check with doctor first\n\n❌ **Avoid:**\n• Aspirin (especially 3rd trimester)\n• Ibuprofen (especially 3rd trimester)\n• Some acne medications\n• Certain antidepressants\n\n🔑 **Golden Rules:**\n• ALWAYS consult your doctor before taking ANY medication\n• Don't stop prescribed medications without consulting\n• Read labels carefully\n• When in doubt, ask your pharmacist\n\nYour baby's safety comes first! 👶💝",
        confidence: 0.93,
        category: 'safety',
        source: 'custom_dataset'
      }
    }
  }
};

// 🔍 SMART SEARCH FUNCTIONS
export function findBestMatch(userQuestion) {
  const question = userQuestion.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;
  
  // Search through all categories
  Object.keys(PREGNANCY_DATASET).forEach(category => {
    const categoryData = PREGNANCY_DATASET[category];
    
    // Check keywords
    const keywordMatches = categoryData.keywords.filter(keyword => 
      question.includes(keyword.toLowerCase())
    ).length;
    
    if (keywordMatches > 0) {
      // Search through responses in this category
      Object.keys(categoryData.responses).forEach(responseKey => {
        const response = categoryData.responses[responseKey];
        
        // Calculate match score
        let score = keywordMatches * 10;
        
        // Check if question contains response key words
        const responseKeywords = responseKey.split(' ');
        responseKeywords.forEach(keyword => {
          if (question.includes(keyword)) {
            score += 20;
          }
        });
        
        // Boost score for exact matches
        if (question.includes(responseKey)) {
          score += 50;
        }
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = {
            ...response,
            matchScore: score,
            category: category,
            questionKey: responseKey
          };
        }
      });
    }
  });
  
  return bestMatch;
}

// 🎯 MAIN SMART CHATBOT FUNCTION
export async function getSmartResponse(userQuestion, fallbackAI = 'gemini') {
  console.log('🤖 Smart Chatbot Processing:', userQuestion);
  
  try {
    // Step 1: Check custom dataset first
    const customMatch = findBestMatch(userQuestion);
    
    if (customMatch && customMatch.matchScore > 15) {
      console.log('✅ Found in custom dataset:', customMatch.category);
      return {
        response: customMatch.answer,
        source: 'custom_dataset',
        confidence: customMatch.confidence,
        category: customMatch.category,
        isUrgent: checkUrgency(userQuestion),
        matchScore: customMatch.matchScore
      };
    }
    
    // Step 2: Fall back to external AI with context
    console.log('📡 Falling back to external AI...');
    const aiResponse = await getFallbackAIResponse(userQuestion, fallbackAI);
    
    return {
      response: aiResponse.response,
      source: fallbackAI,
      confidence: 0.75,
      category: 'general',
      isUrgent: checkUrgency(userQuestion),
      note: 'Generated by AI - Please consult healthcare provider for specific medical advice'
    };
    
  } catch (error) {
    console.error('Smart Chatbot Error:', error);
    return {
      response: "I apologize, but I'm having trouble processing your question right now. For immediate pregnancy concerns, please contact your healthcare provider. You can also try rephrasing your question! 💝",
      source: 'error',
      confidence: 0.1,
      category: 'error',
      isUrgent: checkUrgency(userQuestion)
    };
  }
}

// 🔄 FALLBACK AI RESPONSE
async function getFallbackAIResponse(userQuestion, aiProvider = 'gemini') {
  const pregnancyContext = `
You are a helpful pregnancy health assistant named MatriCare. Provide accurate, supportive information about pregnancy.
Always include appropriate emojis and maintain a warm, caring tone.
Add disclaimers for medical advice when discussing specific health concerns.
Keep responses concise but informative (300-400 words max).
Use bullet points and clear formatting when helpful.
Focus on being encouraging and supportive while being medically responsible.
  `;
  
  if (aiProvider === 'gemini') {
    // Google Gemini API call (primary choice - good free tier)
    return await callGemini(userQuestion, pregnancyContext);
  } else if (aiProvider === 'groq') {
    // Groq API call (fast Llama models)
    return await callGroq(userQuestion, pregnancyContext);
  } else if (aiProvider === 'openai') {
    // OpenAI API call (redirects to Gemini)
    return await callOpenAI(userQuestion, pregnancyContext);
  } else if (aiProvider === 'llama') {
    // LLaMA API call (redirects to Groq)
    return await callLLaMA(userQuestion, pregnancyContext);
  } else {
    // Intelligent fallback response
    return {
      response: generateIntelligentFallback(userQuestion),
      confidence: 0.75
    };
  }
}

// 🌐 REAL API INTEGRATIONS

// 🤖 GOOGLE GEMINI API CALL
async function callGemini(question, context) {
  try {
    const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyB4hlnDPViOskpseVwHzi-JaO1UOFJqOWo';
    
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      console.warn('⚠️ Gemini API key not found, using fallback');
      return {
        response: generateIntelligentFallback(question),
        confidence: 0.7
      };
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${context}\n\nUser Question: ${question}\n\nPlease provide a helpful, accurate response about pregnancy. Use emojis and clear formatting. Include medical disclaimers when appropriate.`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'I apologize, but I couldn\'t generate a response right now.';

    return {
      response: aiResponse,
      confidence: 0.85
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      response: generateIntelligentFallback(question),
      confidence: 0.7
    };
  }
}

// 🦙 GROQ API CALL (Alternative fast option)
async function callGroq(question, context) {
  try {
    const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE';
    
    if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
      console.warn('⚠️ Groq API key not found, using Gemini fallback');
      return callGemini(question, context);
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: context
          },
          {
            role: 'user', 
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response right now.';

    return {
      response: aiResponse,
      confidence: 0.8
    };
  } catch (error) {
    console.error('Groq API Error:', error);
    return callGemini(question, context); // Fallback to Gemini
  }
}

// 🔄 LEGACY OPENAI/LLAMA FUNCTIONS (now redirect to real APIs)
async function callOpenAI(question, context) {
  // Redirect to Gemini for better free tier
  return callGemini(question, context);
}

async function callLLaMA(question, context) {
  // Redirect to Groq for fast Llama models
  return callGroq(question, context);
}

// 🧠 GENERATE INTELLIGENT FALLBACK
function generateIntelligentFallback(question) {
  const lowerQuestion = question.toLowerCase();
  
  // Check for common pregnancy-related topics
  if (lowerQuestion.includes('heavy') || lowerQuestion.includes('weight') || lowerQuestion.includes('bloat')) {
    return `💭 Feeling heavy during pregnancy is very common! Here's what might help:

🤰 **Why You Feel Heavy:**
• Growing baby and uterus
• Increased blood volume
• Water retention
• Hormonal changes

💡 **Relief Tips:**
• Gentle walking or swimming
• Elevate your legs when resting
• Wear comfortable, supportive clothing
• Stay hydrated (helps reduce water retention)
• Light stretching or prenatal yoga

⚠️ **When to Call Doctor:**
• Sudden severe swelling
• Shortness of breath
• Severe abdominal pain

This is normal, but always discuss concerns with your healthcare provider! 💝`;
  }
  
  if (lowerQuestion.includes('mood') || lowerQuestion.includes('emotional') || lowerQuestion.includes('cry')) {
    return `🌈 Pregnancy emotions are completely normal! Here's support:

😊 **Why Emotions Change:**
• Hormonal fluctuations
• Physical discomfort
• Life changes and excitement
• Fatigue affecting mood

💝 **Emotional Support:**
• Talk to your partner or friends
• Join pregnancy support groups
• Practice relaxation techniques
• Get adequate rest
• Light exercise can boost mood

🚨 **Seek Help If:**
• Persistent sadness
• Loss of interest in activities
• Anxiety affecting daily life
• Thoughts of self-harm

Your mental health matters! Don't hesitate to reach out to healthcare providers. 🤗`;
  }
  
  if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia') || lowerQuestion.includes('cant sleep')) {
    return `😴 Pregnancy sleep challenges are so common! Here's help:

🌙 **Why Sleep Is Hard:**
• Physical discomfort
• Frequent urination
• Anxiety about baby
• Hormonal changes

💤 **Sleep Tips:**
• Sleep on your left side with pillow between knees
• Use a pregnancy pillow for support
• Avoid caffeine after 2 PM
• Create a relaxing bedtime routine
• Keep bedroom cool and dark

⏰ **When to Rest:**
• Take short naps (15-20 minutes)
• Go to bed earlier
• Rest when you feel tired

Good sleep is crucial for you and baby! Discuss persistent sleep issues with your doctor. 🌟`;
  }
  
  if (lowerQuestion.includes('skin') || lowerQuestion.includes('stretch') || lowerQuestion.includes('acne')) {
    return `✨ Pregnancy skin changes are normal! Here's guidance:

🌟 **Common Changes:**
• Stretch marks (very common)
• Darker nipples and line on belly
• Acne or clearer skin
• Dry or oily skin changes

💆‍♀️ **Skin Care:**
• Gentle, fragrance-free products
• Moisturize regularly
• Use sunscreen daily
• Stay hydrated
• Avoid harsh chemicals

🚫 **Avoid During Pregnancy:**
• Retinoids and high-dose salicylic acid
• Chemical peels
• Certain essential oils

Most skin changes fade after pregnancy. Always check with your doctor about skincare products! 💝`;
  }
  
  // General pregnancy response for other questions
  return `🤰 Thank you for your question! While I don't have specific information about "${question}" in my pregnancy database, here's what I recommend:

💡 **General Pregnancy Advice:**
• Always consult your healthcare provider for specific concerns
• Keep track of symptoms to discuss at appointments
• Stay hydrated and eat nutritious foods
• Get adequate rest
• Take your prenatal vitamins

📞 **When to Call Your Doctor:**
• Any concerning symptoms
• Questions about medications or treatments
• Unusual changes in how you feel
• Peace of mind - they're there to help!

🌟 **You're Doing Great:**
Every pregnancy is unique, and it's normal to have questions. Your healthcare team is the best resource for personalized advice!

Is there anything specific about pregnancy I can help you with? 💝`;
}

// ⚠️ URGENCY DETECTION
function checkUrgency(question) {
  const urgentKeywords = [
    'bleeding', 'blood', 'severe pain', 'can\'t breathe', 'emergency', 
    'hospital', 'contractions', 'fever', 'vision', 'headache severe',
    'vomiting can\'t stop', 'dizzy', 'faint', 'chest pain'
  ];
  
  const lowerQuestion = question.toLowerCase();
  return urgentKeywords.some(keyword => lowerQuestion.includes(keyword));
}

// 📊 ANALYTICS FUNCTION
export function getChatbotStats() {
  const totalResponses = Object.keys(PREGNANCY_DATASET).reduce((total, category) => {
    return total + Object.keys(PREGNANCY_DATASET[category].responses).length;
  }, 0);
  
  return {
    totalCategories: Object.keys(PREGNANCY_DATASET).length,
    totalResponses: totalResponses,
    categories: Object.keys(PREGNANCY_DATASET),
    coverage: 'Pregnancy nutrition, symptoms, exercise, medical, medications'
  };
}

// 🎪 DEMO FUNCTION
export function demonstrateSmartChatbot() {
  console.log('🎪 SMART CHATBOT DEMONSTRATION\n');
  
  const testQuestions = [
    "What should I eat during pregnancy?",
    "I'm feeling nauseous, help!",
    "Is exercise safe during pregnancy?", 
    "When should I call my doctor?",
    "Can I take paracetamol?",
    "What's the weather like today?" // This should fall back to AI
  ];
  
  testQuestions.forEach(async (question, index) => {
    console.log(`\n🧪 Test ${index + 1}: "${question}"`);
    try {
      const result = await getSmartResponse(question);
      console.log(`📊 Source: ${result.source}`);
      console.log(`🎯 Confidence: ${result.confidence}`);
      console.log(`📁 Category: ${result.category}`);
      if (result.matchScore) {
        console.log(`⚡ Match Score: ${result.matchScore}`);
      }
      console.log(`💬 Response: ${result.response.substring(0, 100)}...`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  });
  
  const stats = getChatbotStats();
  console.log('\n📊 CHATBOT STATS:');
  console.log(`Categories: ${stats.totalCategories}`);
  console.log(`Total Responses: ${stats.totalResponses}`);
  console.log(`Coverage: ${stats.coverage}`);
}

export default {
  getSmartResponse,
  findBestMatch,
  getChatbotStats,
  demonstrateSmartChatbot,
  PREGNANCY_DATASET
};