import { getSmartResponse, findBestMatch, getChatbotStats, demonstrateSmartChatbot } from './client/src/utils/smartChatbot.js';

console.log('🤖 TESTING SMART HYBRID CHATBOT SYSTEM\n');

async function testChatbot() {
  // Test questions that SHOULD be in custom dataset
  const customDatasetQuestions = [
    "What should I eat during pregnancy?",
    "I'm feeling tired and nauseous",
    "Is exercise safe during pregnancy?",
    "When should I call my doctor?",
    "Can I take paracetamol while pregnant?",
    "What foods should I avoid?"
  ];

  // Test questions that should fall back to AI
  const fallbackQuestions = [
    "What's the weather like today?",
    "How do I cook pasta?",
    "Tell me about cryptocurrency",
    "What's the capital of France?"
  ];

  console.log('📚 TESTING CUSTOM DATASET RESPONSES:');
  console.log('='.repeat(50));

  for (let i = 0; i < customDatasetQuestions.length; i++) {
    const question = customDatasetQuestions[i];
    console.log(`\n🧪 Test ${i + 1}: "${question}"`);
    
    try {
      const response = await getSmartResponse(question);
      console.log(`📊 Source: ${response.source}`);
      console.log(`🎯 Confidence: ${response.confidence}`);
      console.log(`📁 Category: ${response.category}`);
      
      if (response.matchScore) {
        console.log(`⚡ Match Score: ${response.matchScore}`);
      }
      
      if (response.isUrgent) {
        console.log(`🚨 URGENT: Medical attention may be needed`);
      }
      
      console.log(`💬 Response Preview: ${response.response.substring(0, 120)}...`);
      
      // Check if it's from custom dataset
      if (response.source === 'custom_dataset') {
        console.log('✅ SUCCESS: Found in custom dataset!');
      } else {
        console.log('⚠️  FALLBACK: Using external AI');
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }
  }

  console.log('\n\n🌐 TESTING AI FALLBACK RESPONSES:');
  console.log('='.repeat(50));

  for (let i = 0; i < fallbackQuestions.length; i++) {
    const question = fallbackQuestions[i];
    console.log(`\n🧪 Fallback Test ${i + 1}: "${question}"`);
    
    try {
      const response = await getSmartResponse(question);
      console.log(`📊 Source: ${response.source}`);
      console.log(`🎯 Confidence: ${response.confidence}`);
      console.log(`📁 Category: ${response.category}`);
      console.log(`💬 Response Preview: ${response.response.substring(0, 120)}...`);
      
      // Check if it correctly fell back
      if (response.source !== 'custom_dataset') {
        console.log('✅ SUCCESS: Correctly fell back to AI!');
      } else {
        console.log('⚠️  UNEXPECTED: Should have fallen back to AI');
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }
  }

  // Test match scoring
  console.log('\n\n🎯 TESTING MATCH SCORING:');
  console.log('='.repeat(50));

  const scoringTests = [
    "What should I eat?", // Should match nutrition
    "I feel sick and nauseous", // Should match symptoms  
    "Can I exercise?", // Should match exercise
    "Random question about space" // Should not match
  ];

  scoringTests.forEach((question, index) => {
    console.log(`\n🔍 Scoring Test ${index + 1}: "${question}"`);
    const match = findBestMatch(question);
    
    if (match) {
      console.log(`✅ Match Found:`);
      console.log(`   Category: ${match.category}`);
      console.log(`   Score: ${match.matchScore}`);
      console.log(`   Confidence: ${match.confidence}`);
    } else {
      console.log(`❌ No match found - will fallback to AI`);
    }
  });

  // Show system stats
  console.log('\n\n📊 CHATBOT SYSTEM STATISTICS:');
  console.log('='.repeat(50));
  
  const stats = getChatbotStats();
  console.log(`📚 Total Categories: ${stats.totalCategories}`);
  console.log(`💬 Total Responses: ${stats.totalResponses}`);
  console.log(`🎯 Categories: ${stats.categories.join(', ')}`);
  console.log(`📋 Coverage: ${stats.coverage}`);

  console.log('\n🎪 SMART CHATBOT ARCHITECTURE:');
  console.log('┌─────────────────────────────────────┐');
  console.log('│           USER QUESTION             │');
  console.log('└─────────────┬───────────────────────┘');
  console.log('              │');
  console.log('              ▼');
  console.log('┌─────────────────────────────────────┐');
  console.log('│    1. CHECK CUSTOM DATASET          │');
  console.log('│    - Search keywords                │');
  console.log('│    - Calculate match score          │');
  console.log('│    - Check confidence               │');
  console.log('└─────────────┬───────────────────────┘');
  console.log('              │');
  console.log('              ▼');
  console.log('         Match Found?');
  console.log('              │');
  console.log('        ┌─────┴─────┐');
  console.log('        ▼           ▼');
  console.log('      YES          NO');
  console.log('       │            │');
  console.log('       ▼            ▼');
  console.log('┌─────────────┐ ┌─────────────┐');
  console.log('│   CUSTOM    │ │ FALLBACK AI │');
  console.log('│  RESPONSE   │ │  (LLaMA/    │');
  console.log('│             │ │   OpenAI)   │');
  console.log('└─────────────┘ └─────────────┘');

  console.log('\n🏆 SYSTEM BENEFITS:');
  console.log('✅ Fast responses for common pregnancy questions');
  console.log('✅ Consistent, medically-reviewed answers');
  console.log('✅ Fallback to AI for edge cases');
  console.log('✅ Urgency detection for safety');
  console.log('✅ Confidence scoring for reliability');
  console.log('✅ Easy to expand custom dataset');

  console.log('\n💡 IMPLEMENTATION TIPS:');
  console.log('1. Add OpenAI/LLaMA API keys to callOpenAI/callLLaMA functions');
  console.log('2. Expand PREGNANCY_DATASET with more Q&A pairs');
  console.log('3. Integrate with your existing Chatbot.jsx component');
  console.log('4. Add user feedback to improve match scoring');
  console.log('5. Log questions for dataset expansion');
}

// Run the tests
testChatbot().then(() => {
  console.log('\n🎉 SMART CHATBOT TESTING COMPLETE!');
  console.log('Ready to integrate with your MATRI-CARE app! 🚀');
});

export default { getSmartResponse };