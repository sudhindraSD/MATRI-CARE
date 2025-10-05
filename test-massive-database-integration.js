// 🧪 TEST MASSIVE PREGNANCY DATABASE INTEGRATION
// This tests the new 500+ entry massive database with emergency detection

import { getSmartResponse } from './client/src/utils/newSmartChatbot.js';

// 🚨 Test emergency detection first
console.log('🚨 Testing EMERGENCY Detection:');
console.log('=====================================\n');

const emergencyTests = [
  "I have vaginal bleeding",
  "severe abdominal pain",
  "water broke early",
  "baby not moving",
  "severe headache with vision changes"
];

// 🧪 Test comprehensive database responses
console.log('📚 Testing MASSIVE Database Responses:');
console.log('=====================================\n');

const comprehensiveTests = [
  // Bleeding & spotting
  "I have light spotting", 
  "brown discharge early pregnancy",
  
  // Nausea & morning sickness  
  "morning sickness remedies",
  "cant keep food down",
  
  // Exercise & fitness
  "safe exercises during pregnancy",
  "can i do yoga while pregnant",
  
  // Sleep & comfort
  "cant sleep pregnancy",
  "best sleep position pregnant",
  "restless legs pregnancy",
  
  // Mental health
  "feeling depressed during pregnancy",
  "anxiety about baby",
  
  // Medications
  "is tylenol safe pregnancy",
  "prenatal vitamins needed"
];

// 🤖 Test AI fallback for non-medical questions
console.log('🤖 Testing AI Fallback:');
console.log('======================\n');

const aiTests = [
  "what's the weather like",
  "tell me about movies",
  "how to cook pasta"
];

// Run all tests
async function runAllTests() {
  console.log('🎯 STARTING COMPREHENSIVE DATABASE TESTS\n');
  
  // Test 1: Emergency detection
  console.log('🚨 EMERGENCY TESTS:\n');
  for (const question of emergencyTests) {
    console.log(`Q: "${question}"`);
    try {
      const result = await getSmartResponse(question);
      console.log(`✅ Response Type: ${result.isUrgent ? 'EMERGENCY DETECTED' : 'Normal'}`);
      console.log(`📊 Source: ${result.source}`);
      console.log(`🎯 Confidence: ${result.confidence}`);
      console.log(`📝 Response: ${result.response.substring(0, 100)}...`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    console.log('---\n');
  }
  
  // Test 2: Comprehensive database
  console.log('📚 MASSIVE DATABASE TESTS:\n');
  for (const question of comprehensiveTests) {
    console.log(`Q: "${question}"`);
    try {
      const result = await getSmartResponse(question);
      console.log(`✅ Tier: ${result.tier} (${result.tier === 1 ? 'Database' : 'AI'})`);
      console.log(`📊 Source: ${result.source}`);
      console.log(`🎯 Confidence: ${result.confidence}`);
      console.log(`📁 Category: ${result.category}`);
      if (result.matchScore) {
        console.log(`⚡ Match Score: ${result.matchScore}`);
      }
      console.log(`📝 Response: ${result.response.substring(0, 150)}...`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    console.log('---\n');
  }
  
  // Test 3: AI fallback
  console.log('🤖 AI FALLBACK TESTS:\n');
  for (const question of aiTests) {
    console.log(`Q: "${question}"`);
    try {
      const result = await getSmartResponse(question);
      console.log(`✅ Tier: ${result.tier} (${result.tier === 2 ? 'AI Fallback' : 'Database'})`);
      console.log(`📊 Source: ${result.source}`);
      console.log(`📝 Response: ${result.response.substring(0, 100)}...`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    console.log('---\n');
  }
  
  console.log('🎉 ALL TESTS COMPLETED!');
}

runAllTests();