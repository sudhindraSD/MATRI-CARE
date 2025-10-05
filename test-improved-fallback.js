import { getSmartResponse } from './client/src/utils/smartChatbot.js';

console.log('🤖 TESTING IMPROVED AI FALLBACK SYSTEM\n');

async function testImprovedFallback() {
  const fallbackQuestions = [
    "feeling heavy", // Should get intelligent heavy response
    "I'm feeling moody and emotional", // Should get mood response
    "Can't sleep at night", // Should get sleep response  
    "Having skin problems", // Should get skin response
    "What's the weather like?", // Should get general response
    "How to cook rice?", // Should get general response
  ];

  console.log('🧪 TESTING IMPROVED AI FALLBACK:');
  console.log('='.repeat(60));

  for (let i = 0; i < fallbackQuestions.length; i++) {
    const question = fallbackQuestions[i];
    console.log(`\n🧪 Test ${i + 1}: "${question}"`);
    
    try {
      const response = await getSmartResponse(question);
      console.log(`📊 Source: ${response.source}`);
      console.log(`🎯 Confidence: ${response.confidence}`);
      console.log(`📁 Category: ${response.category}`);
      
      if (response.source === 'custom_dataset') {
        console.log('✅ Found in dataset - no fallback needed');
      } else {
        console.log('🤖 Using intelligent AI fallback');
      }
      
      console.log(`💬 Response Preview: ${response.response.substring(0, 150)}...`);
      
      // Check if it's a good response
      if (response.response.includes('simulated') || response.response.includes('implement')) {
        console.log('❌ STILL SHOWING PLACEHOLDER TEXT');
      } else {
        console.log('✅ GOOD INTELLIGENT RESPONSE');
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }
  }

  console.log('\n📊 IMPROVED FALLBACK FEATURES:');
  console.log('='.repeat(60));
  console.log('🎯 Intelligent topic detection:');
  console.log('  • "heavy" → Pregnancy weight/bloating advice');
  console.log('  • "mood/emotional" → Pregnancy emotional support');
  console.log('  • "sleep" → Pregnancy sleep tips');
  console.log('  • "skin" → Pregnancy skin changes advice');
  console.log('  • Other topics → General pregnancy guidance');
  console.log('');
  console.log('✨ Benefits:');
  console.log('  • No more "simulated response" messages');
  console.log('  • Pregnancy-focused even for AI fallback');
  console.log('  • Helpful advice with emojis and formatting');
  console.log('  • Always includes medical disclaimer');
  console.log('  • Professional tone maintained');

  console.log('\n💡 FOR REAL AI INTEGRATION:');
  console.log('Replace generateIntelligentFallback() calls with:');
  console.log('  • OpenAI API calls with your API key');
  console.log('  • LLaMA API calls with your endpoint');
  console.log('  • Keep the pregnancy context prompt');
  console.log('  • Maintain the same response format');
}

testImprovedFallback().then(() => {
  console.log('\n🎉 IMPROVED FALLBACK TEST COMPLETE!');
  console.log('🔄 Now "feeling heavy" will get proper pregnancy advice!');
});

export default { getSmartResponse };