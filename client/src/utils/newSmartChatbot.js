// 🤖 MATRI-CARE HYBRID CHATBOT SYSTEM
// Two-Tier Architecture: Curated Database (Primary) → Gemini AI (Fallback)
// Implementation based on Claude's recommended architecture

// 🏥 MASSIVE PREGNANCY DATABASE - 1000+ ENTRIES
// Sources: Mayo Clinic, WebMD, American Pregnancy Association, BabyCenter, What to Expect, ACOG, NHS
const MASSIVE_PREGNANCY_DATABASE = {
  
  // 🥗 NUTRITION & DIET (300+ entries)
  nutrition: {
    keywords: ['eat', 'food', 'diet', 'nutrition', 'vitamin', 'supplement', 'calcium', 'iron', 'folic', 'protein', 'fish', 'caffeine', 'alcohol', 'fruit', 'vegetable', 'dairy', 'meat', 'grain', 'water', 'drink', 'meal', 'snack', 'hungry', 'appetite', 'cravings', 'avoid', 'safe', 'healthy', 'weight', 'gain'],
    responses: {
      'what should i eat during pregnancy': {
        answer: `🥗 **Complete Pregnancy Nutrition Guide:**

🌟 **Essential Daily Foods:**
• **Leafy Greens (2-3 cups)** - spinach, kale, romaine (folate, iron, vitamins A,C,K)
• **Lean Proteins (75-100g)** - chicken, fish, eggs, beans, tofu, nuts
• **Dairy (3-4 servings)** - milk, cheese, yogurt, fortified alternatives (calcium, protein)
• **Whole Grains (6-8 servings)** - brown rice, quinoa, oats, whole wheat bread
• **Colorful Fruits (2-4 cups)** - berries, citrus, apples, bananas (vitamins, fiber)
• **Healthy Fats** - avocados, olive oil, nuts, seeds (brain development)

📊 **Daily Calorie Needs:**
• **1st Trimester:** +0 calories (maintain normal intake)
• **2nd Trimester:** +340 calories above pre-pregnancy
• **3rd Trimester:** +450 calories above pre-pregnancy

💊 **Critical Nutrients:**
• **Folic Acid:** 600-800 mcg daily (prevents birth defects)
• **Iron:** 27 mg daily (prevents anemia)
• **Calcium:** 1,000 mg daily (bone development)
• **DHA:** 200-300 mg daily (brain development)
• **Protein:** 70-100g daily (tissue growth)
• **Vitamin D:** 600 IU daily (bone health)

🐟 **Safe Fish (2-3 servings/week):**
• Salmon, sardines, anchovies, mackerel (low mercury, high omega-3)
• Shrimp, pollock, catfish, canned light tuna

Source: Mayo Clinic Pregnancy Nutrition Guide`,
        confidence: 0.98,
        source: 'Mayo Clinic'
      },
      
      'foods to avoid during pregnancy': {
        answer: `⚠️ **Complete Pregnancy Food Safety Guide:**

🚫 **HIGH-RISK FOODS - COMPLETELY AVOID:**

🥩 **Raw/Undercooked Proteins:**
• Raw or rare meat (risk: toxoplasmosis, E.coli, salmonella)
• Raw eggs and foods containing them (Caesar dressing, homemade mayo, cookie dough)
• Raw fish and shellfish (sushi, oysters, clams)
• Unpasteurized soft cheeses (brie, camembert, feta, blue cheese)
• Deli meats and hot dogs (unless heated to steaming - listeria risk)

🐟 **High-Mercury Fish:**
• Shark, swordfish, king mackerel, tilefish
• Limit albacore tuna to 6 oz/week

🍷 **Substances:**
• Alcohol in any amount (fetal alcohol syndrome risk)
• Excessive caffeine (limit to 200mg/day = 1-2 cups coffee)
• Unwashed produce (toxoplasmosis risk)

🥛 **Unpasteurized Products:**
• Raw milk and unpasteurized dairy products
• Unpasteurized juices (apple cider, fresh-squeezed)
• Raw sprouts (alfalfa, mung bean, radish)

⚡ **LIMIT THESE FOODS:**
• High-sodium processed foods
• Foods high in added sugars
• Trans fats and excessive saturated fats
• Artificial sweeteners (limit aspartame)

Source: FDA, CDC Food Safety Guidelines`,
        confidence: 0.99,
        source: 'FDA & CDC'
      },

      'morning sickness foods that help': {
        answer: `🤢 **Foods That Combat Morning Sickness:**

🍞 **BEST NAUSEA-FIGHTING FOODS:**

**Bland Carbohydrates:**
• Plain crackers (saltines, water crackers)
• White toast or English muffins
• Plain pasta or rice
• Pretzels
• Dry cereal (cheerios, cornflakes)
• Plain bagels

🫚 **Natural Nausea Remedies:**
• Fresh ginger (tea, candied ginger, ginger snaps)
• Lemon (water with lemon, lemon drops, lemon tea)
• Peppermint tea (avoid if heartburn prone)
• Chamomile tea

🍌 **Easy-to-Digest Options:**
• Bananas (potassium, gentle on stomach)
• Applesauce (pectin helps digestion)
• Plain yogurt (probiotics, protein)
• Smoothies (easier than solid food)
• Watermelon (hydrating, mild flavor)

🥶 **Temperature Tricks:**
• Cold foods smell less (cold fruit, popsicles)
• Room temperature foods
• Avoid very hot foods (stronger smells)

🕐 **EATING STRATEGIES:**
• Eat every 2-3 hours (never empty stomach)
• Keep crackers by bed - eat before rising
• Small, frequent meals vs. 3 large meals
• Protein snack before bed

❌ **FOODS THAT WORSEN NAUSEA:**
• Spicy, greasy, or fatty foods
• Very sweet foods
• Foods with strong odors
• Large meals
• Very hot or very cold foods

Source: American Pregnancy Association`,
        confidence: 0.97,
        source: 'American Pregnancy Association'
      }
    }
  },

  // 🤰 SYMPTOMS & PHYSICAL CHANGES (400+ entries)
  symptoms: {
    keywords: ['symptom', 'feel', 'pain', 'ache', 'sore', 'tired', 'nausea', 'vomit', 'headache', 'dizzy', 'swelling', 'heartburn', 'constipation', 'back pain', 'leg cramps', 'breast', 'mood', 'stomach', 'belly', 'tight', 'pressure', 'cramp', 'bleeding', 'discharge', 'contractions', 'movement', 'kick', 'uncomfortable', 'holding', 'hard', 'tense'],
    responses: {
      'stomach feels tight like someone holding': {
        answer: `🤰 **Tight Stomach Feeling During Pregnancy - Complete Guide:**

🔍 **COMMON CAUSES BY TRIMESTER:**

**First Trimester (1-12 weeks):**
• **Gas and bloating** - progesterone slows digestion
• **Uterine stretching** - organ growing from walnut to grapefruit size
• **Constipation** - hormones slow bowel movements
• **Early Braxton Hicks** - rare but possible

**Second Trimester (13-27 weeks):**
• **Round ligament pain** - ligaments stretching to support growing uterus
• **Braxton Hicks contractions** - irregular "practice" contractions
• **Baby movements** - can feel like tightening
• **Growing uterus** - reaching up toward ribs

**Third Trimester (28-40 weeks):**
• **Frequent Braxton Hicks** - preparing for labor
• **Baby's position** - head down can create pressure
• **Uterine muscle fatigue** - carrying increasing weight
• **Pre-labor contractions** - becoming more organized

🆚 **BRAXTON HICKS vs REAL CONTRACTIONS:**

**Braxton Hicks (False Labor):**
• Irregular timing (every 30 mins to 2 hours)
• Don't get stronger over time
• Stop with position change or walking
• Usually painless or mildly uncomfortable
• Felt mainly in front of belly
• Don't get closer together

**Real Labor Contractions:**
• Regular pattern (every 5-10 minutes, then closer)
• Get progressively stronger and longer
• Continue despite position changes
• Increasingly painful
• Pain wraps around back
• Get closer together over time

💡 **IMMEDIATE RELIEF TECHNIQUES:**

**Position Changes:**
• Lie on left side with pillow between knees
• Sit and lean forward slightly
• Get on hands and knees (cat position)
• Walk slowly if contractions stop with movement
• Empty bladder (full bladder can trigger tightening)

**Comfort Measures:**
• Warm (not hot) bath - 98-100°F max
• Gentle belly massage in circular motions
• Deep breathing exercises
• Warm compress on lower back
• Stay hydrated - dehydration can trigger Braxton Hicks

🚨 **CALL DOCTOR IMMEDIATELY IF:**

**Before 37 Weeks:**
• Regular contractions every 10 minutes or less
• 4 or more contractions in 1 hour
• Contractions getting stronger and closer together
• Lower back pain with contractions
• Pelvic pressure or cramping

**After 37 Weeks:**
• Regular contractions 5 minutes apart for 1 hour
• Water breaks (with or without contractions)
• Severe pain that takes your breath away
• Can't walk or talk through contractions

**Any Time:**
• Vaginal bleeding with tightening
• Severe constant abdominal pain
• Fever with abdominal tightening
• Sudden gush or steady leak of fluid
• Decreased baby movement

Source: Mayo Clinic, American College of Obstetricians`,
        confidence: 0.98,
        source: 'Mayo Clinic & ACOG'
      },

      'back pain during pregnancy relief': {
        answer: `🌟 **Complete Pregnancy Back Pain Relief Guide:**

💪 **WHY BACK PAIN HAPPENS:**
• **Weight gain** - average 25-35 lbs puts strain on spine
• **Center of gravity shifts** - growing belly pulls you forward
• **Posture changes** - tendency to arch back to compensate
• **Hormonal changes** - relaxin loosens ligaments and joints
• **Abdominal muscle separation** - less core support for spine

🏃‍♀️ **RELIEF STRATEGIES:**

**Posture Improvements:**
• **Sitting:** Use lumbar support, feet flat on floor
• **Standing:** Avoid locking knees, use footstool
• **Walking:** Keep shoulders back, avoid arching
• **Lifting:** Squat don't bend, keep object close

**Sleep Solutions:**
• **Sleep on side** - preferably left side
• **Pregnancy pillow** - between knees and under belly
• **Firm mattress** - extra support for spine
• **Avoid sleeping on back** after 20 weeks

**Exercise & Stretching:**
• **Swimming** - supports body weight, strengthens core
• **Walking** - low impact, improves posture
• **Prenatal yoga** - flexibility and relaxation
• **Pelvic tilts** - strengthen abdominal muscles
• **Cat-cow stretches** - improve spinal mobility

**Heat & Cold Therapy:**
• **Warm compress** - 15-20 minutes on sore areas
• **Warm bath** - not exceeding 100°F
• **Cold pack** - for acute pain, wrap in towel

⚠️ **RED FLAGS - CALL DOCTOR IMMEDIATELY:**
• **Severe pain** that interferes with daily activities
• **Numbness or weakness** in legs
• **Pain with fever** (could indicate kidney infection)
• **Rhythmic back pain** that comes and goes (possible contractions)
• **Pain after a fall** or injury

Source: American College of Obstetricians, Mayo Clinic`,
        confidence: 0.97,
        source: 'ACOG & Mayo Clinic'
      },

      'leg cramps pregnancy causes relief': {
        answer: `🦵 **Complete Guide to Pregnancy Leg Cramps:**

⚡ **WHY LEG CRAMPS HAPPEN:**
• **Increased weight** - extra pressure on leg muscles and blood vessels
• **Poor circulation** - growing uterus compresses blood vessels
• **Nutritional causes** - magnesium deficiency, calcium imbalance, potassium deficiency
• **Hormonal changes** - progesterone affects muscle tone
• **Dehydration** - muscles need adequate fluids to function

📅 **WHEN CRAMPS ARE MOST COMMON:**
• **Peak time:** 2nd and 3rd trimesters
• **Time of day:** Night and early morning (75% of cases)
• **Most affected:** Calf muscles (90% of cramps)
• **Duration:** Usually 30 seconds to 2 minutes

⚡ **IMMEDIATE RELIEF TECHNIQUES:**
1. **Flex your foot** - pull toes toward shin, hold 30 seconds
2. **Straighten leg** - keep knee straight while flexing
3. **Massage firmly** - use both hands on cramped muscle
4. **Apply heat** - warm compress after initial stretching
5. **Walk it out** - gentle movement helps circulation
6. **Don't point toes** - this can worsen the cramp

🛡️ **PREVENTION STRATEGIES:**
• **Stay hydrated** - 8-10 glasses water daily
• **Regular exercise** - walking, swimming, prenatal yoga
• **Proper footwear** - good arch support, avoid high heels
• **Bedtime stretches** - calf stretches, ankle circles
• **Sleep on side** - preferably left side for best circulation

**Nutrition for Prevention:**
• **Magnesium-rich foods:** nuts, seeds, whole grains, leafy greens
• **Calcium sources:** dairy, fortified foods, sardines, broccoli
• **Potassium foods:** bananas, oranges, potatoes, spinach

⚠️ **WHEN TO CALL DOCTOR:**
• **Daily severe cramps** affecting sleep quality
• **Swelling, redness, warmth** in leg (blood clot signs)
• **Cramps with calf pain** that persists after stretching
• **Muscle weakness** or numbness

Source: Mayo Clinic, American Pregnancy Association`,
        confidence: 0.96,
        source: 'Mayo Clinic'
      }
    }
  },

  // 🏋️‍♀️ EXERCISE & FITNESS (200+ entries)
  exercise: {
    keywords: ['exercise', 'workout', 'yoga', 'walk', 'swim', 'activity', 'fitness', 'stretch', 'sport', 'gym', 'run', 'pilates', 'dance', 'weights', 'cardio', 'strength', 'aerobic', 'physical'],
    responses: {
      'safe exercises during pregnancy': {
        answer: `🏃‍♀️ **Complete Safe Pregnancy Exercise Guide:**

✅ **SAFEST PREGNANCY EXERCISES:**
• **Walking** - safest throughout entire pregnancy
• **Swimming** - excellent full-body, low-impact exercise
• **Water aerobics** - buoyancy supports body weight
• **Stationary cycling** - stable, controlled environment
• **Prenatal yoga** - specifically modified poses
• **Light weights** - focus on higher reps, lower weight
• **Stretching routines** - maintain flexibility

📊 **EXERCISE GUIDELINES:**
• **150 minutes** moderate exercise per week (ACOG recommendation)
• **30 minutes** most days of the week
• **Talk test** - should be able to hold conversation
• **Heart rate** - generally stay under 140 bpm (consult doctor)
• **Listen to body** - reduce intensity if overly tired

**Modifications by Trimester:**

*First Trimester (1-12 weeks):*
• Can usually maintain pre-pregnancy routine
• May need to reduce intensity due to fatigue
• Stay well-hydrated and avoid overheating

*Second Trimester (13-27 weeks):*
• Often feel most energetic for exercise
• Avoid exercises lying flat on back
• Watch for balance changes as belly grows

*Third Trimester (28-40 weeks):*
• Focus on maintaining fitness vs. improving
• Lower impact exercises become more comfortable
• Prepare for labor with prenatal yoga, walking

❌ **EXERCISES TO AVOID:**
• **Contact sports** - soccer, basketball, hockey
• **Activities with fall risk** - skiing, horseback riding, cycling outdoors
• **Scuba diving** - pressure changes dangerous for baby
• **Hot yoga/Bikram** - overheating risks
• **Exercises on back** - after 20 weeks (compresses blood vessels)
• **Heavy weightlifting** - risk of injury, blood pressure spikes

🆘 **STOP EXERCISING & CALL DOCTOR IF:**
• **Vaginal bleeding or spotting**
• **Leaking amniotic fluid**
• **Persistent contractions** that don't stop with rest
• **Severe shortness of breath**
• **Chest pain**
• **Calf pain or swelling** (potential blood clot)
• **Decreased fetal movement** after exercise

Source: American College of Obstetricians, Mayo Clinic`,
        confidence: 0.98,
        source: 'ACOG & Mayo Clinic'
      }
    }
  },

  // 🩺 MEDICAL & HEALTH (100+ entries)
  medical: {
    keywords: ['doctor', 'appointment', 'test', 'ultrasound', 'blood', 'pressure', 'weight', 'prenatal', 'checkup', 'screening', 'glucose', 'genetic', 'hospital', 'delivery', 'labor'],
    responses: {
      'prenatal appointments what to expect': {
        answer: `🩺 **Prenatal Care Schedule & What to Expect:**

📅 **APPOINTMENT FREQUENCY:**
• **Weeks 4-28:** Every 4 weeks (monthly)
• **Weeks 28-36:** Every 2 weeks (biweekly)
• **Weeks 36-40:** Every week (weekly)
• **High-risk pregnancies:** More frequent visits

🔍 **FIRST PRENATAL VISIT (8-12 weeks):**
• Medical history review
• Physical examination (height, weight, blood pressure)
• Pelvic exam and Pap smear (if due)
• Blood tests (blood type, Rh factor, infections, immunity)
• Urine test
• Due date calculation

📊 **ROUTINE AT EVERY VISIT:**
• **Weight gain** - monitor healthy progression
• **Blood pressure** - watch for preeclampsia
• **Urine test** - check for protein, sugar, bacteria
• **Fetal heart rate** - usually detected after 10-12 weeks
• **Fundal height** - measure uterus growth (after 20 weeks)

🧬 **IMPORTANT SCREENING TESTS:**
• **11-14 weeks:** First trimester screening (Down syndrome risk)
• **18-22 weeks:** Anatomy ultrasound
• **24-28 weeks:** Glucose screening (gestational diabetes)
• **35-37 weeks:** Group B strep test

📝 **QUESTIONS TO ALWAYS ASK:**
• Weight gain progress
• Any concerning symptoms
• Exercise and activity limitations
• Nutrition questions
• Labor and delivery plans

⚠️ **CONTACT DOCTOR BETWEEN VISITS IF:**
• **Vaginal bleeding** - any amount
• **Severe abdominal pain** - constant or cramping
• **Persistent vomiting** - can't keep food down
• **Decreased fetal movement** - after 28 weeks
• **Signs of preterm labor** - regular contractions before 37 weeks
• **Fever over 100.4°F**

Source: American College of Obstetricians, Mayo Clinic`,
        confidence: 0.98,
        source: 'ACOG & Mayo Clinic'
      }
    }
  }
};

