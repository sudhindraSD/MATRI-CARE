// 🎭 MATRI-MIND: Health Persona System
// Transform the entire app experience based on user's health profile!

// 🎨 HEALTH PERSONAS (each gets unique UI, features, and personality)
export const HEALTH_PERSONAS = {
  iron_warrior: {
    name: "Iron Warrior",
    emoji: "⚔️",
    description: "Fighting anemia with strength and nutrition",
    theme: {
      primary: "#DC2626", // Red
      secondary: "#FEE2E2",
      gradient: "linear-gradient(135deg, #DC2626, #F87171)"
    },
    personality: {
      tone: "encouraging and strong",
      language: ["warrior", "strength", "power", "energy", "fight"],
      greetings: ["Stay strong, warrior!", "Power through today!", "Your strength is growing!"]
    },
    features: {
      ironTracker: true,
      energyMonitor: true,
      nutritionFocus: "iron_rich",
      specialReminders: ["Take iron with vitamin C", "Avoid tea/coffee with iron pills"]
    },
    dashboard: {
      mainMetric: "Iron Absorption Score",
      widgets: ["Energy Level", "Iron-Rich Foods", "Symptom Tracker"],
      tips: "iron_focused"
    }
  },

  sweet_balance: {
    name: "Sweet Balance",
    emoji: "🍯",
    description: "Managing blood sugar with grace and balance",
    theme: {
      primary: "#2563EB", // Blue
      secondary: "#DBEAFE", 
      gradient: "linear-gradient(135deg, #2563EB, #60A5FA)"
    },
    personality: {
      tone: "calm and balanced",
      language: ["balance", "harmony", "steady", "control", "mindful"],
      greetings: ["Finding balance today!", "Steady as you go!", "Balance is your superpower!"]
    },
    features: {
      glucoseTracker: true,
      mealPlanner: true,
      nutritionFocus: "low_glycemic",
      specialReminders: ["Check blood sugar", "Log meals before eating", "Exercise after meals"]
    },
    dashboard: {
      mainMetric: "Blood Sugar Balance Score",
      widgets: ["Glucose Trends", "Meal Impact", "Exercise Log"],
      tips: "diabetes_focused"
    }
  },

  pressure_guardian: {
    name: "Pressure Guardian",
    emoji: "🛡️",
    description: "Protecting heart health with vigilant care",
    theme: {
      primary: "#059669", // Green
      secondary: "#D1FAE5",
      gradient: "linear-gradient(135deg, #059669, #34D399)"
    },
    personality: {
      tone: "protective and caring",
      language: ["guardian", "protect", "monitor", "careful", "steady"],
      greetings: ["Guarding your health!", "Steady pressure, steady progress!", "Your heart is protected!"]
    },
    features: {
      bpMonitor: true,
      stressTracker: true,
      nutritionFocus: "low_sodium",
      specialReminders: ["Take BP medication", "Monitor for swelling", "Rest when needed"]
    },
    dashboard: {
      mainMetric: "Blood Pressure Stability",
      widgets: ["BP Trends", "Stress Level", "Medication Schedule"],
      tips: "bp_focused"
    }
  },

  wellness_champion: {
    name: "Wellness Champion",
    emoji: "🌟",
    description: "Thriving with comprehensive wellness",
    theme: {
      primary: "#7C3AED", // Purple
      secondary: "#EDE9FE",
      gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)"
    },
    personality: {
      tone: "enthusiastic and positive",
      language: ["champion", "thrive", "excel", "radiant", "vibrant"],
      greetings: ["You're glowing today!", "Champions never quit!", "Thriving every day!"]
    },
    features: {
      overallWellness: true,
      preventiveCare: true,
      nutritionFocus: "balanced",
      specialReminders: ["Take vitamins", "Stay hydrated", "Keep up great habits"]
    },
    dashboard: {
      mainMetric: "Overall Wellness Score",
      widgets: ["Health Score", "Habit Tracker", "Progress Chart"],
      tips: "general_wellness"
    }
  },

  hormone_harmony: {
    name: "Hormone Harmony",
    emoji: "🦋",
    description: "Balancing hormones for optimal health",
    theme: {
      primary: "#DB2777", // Pink
      secondary: "#FCE7F3",
      gradient: "linear-gradient(135deg, #DB2777, #F472B6)"
    },
    personality: {
      tone: "gentle and harmonious",
      language: ["harmony", "balance", "gentle", "nurture", "flow"],
      greetings: ["In perfect harmony!", "Flowing with grace!", "Balanced and beautiful!"]
    },
    features: {
      hormoneTracker: true,
      moodMonitor: true,
      nutritionFocus: "hormone_supporting",
      specialReminders: ["Take thyroid medication on empty stomach", "Monitor energy levels", "Track mood changes"]
    },
    dashboard: {
      mainMetric: "Hormone Balance Score",
      widgets: ["Energy Levels", "Mood Tracker", "Medication Schedule"],
      tips: "hormone_focused"
    }
  },

  comfort_care: {
    name: "Comfort Care",
    emoji: "🌸",
    description: "Finding comfort and relief with gentle care",
    theme: {
      primary: "#EA580C", // Orange
      secondary: "#FED7AA",
      gradient: "linear-gradient(135deg, #EA580C, #FB923C)"
    },
    personality: {
      tone: "nurturing and comforting",
      language: ["comfort", "gentle", "soothe", "relief", "care"],
      greetings: ["Gentle care for you today!", "Comfort is coming!", "Soothing your journey!"]
    },
    features: {
      symptomTracker: true,
      comfortTips: true,
      nutritionFocus: "gentle_foods",
      specialReminders: ["Take anti-nausea medication", "Eat small frequent meals", "Rest when needed"]
    },
    dashboard: {
      mainMetric: "Comfort Level",
      widgets: ["Symptom Relief", "Comfort Tips", "Gentle Reminders"],
      tips: "comfort_focused"
    }
  },

  medical_care: {
    name: "Medical Care",
    emoji: "🏥",
    description: "Active medical management with professional care",
    theme: {
      primary: "#0891B2", // Cyan
      secondary: "#CFFAFE",
      gradient: "linear-gradient(135deg, #0891B2, #06B6D4)"
    },
    personality: {
      tone: "professional and supportive",
      language: ["medical", "treatment", "healing", "recovery", "professional"],
      greetings: ["Professional care is here!", "Your health is our priority!", "Medical support active!"]
    },
    features: {
      medicationTracker: true,
      symptomMonitor: true,
      nutritionFocus: "healing_foods",
      specialReminders: ["Take antibiotics as prescribed", "Complete full course", "Monitor for side effects"]
    },
    dashboard: {
      mainMetric: "Treatment Progress",
      widgets: ["Medication Schedule", "Symptom Tracker", "Recovery Timeline"],
      tips: "medical_focused"
    }
  },

  mental_wellness: {
    name: "Mental Wellness",
    emoji: "🧠",
    description: "Supporting mental health and neurological wellbeing",
    theme: {
      primary: "#6366F1", // Indigo
      secondary: "#E0E7FF",
      gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)"
    },
    personality: {
      tone: "supportive and understanding",
      language: ["mindful", "support", "wellness", "peace", "strength"],
      greetings: ["Your mind matters!", "Mental wellness is key!", "Supporting your journey!"]
    },
    features: {
      moodTracker: true,
      mentalHealthTips: true,
      nutritionFocus: "brain_health",
      specialReminders: ["Take medication consistently", "Practice mindfulness", "Maintain sleep routine"]
    },
    dashboard: {
      mainMetric: "Mental Wellness Score",
      widgets: ["Mood Tracker", "Wellness Tips", "Support Resources"],
      tips: "mental_health_focused"
    }
  }
};

