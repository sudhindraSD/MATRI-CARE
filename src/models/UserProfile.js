import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    // Basic Info
    age: {
      type: Number,
      min: [10, 'Age must be at least 10'],
      max: [60, 'Age must be less than 60']
    },
    gestationalAgeWeeks: {
      type: Number,
      min: [1, 'Gestational age must be at least 1 week'],
      max: [42, 'Gestational age must be less than 42 weeks']
    },
    gravidity: {
      type: Number,
      min: [0, 'Gravidity cannot be negative']
    },
    parity: {
      type: Number,
      min: [0, 'Parity cannot be negative']
    },
    height: {
      type: Number,
      min: [100, 'Height must be at least 100cm'],
      max: [250, 'Height must be less than 250cm']
    },
    weight: {
      type: Number,
      min: [30, 'Weight must be at least 30kg'],
      max: [200, 'Weight must be less than 200kg']
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    // Medical History
    hasHypertension: {
      type: Boolean,
      default: false
    },
    hasDiabetes: {
      type: Boolean,
      default: false
    },
    previousComplications: [{
      type: String
    }],
    chronicIllnesses: [{
      type: String
    }],
    allergies: [{
      type: String
    }],
    currentMedications: [{
      name: String,
      dosage: String,
      frequency: String
    }],
    // Current Pregnancy Specifics
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
      lastChecked: Date
    },
    bloodSugar: {
      value: Number,
      unit: {
        type: String,
        enum: ['mg/dL', 'mmol/L']
      },
      lastChecked: Date
    },
    hemoglobin: {
      value: Number,
      unit: {
        type: String,
        enum: ['g/dL', 'g/L']
      },
      lastChecked: Date
    },
    fetalMovements: {
      count: Number,
      date: Date
    },
    urinarySymptoms: [{
      type: String,
      enum: ['pain', 'burning', 'frequency', 'urgency', 'incontinence']
    }],
    vaginalDischarge: {
      hasDischarge: Boolean,
      color: String,
      amount: String,
      hasOdor: Boolean
    },
    hasBleeding: {
      type: Boolean,
      default: false
    },
    swelling: [{
      location: String,
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe']
      }
    }],
    hasHeadache: {
      type: Boolean,
      default: false
    },
    hasVisionDisturbance: {
      type: Boolean,
      default: false
    },
    hasDizziness: {
      type: Boolean,
      default: false
    },
    abdominalPain: {
      hasPain: Boolean,
      frequency: String,
      intensity: {
        type: String,
        enum: ['mild', 'moderate', 'severe']
      },
      description: String
    },
    weightGain: {
      value: Number,
      unit: {
        type: String,
        enum: ['kg', 'lbs']
      },
      sinceLastVisit: Boolean
    },
    hasFever: {
      type: Boolean,
      default: false
    },
    recentInfections: [{
      type: String
    }],
    // Lifestyle Factors
    smokes: {
      type: Boolean,
      default: false
    },
    consumesAlcohol: {
      type: Boolean,
      default: false
    },
    usesTobacco: {
      type: Boolean,
      default: false
    },
    nutritionalHabits: {
      dietType: String,
      supplements: [String],
      mealsPerDay: Number
    },
    physicalActivity: {
      level: {
        type: String,
        enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
      },
      minutesPerWeek: Number,
      type: [String]
    },
    // Psychosocial Factors
    stressLevel: {
      type: Number,
      min: 1,
      max: 10
    },
    hasSupportSystem: Boolean,
    healthcareAccess: {
      hasInsurance: Boolean,
      regularProvider: Boolean,
      transportation: String
    },
    livingConditions: {
      housingType: String,
      hasRunningWater: Boolean,
      hasElectricity: Boolean,
      sanitation: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create a compound index for user and timestamps
userProfileSchema.index({ user: 1, createdAt: -1 });

// Create a text index for search functionality
userProfileSchema.index(
  { 
    'emergencyContact.name': 'text',
    'emergencyContact.phone': 'text',
    allergies: 'text',
    'currentMedications.name': 'text',
    'vaginalDischarge.color': 'text',
    'abdominalPain.description': 'text',
    'nutritionalHabits.dietType': 'text',
    'nutritionalHabits.supplements': 'text',
    'physicalActivity.type': 'text',
    'healthcareAccess.transportation': 'text',
    'livingConditions.housingType': 'text',
    'livingConditions.sanitation': 'text'
  },
  {
    name: 'searchIndex',
    weights: {
      'emergencyContact.name': 5,
      'emergencyContact.phone': 3,
      allergies: 2,
      'currentMedications.name': 4,
      'vaginalDischarge.color': 1,
      'abdominalPain.description': 3,
      'nutritionalHabits.dietType': 2,
      'nutritionalHabits.supplements': 2,
      'physicalActivity.type': 1,
      'healthcareAccess.transportation': 1,
      'livingConditions.housingType': 1,
      'livingConditions.sanitation': 1
    }
  }
);

// Pre-save hook to ensure one profile per user
userProfileSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingProfile = await this.constructor.findOne({ user: this.user });
    if (existingProfile) {
      throw new Error('User already has a profile');
    }
  }
  next();
});

// Virtual for BMI calculation
userProfileSchema.virtual('bmi').get(function() {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100; // Convert cm to meters
    return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }
  return null;
});

export default mongoose.model('UserProfile', userProfileSchema);