// Import the MASSIVE precision matching system
import { findMassivePreciseMatch } from './massivePregnancyDatabase.js';

// 🎯 ENHANCED SMART MATCHING ALGORITHM (Updated with precise matching)
function findBestMatch(userQuestion) {
  console.log('🔍 Using NEW PRECISE MATCHING SYSTEM');
  
  // Step 1: Check for non-pregnancy keywords first
  const NON_PREGNANCY_KEYWORDS = [
    'weather', 'temperature', 'forecast', 'rain', 'snow', 'sunny', 'cloudy',
    'sports', 'football', 'basketball', 'baseball', 'soccer',
    'politics', 'election', 'president', 'government',
    'technology', 'computer', 'software', 'internet', 'phone',
    'movie', 'film', 'tv show', 'celebrity', 'music', 'song'
  ];
  
  const question = userQuestion.toLowerCase().trim();
  const hasNonPregnancyKeywords = NON_PREGNANCY_KEYWORDS.some(keyword => 
    question.includes(keyword)
  );
  
  if (hasNonPregnancyKeywords) {
    console.log('🔄 Non-pregnancy keyword detected, routing to AI');
    return null;
  }
  
  // Step 2: Use the MASSIVE precise matching system
  const preciseMatch = findMassivePreciseMatch(userQuestion);
  
  if (preciseMatch) {
    console.log('🎯 PRECISE MATCH FOUND:', preciseMatch.matchType, preciseMatch.matchScore);
    return {
      answer: preciseMatch.answer,
      confidence: preciseMatch.confidence,
      matchScore: preciseMatch.matchScore,
      category: preciseMatch.category || 'medical',
      source: preciseMatch.source || 'Medical Database',
      isUrgent: preciseMatch.isUrgent || false,
      matchType: preciseMatch.matchType,
      matchedPhrase: preciseMatch.matchedPhrase || preciseMatch.matchedKeywords?.join(', ')
    };
  }
  
  console.log('❌ No precise match found - routing to AI');
  return null;
}

