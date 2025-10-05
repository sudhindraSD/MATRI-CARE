// 🏥 COMPREHENSIVE PREGNANCY DATABASE - PRECISION MATCHED
// Sources: Mayo Clinic, ACOG, WebMD, What to Expect, NHS, BabyCenter
// Built for exact symptom matching and emergency detection

export const COMPREHENSIVE_PREGNANCY_DB = {
  
  // 🚨 EMERGENCY SYMPTOMS - IMMEDIATE DETECTION
  emergency: {
    exactMatches: [
      'vaginal bleeding', 'heavy bleeding', 'bleeding during pregnancy', 'blood from vagina',
      'severe abdominal pain', 'severe stomach pain', 'intense pain',
      'severe headache', 'sudden headache', 'vision changes', 'seeing spots',
      'water broke', 'fluid leaking', 'amniotic fluid',
      'severe vomiting', 'cant keep food down', 'dehydration',
      'fever over 100', 'high fever', 'temperature above 100',
      'chest pain', 'difficulty breathing', 'cant breathe',
      'severe swelling', 'sudden swelling face hands',
      'no baby movement', 'baby not moving', 'decreased fetal movement'
    ],
    response: {
      answer: `🚨 **EMERGENCY - SEEK IMMEDIATE MEDICAL ATTENTION**

**Call 911 or go to Emergency Room NOW if you experience:**
• **Heavy vaginal bleeding** (soaking a pad in 1 hour)
• **Severe abdominal pain** that doesn't go away
• **Severe headache** with vision changes or seeing spots
• **Water breaking** before 37 weeks
• **Severe vomiting** - can't keep fluids down for 24+ hours
• **Fever over 100.4°F** (38°C)
• **Severe chest pain** or difficulty breathing
• **Sudden severe swelling** of face, hands, or feet
• **No baby movement** for several hours (after 28 weeks)

**⚡ DO NOT WAIT - These symptoms can be life-threatening**
**📞 Emergency: 911**
**🏥 Or go directly to nearest hospital**

**What to bring:**
• Your prenatal records
• List of medications
• Insurance information
• Phone number of your OB/GYN

⚠️ **Time is critical - act immediately for your safety and your baby's safety.**`,
      confidence: 0.99,
      isUrgent: true,
      source: 'Emergency Medical Guidelines',
      category: 'emergency'
    }
  },

  // 🩸 BLEEDING & SPOTTING
  bleeding: {
    exactMatches: [
      'spotting', 'light bleeding', 'brown discharge', 'pink discharge',
      'implantation bleeding', 'early pregnancy bleeding',
      'bleeding first trimester', 'bleeding second trimester', 'bleeding third trimester'
    ],
    keywordGroups: [
      ['spotting', 'light', 'brown'],
      ['bleeding', 'first trimester'],
      ['bleeding', 'second trimester'],
      ['bleeding', 'third trimester']
    ],
    responses: {
      'spotting during pregnancy': {
        answer: `🩸 **Spotting During Pregnancy - What You Need to Know**

**🔍 Types of Normal Spotting:**

**First Trimester (1-12 weeks):**
• **Implantation bleeding** - Light pink/brown, 1-2 days around week 4-6
• **Cervical changes** - After pelvic exam or intercourse
• **Hormonal fluctuations** - Light spotting around missed period time

**🟡 WHEN SPOTTING MAY BE NORMAL:**
• **Very light** - only when wiping, not filling a pad
• **Pink or brown color** - not bright red
• **No cramping** - no pain or mild discomfort only
• **Stops on its own** - within 1-2 days

**🔴 CALL DOCTOR IMMEDIATELY IF:**
• **Bright red blood** - especially if filling a pad
• **Heavy flow** - soaking through pads
• **Severe cramping** - like menstrual cramps or worse
• **Clots** - passing tissue or clots
• **Persistent bleeding** - continues for more than 2 days
• **Pain with bleeding** - especially one-sided pain

**📋 What to Track:**
• Amount (drops, teaspoon, pad-soaking)
• Color (pink, brown, red)
• Duration (minutes, hours, days)
• Associated symptoms (cramping, pain)

**⚕️ Common Causes by Trimester:**
• **1st Trimester:** Implantation, cervical changes, miscarriage risk
• **2nd Trimester:** Cervical irritation, placental issues
• **3rd Trimester:** Bloody show (labor sign), placental problems

**🚨 Remember:** Any bleeding warrants a call to your healthcare provider for evaluation.`,
        confidence: 0.98,
        source: 'ACOG & Mayo Clinic'
      }
    }
  },

  // 🤢 NAUSEA & VOMITING
  nausea: {
    exactMatches: [
      'morning sickness', 'nausea', 'vomiting', 'feeling sick', 'queasy',
      'hyperemesis gravidarum', 'severe morning sickness', 'cant keep food down'
    ],
    keywordGroups: [
      ['nausea', 'vomiting'],
      ['morning', 'sickness'],
      ['feeling', 'sick']
    ],
    responses: {
      'morning sickness relief': {
        answer: `🤢 **Morning Sickness - Complete Management Guide**

**🌅 Understanding Morning Sickness:**
• Affects **70-80%** of pregnant women
• Usually starts around **week 6**, peaks at **week 9**
• Often improves by **week 12-16**
• Can occur any time of day, not just morning

**🍃 NATURAL RELIEF METHODS:**

**Dietary Changes:**
• **Small, frequent meals** - every 2-3 hours
• **Eat before getting up** - keep crackers by bedside
• **Avoid empty stomach** - never go more than 3 hours without eating
• **Cold foods** - have less smell than hot foods
• **Dry foods** - toast, crackers, cereal
• **Protein snacks** - nuts, cheese, yogurt before bed

**🫚 Natural Remedies:**
• **Ginger** - tea, capsules (250mg 4x daily), or ginger ale
• **Vitamin B6** - 25mg three times daily (consult doctor first)
• **Peppermint** - tea or aromatherapy
• **Lemon** - smell fresh lemon or lemon water

**💡 Practical Tips:**
• **Get fresh air** - open windows, go outside
• **Rest when possible** - fatigue worsens nausea
• **Avoid triggers** - strong smells, certain foods
• **Wear loose clothing** - tight clothes can worsen symptoms
• **Brush teeth carefully** - use soft brush, avoid early morning

**🚨 CALL DOCTOR IF:**
• **Can't keep fluids down** for 24+ hours
• **Losing weight** - more than 2 pounds
• **Vomiting blood** or dark material
• **Signs of dehydration** - dizziness, dry mouth, little urination
• **Severe symptoms** affecting daily life

**💊 Medical Treatment Options:**
• **Prescription medications** - Zofran, Reglan (doctor prescribed)
• **IV fluids** - for severe dehydration
• **Vitamin supplements** - if unable to eat adequately

**🎯 Success Rate:** 95% of morning sickness improves with these strategies!`,
        confidence: 0.97,
        source: 'American Pregnancy Association'
      }
    }
  },

  // 🍽️ NUTRITION & DIET
  nutrition: {
    exactMatches: [
      'what to eat', 'pregnancy diet', 'foods to eat', 'nutrition during pregnancy',
      'prenatal nutrition', 'healthy eating pregnant', 'pregnancy meal plan',
      'foods to avoid', 'dangerous foods', 'unsafe foods pregnancy'
    ],
    keywordGroups: [
      ['what', 'eat', 'pregnancy'],
      ['foods', 'avoid'],
      ['prenatal', 'nutrition'],
      ['healthy', 'diet']
    ],
    responses: {
      'pregnancy nutrition guide': {
        answer: `🥗 **Complete Pregnancy Nutrition Guide**

**🌟 ESSENTIAL DAILY FOODS:**

**Protein (75-100g daily):**
• **Lean meats** - chicken, turkey, lean beef
• **Fish** - salmon, sardines, anchovies (2-3 servings/week)
• **Eggs** - excellent complete protein
• **Dairy** - milk, yogurt, cheese (3-4 servings)
• **Plant proteins** - beans, lentils, tofu, nuts

**🥬 Fruits & Vegetables (7-9 servings):**
• **Leafy greens** - spinach, kale (folate, iron)
• **Citrus fruits** - oranges, grapefruit (vitamin C, folate)
• **Berries** - antioxidants, fiber
• **Sweet potatoes** - beta-carotene, fiber
• **Broccoli** - folate, calcium, vitamin C

**🌾 Whole Grains (6-8 servings):**
• **Fortified cereals** - folate, iron
• **Whole wheat bread** - B vitamins, fiber
• **Brown rice** - energy, B vitamins
• **Oats** - fiber, protein
• **Quinoa** - complete protein

**💊 CRITICAL NUTRIENTS:**
• **Folic Acid:** 600-800 mcg daily (prevents birth defects)
• **Iron:** 27 mg daily (prevents anemia)
• **Calcium:** 1,000 mg daily (bone development)
• **DHA:** 200-300 mg daily (brain development)
• **Vitamin D:** 600 IU daily (bone health)

**📊 CALORIE NEEDS:**
• **1st Trimester:** No extra calories needed
• **2nd Trimester:** +340 calories daily
• **3rd Trimester:** +450 calories daily

**🚫 FOODS TO COMPLETELY AVOID:**
• **Raw/undercooked meat** - toxoplasmosis, E. coli
• **Raw fish** - sushi, oysters (bacteria, parasites)
• **Unpasteurized products** - soft cheeses, raw milk
• **High-mercury fish** - shark, swordfish, king mackerel
• **Raw eggs** - salmonella (cookie dough, homemade mayo)
• **Alcohol** - any amount (fetal alcohol syndrome)
• **Excessive caffeine** - limit to 200mg/day (1-2 cups coffee)

**💧 HYDRATION:**
• **8-10 glasses water daily**
• **More if exercising** or in hot weather
• **Signs of good hydration:** pale yellow urine

**🍽️ MEAL TIMING:**
• **Small, frequent meals** - every 2-3 hours
• **Balanced combinations** - protein + carb + healthy fat
• **Don't skip meals** - keeps blood sugar stable`,
        confidence: 0.98,
        source: 'Mayo Clinic Nutrition Guidelines'
      }
    }
  },

  // 🏃‍♀️ EXERCISE & PHYSICAL ACTIVITY
  exercise: {
    exactMatches: [
      'exercise during pregnancy', 'safe exercises', 'pregnancy workout',
      'can i exercise', 'physical activity pregnant', 'yoga while pregnant',
      'running while pregnant', 'weight lifting pregnancy'
    ],
    keywordGroups: [
      ['exercise', 'pregnancy'],
      ['safe', 'workout'],
      ['yoga', 'pregnant'],
      ['running', 'pregnant']
    ],
    responses: {
      'safe pregnancy exercise guide': {
        answer: `🏃‍♀️ **Safe Exercise During Pregnancy - Complete Guide**

**✅ SAFEST EXERCISES:**

**Low-Impact Cardio:**
• **Walking** - safest exercise throughout pregnancy
• **Swimming** - excellent full-body workout, joint-friendly
• **Water aerobics** - buoyancy supports growing belly
• **Stationary cycling** - stable, controlled environment
• **Elliptical machine** - low impact on joints

**🧘‍♀️ Flexibility & Strength:**
• **Prenatal yoga** - modified poses for pregnancy
• **Prenatal Pilates** - core strength (avoid lying on back after 20 weeks)
• **Light weight training** - focus on higher reps, lower weight
• **Resistance bands** - safe strength training
• **Stretching routines** - maintain flexibility

**📋 EXERCISE GUIDELINES:**
• **150 minutes** moderate exercise weekly (ACOG recommendation)
• **30 minutes** most days of the week
• **Talk test** - you should be able to hold a conversation
• **Stay hydrated** - drink water before, during, after
• **Avoid overheating** - exercise in cool environments

**📅 MODIFICATIONS BY TRIMESTER:**

**First Trimester (1-12 weeks):**
• Can usually maintain pre-pregnancy routine
• May need to reduce intensity due to fatigue
• Listen to your body - rest when needed

**Second Trimester (13-27 weeks):**
• Often the best time for exercise
• **Avoid lying flat on back** after 20 weeks
• Watch balance as center of gravity changes

**Third Trimester (28-40 weeks):**
• Focus on maintaining fitness vs. improving
• **Lower impact** exercises become more comfortable
• **Swimming** becomes especially beneficial

**❌ EXERCISES TO AVOID:**
• **Contact sports** - soccer, basketball, hockey
• **High fall risk activities** - skiing, horseback riding, outdoor cycling
• **Scuba diving** - pressure changes dangerous for baby
• **Hot yoga/Bikram** - risk of overheating
• **Exercises lying flat on back** - after 20 weeks
• **Heavy weightlifting** - risk of injury, blood pressure spikes
• **High-intensity intervals** - if not done pre-pregnancy

**🛑 STOP EXERCISING & CALL DOCTOR IF:**
• **Vaginal bleeding** or fluid leakage
• **Persistent contractions** that don't stop with rest
• **Severe shortness of breath** before exertion
• **Chest pain** or heart palpitations
• **Calf pain or swelling** (potential blood clot)
• **Severe headache** or dizziness
• **Decreased fetal movement** after exercise

**💡 BEGINNER TIPS:**
• **Start slowly** - 15 minutes 3x/week if sedentary
• **Warm up and cool down** - 5 minutes each
• **Wear supportive sports bra** - breast support important
• **Choose proper footwear** - supportive athletic shoes
• **Consider prenatal fitness classes** - designed for pregnant women

**🎯 BENEFITS OF PREGNANCY EXERCISE:**
• Reduces back pain and improves posture
• Boosts energy and improves sleep
• Reduces risk of gestational diabetes
• May lead to easier labor and faster recovery
• Improves mood and reduces pregnancy discomfort`,
        confidence: 0.96,
        source: 'ACOG Exercise Guidelines'
      }
    }
  },

  // 😴 SLEEP & COMFORT
  sleep: {
    exactMatches: [
      'cant sleep', 'insomnia pregnancy', 'sleep problems', 'best sleep position',
      'pregnancy pillow', 'sleep during pregnancy', 'restless legs', 'frequent urination night'
    ],
    keywordGroups: [
      ['sleep', 'problems'],
      ['sleep', 'position'],
      ['cant', 'sleep'],
      ['restless', 'legs']
    ],
    responses: {
      'pregnancy sleep guide': {
        answer: `😴 **Better Sleep During Pregnancy - Complete Guide**

**🛏️ BEST SLEEP POSITIONS:**

**Left Side Sleeping (Optimal):**
• **Improves blood flow** to baby and your organs
• **Reduces pressure** on liver and major blood vessels
• **Best for baby's growth** - maximum nutrients and oxygen
• **Reduces swelling** in legs, ankles, and feet

**Right Side (Also Safe):**
• Good alternative to left side
• **Switch sides** during night if uncomfortable
• Better than back or stomach sleeping

**🚫 POSITIONS TO AVOID:**
• **On your back** - after 20 weeks (compresses major blood vessels)
• **On your stomach** - becomes uncomfortable as belly grows

**🛌 SLEEP COMFORT STRATEGIES:**

**Pregnancy Pillow Setup:**
• **Between knees** - reduces hip and back strain
• **Under belly** - supports growing bump
• **Behind back** - prevents rolling onto back
• **Full body pillow** - provides total support

**🌙 SLEEP HYGIENE:**
• **Consistent bedtime** - same time every night
• **Cool room** - 65-68°F ideal temperature
• **Dark environment** - blackout curtains or eye mask
• **Comfortable mattress** - firm support for back
• **Limit screen time** - no phones/TV 1 hour before bed

**🚽 MANAGING FREQUENT URINATION:**
• **Drink fluids during day** - reduce 2-3 hours before bed
• **Don't restrict fluids** completely - stay hydrated
• **Double void** - urinate, wait, then try again
• **Lean forward** when urinating to empty bladder completely

**🦵 RESTLESS LEG SYNDROME RELIEF:**
• **Gentle stretching** before bed - calf stretches
• **Warm bath** - relaxes muscles
• **Massage legs** - improves circulation
• **Iron check** - ask doctor about iron levels
• **Avoid caffeine** - can worsen symptoms

**💤 MANAGING INSOMNIA:**

**Relaxation Techniques:**
• **Deep breathing** - 4-7-8 technique
• **Progressive muscle relaxation** - tense and release muscle groups
• **Prenatal meditation apps** - guided relaxation
• **Gentle yoga** - child's pose, cat-cow stretches

**🍵 Natural Sleep Aids:**
• **Chamomile tea** - caffeine-free, calming
• **Warm milk** - contains tryptophan
• **Magnesium supplement** - consult doctor first
• **Essential oils** - lavender (pregnancy-safe use)

**⏰ DAYTIME HABITS:**
• **Natural light exposure** - morning sunlight helps circadian rhythm
• **Regular exercise** - but not 4 hours before bed
• **Nap wisely** - 20-30 minutes max, before 3 PM
• **Avoid large meals** - finish eating 2-3 hours before bed

**🚨 CALL DOCTOR IF:**
• **Severe insomnia** - affecting daily functioning
• **Sleep apnea symptoms** - loud snoring, gasping
• **Restless legs** - interfering with sleep nightly
• **Depression/anxiety** - affecting sleep and mood

**📊 SLEEP NEEDS:**
• **7-9 hours nightly** - same as non-pregnant women
• **Quality over quantity** - deep, restorative sleep
• **Listen to your body** - rest when tired during day`,
        confidence: 0.95,
        source: 'National Sleep Foundation'
      }
    }
  },

  // 🔥 HEARTBURN & DIGESTIVE ISSUES
  digestive: {
    exactMatches: [
      'heartburn', 'acid reflux', 'indigestion', 'constipation', 'hemorrhoids',
      'gas and bloating', 'digestive problems', 'stomach acid', 'burning chest'
    ],
    keywordGroups: [
      ['heartburn', 'acid'],
      ['constipation', 'bowel'],
      ['gas', 'bloating'],
      ['hemorrhoids', 'rectal']
    ],
    responses: {
      'heartburn relief pregnancy': {
        answer: `🔥 **Heartburn During Pregnancy - Complete Relief Guide**

**🔍 Why Heartburn Happens:**
• **Progesterone hormone** relaxes stomach valve
• **Growing baby** pushes stomach upward
• **Slower digestion** - food stays in stomach longer
• **Most common** in 2nd and 3rd trimesters

**🍽️ DIETARY SOLUTIONS:**

**Foods That Help:**
• **Milk or yogurt** - neutralizes stomach acid
• **Ginger tea** - soothes digestive system
• **Papaya** - natural digestive enzymes
• **Oatmeal** - absorbs excess acid
• **Bananas** - natural antacid properties
• **Almonds** - neutralize stomach acid

**Foods to Avoid:**
• **Spicy foods** - hot peppers, curry, hot sauce
• **Acidic foods** - citrus fruits, tomatoes, vinegar
• **Fatty/fried foods** - slow digestion, worsen symptoms
• **Chocolate** - relaxes stomach valve
• **Caffeine** - coffee, tea, sodas
• **Peppermint** - can worsen heartburn (despite helping nausea)

**🕐 EATING STRATEGIES:**
• **Small, frequent meals** - 5-6 times daily vs. 3 large
• **Eat slowly** - chew thoroughly, don't rush
• **Stop before full** - avoid overeating
• **No eating 2-3 hours before bed** - allows digestion
• **Stay upright after meals** - 30-60 minutes
• **Drink fluids between meals** - not during meals

**😴 SLEEP POSITIONING:**
• **Elevate head** - 6-8 inches with extra pillows
• **Sleep on left side** - reduces acid reflux
• **Wedge pillow** - gradual elevation better than flat pillows

**💊 SAFE MEDICATIONS (Consult Doctor First):**
• **Tums/Rolaids** - calcium carbonate antacids
• **Mylanta** - magnesium/aluminum antacids  
• **Pepcid** - H2 blocker (doctor approval needed)
• **Avoid Alka-Seltzer** - contains aspirin

**🏃‍♀️ LIFESTYLE CHANGES:**
• **Loose clothing** - avoid tight waistbands
• **Good posture** - don't slouch after eating
• **Gentle exercise** - walking aids digestion
• **Stress reduction** - stress worsens heartburn
• **Quit smoking** - if applicable (should quit anyway)

**📈 NATURAL REMEDIES:**
• **Apple cider vinegar** - 1 tsp in water (check with doctor)
• **Slippery elm** - throat-soothing herb
• **Chamomile tea** - anti-inflammatory
• **Fresh ginger** - 1/4 tsp powder or fresh slice

**🚨 CALL DOCTOR IF:**
• **Severe symptoms** - interfering with eating/sleeping
• **No relief** from diet changes and safe medications
• **Chest pain** - could indicate other issues
• **Difficulty swallowing** - needs medical evaluation
• **Weight loss** - from inability to eat

**⏰ TIMELINE:**
• **Often improves** after baby drops (around 36 weeks)
• **Resolves** after delivery when hormones normalize
• **Prevention better** than treatment - start early`,
        confidence: 0.97,
        source: 'American Gastroenterological Association'
      }
    }
  }
};