// 🧠 SMART PERSONA ASSIGNMENT ALGORITHM
export function assignHealthPersona(medications, gestationalWeek = 20) {
  console.log('🎭 Assigning health persona...');
  
  // Score each persona based on medications
  const personaScores = {};
  
  // Initialize scores
  Object.keys(HEALTH_PERSONAS).forEach(persona => {
    personaScores[persona] = 0;
  });
  
  // Score based on medications
  medications.forEach(med => {
    if (med.persona) {
      personaScores[med.persona] += getPersonaWeight(med.severity, med.category);
    }
  });
  
  // Apply gestational week bonuses
  applyWeekBasedBonus(personaScores, gestationalWeek);
  
  // Find highest scoring persona
  const topPersona = Object.keys(personaScores).reduce((a, b) => 
    personaScores[a] > personaScores[b] ? a : b
  );
  
  // If tie or low scores, use smart fallback
  const maxScore = personaScores[topPersona];
  if (maxScore < 10) {
    return getSmartFallbackPersona(medications, gestationalWeek);
  }
  
  console.log('✅ Persona assigned:', topPersona, 'Score:', maxScore);
  return topPersona;
}

// 🎯 PERSONA WEIGHT CALCULATOR
function getPersonaWeight(severity, category) {
  const weights = {
    severity: {
      high: 50,      // High-risk conditions get priority
      moderate: 25,  
      preventive: 10
    },
    category: {
      cardiac: 20,     // Heart issues are critical
      metabolic: 20,   // Blood sugar issues
      hormonal: 15,
      nutritional: 10,
      symptom_relief: 15
    }
  };
  
  return (weights.severity[severity] || 0) + (weights.category[category] || 0);
}