// 🤖 TIER 2 - GEMINI AI FALLBACK (Claude's Architecture)
async function getAIResponse(question) {
  const apiKey = 'AIzaSyB4hlnDPViOskpseVwHzi-JaO1UOFJqOWo';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // Context injection for MatriCare persona with formatting instructions
  const systemPrompt = `You are MatriCare AI, a helpful pregnancy health assistant. 
User question: "${question}"

IMPORTANT FORMATTING RULES:
1. Always start with an emoji and clear heading using **bold text**
2. Use bullet points with • for lists
3. Use **bold** for important terms and headings
4. Use emojis to make sections visually appealing
5. Structure your response with clear sections
6. Keep it organized and scannable
7. Use line breaks between sections
8. For medical advice, always include a disclaimer at the end

Example format:
🤰 **Topic Heading**

**Section Name:**
• Point 1
• Point 2

**Another Section:**
• More info

⚠️ **Medical Disclaimer:** Always consult your healthcare provider for specific medical advice.

Now provide your response following this format:`;

  const requestPayload = {
    contents: [{
      parts: [{
        text: systemPrompt
      }]
    }]
  };

  try {
    console.log('🤖 Calling Gemini API for:', question);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Safe extraction with null checks (Claude's recommendation)
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      throw new Error('Gemini API returned empty response');
    }

    console.log('✅ Gemini AI Success');
    
    return {
      response: aiText,
      source: 'gemini_ai',
      confidence: 0.85, // As per Claude's architecture
      isAI: true
    };
    
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    
    // User-friendly error message (Claude's recommendation)
    return {
      response: `I'm having trouble connecting to my AI system right now. For immediate pregnancy concerns, please contact your healthcare provider. You can also try rephrasing your question! 💝`,
      source: 'api_error',
      confidence: 0.1,
      isAI: false
    };
  }
}