// 🧠 PRECISE MATCHING ALGORITHM
export function findPreciseMatch(userQuestion) {
  const query = userQuestion.toLowerCase().trim();
  console.log('🔍 Searching for:', query);

  // Step 1: Check emergency symptoms FIRST
  for (const phrase of COMPREHENSIVE_PREGNANCY_DB.emergency.exactMatches) {
    if (query.includes(phrase)) {
      console.log('🚨 EMERGENCY DETECTED:', phrase);
      return {
        ...COMPREHENSIVE_PREGNANCY_DB.emergency.response,
        matchType: 'emergency',
        matchedPhrase: phrase,
        matchScore: 1000 // Highest priority
      };
    }
  }

  // Step 2: Check exact matches in each category
  for (const [category, categoryData] of Object.entries(COMPREHENSIVE_PREGNANCY_DB)) {
    if (category === 'emergency') continue; // Already checked

    // Check exact matches first
    if (categoryData.exactMatches) {
      for (const exactMatch of categoryData.exactMatches) {
        if (query.includes(exactMatch)) {
          // Find the best response for this match
          const responseKey = Object.keys(categoryData.responses)[0];
          console.log('✅ EXACT MATCH:', exactMatch, 'in category:', category);
          return {
            ...categoryData.responses[responseKey],
            matchType: 'exact',
            matchedPhrase: exactMatch,
            category: category,
            matchScore: 900 // High priority
          };
        }
      }
    }

    // Step 3: Check keyword groups for combined matches
    if (categoryData.keywordGroups) {
      for (const keywordGroup of categoryData.keywordGroups) {
        const matchedKeywords = keywordGroup.filter(keyword => query.includes(keyword));
        if (matchedKeywords.length >= 2) { // Require at least 2 keywords from group
          const responseKey = Object.keys(categoryData.responses)[0];
          console.log('✅ KEYWORD GROUP MATCH:', matchedKeywords, 'in category:', category);
          return {
            ...categoryData.responses[responseKey],
            matchType: 'keywordGroup',
            matchedKeywords: matchedKeywords,
            category: category,
            matchScore: 700 + (matchedKeywords.length * 50) // Variable priority
          };
        }
      }
    }
  }

  console.log('❌ No precise match found');
  return null; // No match found - will fall back to AI
}