// 🐛 DEBUG PROFILE UPDATE ERROR
// This helps identify why "Resource not found" error occurs

import fetch from 'node-fetch';

console.log('🐛 DEBUGGING PROFILE UPDATE ERROR\n');

// Test data that should work
const testProfileData = {
  age: 28,
  gestationalAgeWeeks: 24,
  height: 165,
  weight: 68,
  stressLevel: 5,
  hasSupportSystem: true,
  hasHypertension: false,
  hasDiabetes: false,
  smokes: false,
  consumesAlcohol: false
};

console.log('📤 Test Data:');
console.log(JSON.stringify(testProfileData, null, 2));

async function testProfileUpdate() {
  try {
    // First, let's test if the endpoint exists
    console.log('\n1️⃣ Testing if endpoint exists...');
    
    const response = await fetch('http://localhost:5000/api/v1/users/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // We don't have auth token, so this should fail with 401, not 404
      },
      body: JSON.stringify(testProfileData)
    });
    
    const result = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (response.status === 404) {
      console.log('❌ PROBLEM: Endpoint not found - Check route configuration');
    } else if (response.status === 401) {
      console.log('✅ GOOD: Endpoint exists but needs authentication');
    } else {
      console.log('⚠️ UNEXPECTED: Different status code received');
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ PROBLEM: Server is not running');
      console.log('💡 SOLUTION: Start server with "npm run dev"');
    } else {
      console.log('❌ Network Error:', error.message);
    }
  }
}

// Run the test
testProfileUpdate();

console.log('\n🔍 DEBUG CHECKLIST:');
console.log('==================');
console.log('1. Is the backend server running? (npm run dev)');
console.log('2. Is MongoDB connected?');
console.log('3. Are you logged in on the frontend?');
console.log('4. Check browser network tab for actual request being sent');
console.log('5. Check server console logs for detailed errors');

console.log('\n💡 COMMON CAUSES OF "Resource not found":');
console.log('=========================================');
console.log('• Authentication token is invalid/expired');
console.log('• User profile cannot be found in database');
console.log('• Route configuration is incorrect');
console.log('• Server is not running or crashed');
console.log('• Database connection lost');

console.log('\n🔧 QUICK FIXES TO TRY:');
console.log('======================');
console.log('1. Logout and login again (refresh auth token)');
console.log('2. Check server logs for detailed error messages');
console.log('3. Restart both frontend and backend servers');
console.log('4. Clear browser cache and cookies');
console.log('5. Check MongoDB connection status');