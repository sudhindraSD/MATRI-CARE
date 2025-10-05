// Smart Daily Health Tips System for MATRI-CARE
// Automatically updates based on date and user's gestational age

export const getDailyHealthTip = (gestationalWeeks = 24) => {
  // Get today's date as a seed for tip selection
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  // Determine pregnancy trimester
  const trimester = gestationalWeeks <= 13 ? 1 : gestationalWeeks <= 27 ? 2 : 3;
  
  // General pregnancy tips (works for all trimesters)
  const generalTips = [
    {
      emoji: "💧",
      title: "Stay Hydrated",
      tip: "Drink at least 8-10 glasses of water daily. Proper hydration supports your baby's development and helps prevent common pregnancy discomforts.",
      goals: [
        { icon: "🎯", text: "Goal: 8-10 glasses" },
        { icon: "🌱", text: "Benefits: Baby growth" }
      ]
    },
    {
      emoji: "🚶‍♀️",
      title: "Gentle Exercise",
      tip: "Take a 20-30 minute walk daily. Walking improves circulation, reduces swelling, and helps maintain a healthy weight during pregnancy.",
      goals: [
        { icon: "⏰", text: "Duration: 20-30 min" },
        { icon: "💪", text: "Benefits: Better circulation" }
      ]
    },
    {
      emoji: "🥗",
      title: "Eat Iron-Rich Foods",
      tip: "Include spinach, lean red meat, and beans in your diet. Iron prevents anemia and supports your baby's brain development.",
      goals: [
        { icon: "🍃", text: "Sources: Spinach, meat" },
        { icon: "🧠", text: "Benefits: Brain development" }
      ]
    },
    {
      emoji: "😴",
      title: "Quality Sleep",
      tip: "Aim for 7-9 hours of sleep nightly. Sleep on your left side to improve blood flow to your baby and reduce back pain.",
      goals: [
        { icon: "🕘", text: "Goal: 7-9 hours" },
        { icon: "👶", text: "Benefits: Better blood flow" }
      ]
    },
    {
      emoji: "🧘‍♀️",
      title: "Manage Stress",
      tip: "Practice deep breathing or prenatal meditation for 10 minutes daily. Reducing stress benefits both you and your baby's development.",
      goals: [
        { icon: "⏱️", text: "Time: 10 minutes" },
        { icon: "🧘", text: "Method: Deep breathing" }
      ]
    },
    {
      emoji: "🥛",
      title: "Calcium Intake",
      tip: "Consume 3 servings of dairy or calcium-rich foods daily. Your baby needs calcium for strong bones and teeth development.",
      goals: [
        { icon: "🥛", text: "Goal: 3 servings" },
        { icon: "🦴", text: "Benefits: Strong bones" }
      ]
    },
    {
      emoji: "🍊",
      title: "Vitamin C Power",
      tip: "Eat citrus fruits, strawberries, or bell peppers. Vitamin C helps iron absorption and boosts your immune system.",
      goals: [
        { icon: "🍓", text: "Sources: Fruits, peppers" },
        { icon: "🛡️", text: "Benefits: Immune boost" }
      ]
    }
  ];

  // First trimester specific tips (weeks 1-13)
  const firstTrimesterTips = [
    {
      emoji: "💊",
      title: "Folic Acid Daily",
      tip: "Take 400-800mcg of folic acid daily. This crucial nutrient prevents neural tube defects during early brain and spine development.",
      goals: [
        { icon: "💊", text: "Dose: 400-800mcg" },
        { icon: "🧠", text: "Prevents: Neural defects" }
      ]
    },
    {
      emoji: "🤢",
      title: "Combat Morning Sickness",
      tip: "Eat small, frequent meals and keep crackers by your bed. Ginger tea or peppermint can also help reduce nausea.",
      goals: [
        { icon: "🍪", text: "Method: Small meals" },
        { icon: "🫖", text: "Helper: Ginger tea" }
      ]
    },
    {
      emoji: "☕",
      title: "Limit Caffeine",
      tip: "Keep caffeine under 200mg daily (about 1 cup of coffee). Excessive caffeine can affect your baby's growth and development.",
      goals: [
        { icon: "☕", text: "Limit: 1 cup coffee" },
        { icon: "👶", text: "Protects: Baby growth" }
      ]
    }
  ];

  // Second trimester specific tips (weeks 14-27)
  const secondTrimesterTips = [
    {
      emoji: "🍎",
      title: "Healthy Weight Gain",
      tip: "Aim for 1-2 pounds weight gain per week. Focus on nutrient-dense foods rather than empty calories for optimal baby development.",
      goals: [
        { icon: "⚖️", text: "Goal: 1-2 lbs/week" },
        { icon: "🍎", text: "Focus: Nutrient-dense" }
      ]
    },
    {
      emoji: "👶",
      title: "Track Baby Movements",
      tip: "Start noticing your baby's movement patterns. Regular movement is a sign of good health - you should feel movements daily now.",
      goals: [
        { icon: "📝", text: "Track: Daily patterns" },
        { icon: "✅", text: "Sign: Good health" }
      ]
    },
    {
      emoji: "🦷",
      title: "Dental Care",
      tip: "Schedule a dental cleaning if you haven't yet. Pregnancy hormones can cause gum problems, so maintain excellent oral hygiene.",
      goals: [
        { icon: "🪥", text: "Do: Regular brushing" },
        { icon: "🩺", text: "Visit: Dentist" }
      ]
    }
  ];

  // Third trimester specific tips (weeks 28-40)
  const thirdTrimesterTips = [
    {
      emoji: "🎒",
      title: "Prepare Hospital Bag",
      tip: "Start packing your hospital bag. Include comfortable clothes, nursing bras, phone charger, and important documents.",
      goals: [
        { icon: "👕", text: "Pack: Comfort items" },
        { icon: "📋", text: "Include: Documents" }
      ]
    },
    {
      emoji: "🏥",
      title: "Birth Plan Ready",
      tip: "Discuss your birth preferences with your healthcare provider. Having a flexible plan helps you feel prepared for delivery day.",
      goals: [
        { icon: "📝", text: "Create: Birth plan" },
        { icon: "🗣️", text: "Discuss: With doctor" }
      ]
    },
    {
      emoji: "👶",
      title: "Baby Kick Counts",
      tip: "Monitor baby's movements daily. Count 10 movements within 2 hours. Less movement than usual? Contact your healthcare provider.",
      goals: [
        { icon: "🔢", text: "Count: 10 in 2 hours" },
        { icon: "📞", text: "Call if: Less movement" }
      ]
    }
  ];

  // Combine tips based on trimester
  let availableTips = [...generalTips];
  
  if (trimester === 1) {
    availableTips = [...availableTips, ...firstTrimesterTips];
  } else if (trimester === 2) {
    availableTips = [...availableTips, ...secondTrimesterTips];
  } else if (trimester === 3) {
    availableTips = [...availableTips, ...thirdTrimesterTips];
  }

  // Select tip based on day of year (ensures daily rotation)
  const tipIndex = dayOfYear % availableTips.length;
  const selectedTip = availableTips[tipIndex];

  // Add contextual information
  return {
    ...selectedTip,
    trimester,
    gestationalWeeks,
    dayOfYear,
    date: today.toLocaleDateString(),
    category: getTipCategory(selectedTip.title),
    isPersonalized: trimester === 1 ? firstTrimesterTips.includes(selectedTip) :
                   trimester === 2 ? secondTrimesterTips.includes(selectedTip) :
                   trimester === 3 ? thirdTrimesterTips.includes(selectedTip) : false
  };
};