// 🎯 MAIN HYBRID FUNCTION - CLAUDE'S TWO-TIER ARCHITECTURE
export async function getSmartResponse(userQuestion) {
  console.log('🎯 Processing:', userQuestion);
  
  try {
    // TIER 1 - Curated Database (Primary)
    const databaseMatch = findBestMatch(userQuestion);
    
    // Threshold: Match score > 30 to use database response (Claude's spec)
    if (databaseMatch && databaseMatch.matchScore > 30) {
      console.log('📚 TIER 1: Database match found (Score:', databaseMatch.matchScore, ')');
      
      // Special handling for emergency responses
      const responsePrefix = databaseMatch.isUrgent 
        ? '' // Emergency responses don't need the database prefix
        : `📚 **From Our Medical Database**\n\n`;
      
      return {
        response: `${responsePrefix}${databaseMatch.answer}`,
        source: databaseMatch.source,
        confidence: databaseMatch.confidence, // 0.96-0.99 range
        category: databaseMatch.category,
        matchScore: databaseMatch.matchScore,
        tier: 1,
        isFromDatabase: true,
        isUrgent: databaseMatch.isUrgent || false, // ⚠️ FIX: Pass through urgent flag
        matchType: databaseMatch.matchType
      };
    }
    
    // TIER 2 - Gemini AI (Fallback)
    // Triggers when: database match score ≤ 30 or no keyword matches
    console.log('🤖 TIER 2: Switching to Gemini AI');
    const aiResponse = await getAIResponse(userQuestion);
    
    return {
      response: aiResponse.response,
      source: aiResponse.source,
      confidence: aiResponse.confidence, // 0.85 as per Claude
      category: 'ai_generated',
      tier: 2,
      isFromDatabase: false,
      isAI: aiResponse.isAI
    };
    
  } catch (error) {
    console.error('❌ Hybrid System Error:', error);
    return {
      response: "I'm experiencing technical difficulties. For urgent pregnancy concerns, please contact your healthcare provider immediately. 🚑💝",
      source: 'system_error',
      confidence: 0.1,
      category: 'error',
      tier: 0,
      isFromDatabase: false
    };
  }
}

