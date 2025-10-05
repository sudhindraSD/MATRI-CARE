// Test script for keyword matching fix
import { getSmartResponse } from './client/src/utils/newSmartChatbot.js';

const testQueries = [
  {
    question: "What's the weather like today?",
    expected: "AI", 
    description: "Weather query should go to AI"
  },
  {
    question: "My stomach feels tight during pregnancy",
    expected: "DATABASE",
    description: "Pregnancy symptom should use database"
  },
  {
    question: "How much water should I drink?",
    expected: "AI",
    description: "Generic water question should go to AI"
  },
  {
    question: "How much water should I drink during pregnancy?",
    expected: "DATABASE", 
    description: "Pregnancy water question should use database"
  },
  {
    question: "Who won the football game yesterday?",
    expected: "AI",
    description: "Sports query should go to AI"
  },
  {
    question: "Hello, how are you?",
    expected: "AI",
    description: "Greeting should go to AI"
  }
];

async function runTests() {
  console.log('🧪 TESTING KEYWORD MATCHING FIX\n');
  
  let passed = 0;
  let total = testQueries.length;
  
  for (const test of testQueries) {
    console.log(`\n🔍 Testing: "${test.question}"`);
    console.log(`📝 Expected: ${test.expected} (${test.description})`);
    
    try {
      const response = await getSmartResponse(test.question);
      const actual = response.tier === 1 ? "DATABASE" : (response.tier === 2 ? "AI" : "ERROR");
      
      const success = actual === test.expected;
      console.log(`✅ Result: ${actual} (Tier ${response.tier}) - ${success ? 'PASS' : 'FAIL'}`);
      console.log(`📊 Source: ${response.source} | Match Score: ${response.matchScore || 'N/A'}`);
      
      if (success) passed++;
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }
  }
  
  console.log(`\n📈 SUMMARY: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 ALL TESTS PASSED! The keyword matching fix is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. The fix may need adjustment.');
  }
}

// Run the tests
runTests().catch(console.error);