// Helper function to categorize tips
const getTipCategory = (title) => {
  const categories = {
    'Nutrition': ['Eat Iron-Rich Foods', 'Calcium Intake', 'Vitamin C Power', 'Healthy Weight Gain'],
    'Lifestyle': ['Stay Hydrated', 'Gentle Exercise', 'Quality Sleep', 'Manage Stress'],
    'Medical': ['Folic Acid Daily', 'Dental Care', 'Baby Kick Counts'],
    'Preparation': ['Prepare Hospital Bag', 'Birth Plan Ready'],
    'Wellness': ['Combat Morning Sickness', 'Limit Caffeine', 'Track Baby Movements']
  };

  for (const [category, titles] of Object.entries(categories)) {
    if (titles.some(t => title.includes(t))) {
      return category;
    }
  }
  return 'General';
};

// Get weekly tips for advanced users
export const getWeeklyTips = (gestationalWeeks) => {
  const tips = [];
  for (let i = 0; i < 7; i++) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + i);
    const dayOfYear = Math.floor((futureDate - new Date(futureDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    // Temporarily modify the day calculation for preview
    const tempTip = getDailyHealthTip(gestationalWeeks);
    tips.push({
      ...tempTip,
      date: futureDate.toLocaleDateString(),
      dayName: futureDate.toLocaleDateString('en-US', { weekday: 'long' })
    });
  }
  return tips;
};

export default getDailyHealthTip;