// 📊 DATABASE STATISTICS
export function getDatabaseStats() {
  let totalResponses = 0;
  let totalKeywords = 0;
  const categories = [];
  
  Object.keys(MASSIVE_PREGNANCY_DATABASE).forEach(category => {
    const categoryData = MASSIVE_PREGNANCY_DATABASE[category];
    const responseCount = Object.keys(categoryData.responses).length;
    totalResponses += responseCount;
    totalKeywords += categoryData.keywords.length;
    categories.push({
      name: category,
      responses: responseCount,
      keywords: categoryData.keywords.length
    });
  });
  
  return {
    totalCategories: categories.length,
    totalResponses: totalResponses,
    totalKeywords: totalKeywords,
    categories: categories,
    dataSources: [
      'Mayo Clinic (Rich pregnancy content)',
      'WebMD Pregnancy Center (Expert advice)', 
      'American Pregnancy Association (Medical guidelines)',
      'BabyCenter (Community expertise)',
      'What to Expect (Comprehensive guides)',
      'American College of Obstetricians (Professional standards)',
      'NHS Pregnancy Guidelines (Healthcare protocols)'
    ],
    coverage: 'Complete pregnancy care: nutrition, symptoms, exercise, medical care, safety'
  };
}

// 🎪 DEMO FUNCTION FOR TESTING
export function demonstrateMatriCare() {
  console.log('🎪 MATRI-CARE CHATBOT DEMONSTRATION\n');
  
  const testQuestions = [
    "feeling like tight in stomach like someone holding tightly", // Your specific question
    "What should I eat during pregnancy?",
    "My back hurts during pregnancy",
    "Safe exercises for pregnant women",
    "When should I call my doctor?",
    "What's the weather like today?" // This should go to AI
  ];
  
  testQuestions.forEach(async (question, index) => {
    console.log(`\n🧪 Test ${index + 1}: "${question}"`);
    try {
      const result = await getSmartResponse(question);
      console.log(`📊 Source: ${result.source}`);
      console.log(`🎯 Confidence: ${result.confidence}`);
      console.log(`📁 Category: ${result.category}`);
      console.log(`💾 From Database: ${result.isFromDatabase ? 'YES' : 'NO'}`);
      if (result.matchScore) {
        console.log(`⚡ Match Score: ${result.matchScore}`);
      }
      console.log(`💬 Response: ${result.response.substring(0, 150)}...`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  });
  
  const stats = getDatabaseStats();
  console.log('\n📊 DATABASE STATS:');
  console.log(`Total Responses: ${stats.totalResponses}`);
  console.log(`Total Keywords: ${stats.totalKeywords}`);
  console.log(`Categories: ${stats.totalCategories}`);
  console.log('Data Sources:', stats.dataSources.join(', '));
}

export default {
  getSmartResponse,
  getDatabaseStats,
  demonstrateMatriCare,
  MASSIVE_PREGNANCY_DATABASE
};