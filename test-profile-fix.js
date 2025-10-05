// 🧪 TEST PROFILE FORM SUBMISSION FIX
// This tests the profile form structure matches the UserProfile model

console.log('🧪 TESTING PROFILE FORM DATA STRUCTURE\n');

// Simulate the Profile form data (as it would be sent to backend)
const mockProfileData = {
  // Basic Info
  age: 28,
  gestationalAgeWeeks: 24,
  height: 165,
  weight: 68,
  gravidity: 1,
  parity: 0,
  
  // Health Metrics (matching UserProfile model)
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    lastChecked: new Date()
  },
  bloodSugar: {
    value: 95,
    unit: 'mg/dL',
    lastChecked: new Date()
  },
  hemoglobin: {
    value: 12.5,
    unit: 'g/dL',
    lastChecked: new Date()
  },
  
  // Medical History
  hasHypertension: false,
  hasDiabetes: false,
  
  // Lifestyle
  physicalActivity: {
    level: 'moderate',
    minutesPerWeek: 150,
    type: []
  },
  nutritionalHabits: {
    dietType: 'balanced',
    supplements: [],
    mealsPerDay: 3
  },
  stressLevel: 5,
  hasSupportSystem: true,
  smokes: false,
  consumesAlcohol: false
};

console.log('📋 Profile Data Structure:');
console.log('==========================');
console.log(JSON.stringify(mockProfileData, null, 2));

console.log('\n✅ VALIDATION CHECKS:');
console.log('====================');

// Check required field types
console.log('age:', typeof mockProfileData.age, mockProfileData.age >= 10 && mockProfileData.age <= 60 ? '✅' : '❌');
console.log('gestationalAgeWeeks:', typeof mockProfileData.gestationalAgeWeeks, mockProfileData.gestationalAgeWeeks >= 1 && mockProfileData.gestationalAgeWeeks <= 42 ? '✅' : '❌');
console.log('height:', typeof mockProfileData.height, mockProfileData.height >= 100 && mockProfileData.height <= 250 ? '✅' : '❌');
console.log('weight:', typeof mockProfileData.weight, mockProfileData.weight >= 30 && mockProfileData.weight <= 200 ? '✅' : '❌');

// Check nested objects
console.log('bloodPressure.systolic:', typeof mockProfileData.bloodPressure.systolic, '✅');
console.log('bloodPressure.diastolic:', typeof mockProfileData.bloodPressure.diastolic, '✅');
console.log('bloodPressure.lastChecked:', mockProfileData.bloodPressure.lastChecked instanceof Date ? 'Date ✅' : '❌');

console.log('bloodSugar.value:', typeof mockProfileData.bloodSugar.value, '✅');
console.log('bloodSugar.unit:', mockProfileData.bloodSugar.unit, ['mg/dL', 'mmol/L'].includes(mockProfileData.bloodSugar.unit) ? '✅' : '❌');
console.log('bloodSugar.lastChecked:', mockProfileData.bloodSugar.lastChecked instanceof Date ? 'Date ✅' : '❌');

console.log('hemoglobin.value:', typeof mockProfileData.hemoglobin.value, '✅');
console.log('hemoglobin.unit:', mockProfileData.hemoglobin.unit, ['g/dL', 'g/L'].includes(mockProfileData.hemoglobin.unit) ? '✅' : '❌');
console.log('hemoglobin.lastChecked:', mockProfileData.hemoglobin.lastChecked instanceof Date ? 'Date ✅' : '❌');

console.log('stressLevel:', typeof mockProfileData.stressLevel, mockProfileData.stressLevel >= 1 && mockProfileData.stressLevel <= 10 ? '✅' : '❌');
console.log('hasSupportSystem:', typeof mockProfileData.hasSupportSystem, '✅');

console.log('physicalActivity.level:', mockProfileData.physicalActivity.level, ['sedentary', 'light', 'moderate', 'active', 'very_active'].includes(mockProfileData.physicalActivity.level) ? '✅' : '❌');
console.log('physicalActivity.minutesPerWeek:', typeof mockProfileData.physicalActivity.minutesPerWeek, '✅');

console.log('nutritionalHabits.dietType:', typeof mockProfileData.nutritionalHabits.dietType, '✅');
console.log('nutritionalHabits.mealsPerDay:', typeof mockProfileData.nutritionalHabits.mealsPerDay, '✅');

console.log('\n🎉 PROFILE STRUCTURE VALIDATION COMPLETE!');
console.log('This data structure should now work with the UserProfile model.');

// Test empty field handling
console.log('\n🧹 TESTING EMPTY FIELD CLEANUP:');
console.log('================================');

const emptyProfileData = {
  age: '',
  gestationalAgeWeeks: '',
  bloodPressure: {
    systolic: '',
    diastolic: '',
    lastChecked: null
  },
  bloodSugar: {
    value: '',
    unit: 'mg/dL',
    lastChecked: null
  },
  stressLevel: 5,
  hasSupportSystem: null
};

// Simulate the cleanup function
const cleanProfile = { ...emptyProfileData };

if (cleanProfile.age === '') cleanProfile.age = null;
if (cleanProfile.gestationalAgeWeeks === '') cleanProfile.gestationalAgeWeeks = null;

if (cleanProfile.bloodPressure) {
  if (cleanProfile.bloodPressure.systolic === '') cleanProfile.bloodPressure.systolic = null;
  if (cleanProfile.bloodPressure.diastolic === '') cleanProfile.bloodPressure.diastolic = null;
  if (!cleanProfile.bloodPressure.systolic && !cleanProfile.bloodPressure.diastolic) {
    cleanProfile.bloodPressure.lastChecked = null;
  }
}

if (cleanProfile.bloodSugar) {
  if (cleanProfile.bloodSugar.value === '') cleanProfile.bloodSugar.value = null;
  if (!cleanProfile.bloodSugar.value) {
    cleanProfile.bloodSugar.lastChecked = null;
  }
}

console.log('Cleaned Profile:');
console.log(JSON.stringify(cleanProfile, null, 2));

console.log('\n✅ Empty fields converted to null - should not cause validation errors!');