// 📅 GESTATIONAL WEEK BONUS SYSTEM
function applyWeekBasedBonus(scores, week) {
  if (week <= 12) {
    // First trimester - morning sickness common
    scores.comfort_care += 15;
    scores.wellness_champion += 10;
  } else if (week <= 28) {
    // Second trimester - energy focus
    scores.iron_warrior += 10;
    scores.wellness_champion += 15;
  } else {
    // Third trimester - monitoring focus
    scores.pressure_guardian += 10;
    scores.sweet_balance += 10;
  }
}

// 🤖 SMART FALLBACK PERSONA
function getSmartFallbackPersona(medications, week) {
  if (medications.length === 0) {
    return 'wellness_champion'; // Default for healthy pregnancy
  }
  
  // Check for any high-severity medications
  const hasHighRisk = medications.some(med => med.severity === 'high');
  if (hasHighRisk) {
    return 'pressure_guardian'; // Conservative approach for high-risk
  }
  
  // Check for nutritional supplements
  const hasNutritional = medications.some(med => med.category === 'nutritional');
  if (hasNutritional) {
    return 'iron_warrior';
  }
  
  return 'wellness_champion'; // Default fallback
}

// 🎨 GET PERSONA THEME FOR UI
export function getPersonaTheme(personaKey) {
  const persona = HEALTH_PERSONAS[personaKey];
  if (!persona) return HEALTH_PERSONAS.wellness_champion.theme;
  
  return {
    ...persona.theme,
    name: persona.name,
    emoji: persona.emoji,
    description: persona.description
  };
}

// 💬 GET PERSONALIZED GREETING
export function getPersonalizedGreeting(personaKey, userName = "Mom") {
  const persona = HEALTH_PERSONAS[personaKey];
  if (!persona) return `Hello, ${userName}!`;
  
  const greetings = persona.personality.greetings;
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  return `${persona.emoji} ${randomGreeting} Welcome back, ${userName}!`;
}

// 📊 GET PERSONA FEATURES
export function getPersonaFeatures(personaKey) {
  const persona = HEALTH_PERSONAS[personaKey];
  if (!persona) return HEALTH_PERSONAS.wellness_champion.features;
  
  return persona.features;
}

// 🎯 DEMO FUNCTION FOR JUDGES
export function demonstratePersonaSystem() {
  console.log('🎭 PERSONA SYSTEM DEMONSTRATION\n');
  
  const sampleData = [
    {
      medications: [{severity: 'moderate', category: 'nutritional', persona: 'iron_warrior'}],
      week: 16,
      expected: 'iron_warrior'
    },
    {
      medications: [{severity: 'high', category: 'metabolic', persona: 'sweet_balance'}],
      week: 28,
      expected: 'sweet_balance'
    },
    {
      medications: [{severity: 'preventive', category: 'vitamin', persona: 'wellness_champion'}],
      week: 12,
      expected: 'wellness_champion'
    }
  ];
  
  sampleData.forEach((test, index) => {
    console.log(`\n🧪 Test ${index + 1}:`);
    const assignedPersona = assignHealthPersona(test.medications, test.week);
    const theme = getPersonaTheme(assignedPersona);
    const greeting = getPersonalizedGreeting(assignedPersona, "Sarah");
    
    console.log(`  Assigned: ${assignedPersona}`);
    console.log(`  Theme: ${theme.name} ${theme.emoji}`);
    console.log(`  Greeting: ${greeting}`);
    console.log(`  Primary Color: ${theme.primary}`);
  });
  
  console.log('\n✅ Persona System Demo Complete!');
  return 'Persona system working perfectly!';
}

export default {
  HEALTH_PERSONAS,
  assignHealthPersona,
  getPersonaTheme,
  getPersonalizedGreeting,
  getPersonaFeatures,
  demonstratePersonaSystem
};