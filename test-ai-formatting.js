// Test AI response formatting
console.log('🎨 TESTING AI RESPONSE FORMATTING\n');

async function testFormattedResponses() {
  try {
    const { getSmartResponse } = await import('./client/src/utils/newSmartChatbot.js');
    
    const testQuestions = [
      "Hello, how are you?", // Greeting - should be AI
      "What's the weather like?", // Weather - should be AI
      "Can I exercise while pregnant?", // Might be AI if no exact match
      "I'm feeling tired and need help", // Generic - should be AI
    ];
    
    console.log('🧪 Testing AI response formatting...\n');
    
    for (let i = 0; i < testQuestions.length; i++) {
      const question = testQuestions[i];
      console.log(`📝 Question ${i + 1}: "${question}"`);
      
      try {
        const response = await getSmartResponse(question);
        
        console.log(`🎯 Source: ${response.source} (Tier ${response.tier})`);
        console.log('📋 Formatted Response:');
        console.log('─'.repeat(60));
        console.log(response.response);
        console.log('─'.repeat(60));
        
        // Check formatting quality
        const hasEmoji = /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(response.response);
        const hasBold = response.response.includes('**');
        const hasBullets = response.response.includes('•');
        const hasStructure = response.response.split('\n').length > 3;
        
        console.log('🔍 Formatting Check:');
        console.log(`  ${hasEmoji ? '✅' : '❌'} Has emojis`);
        console.log(`  ${hasBold ? '✅' : '❌'} Has bold text`);
        console.log(`  ${hasBullets ? '✅' : '❌'} Has bullet points`);
        console.log(`  ${hasStructure ? '✅' : '❌'} Has good structure`);
        
        const score = [hasEmoji, hasBold, hasBullets, hasStructure].filter(Boolean).length;
        console.log(`📊 Formatting Score: ${score}/4 ${score >= 3 ? '🎉' : score >= 2 ? '👍' : '😐'}`);
        
      } catch (error) {
        console.log(`❌ Error: ${error.message}`);
      }
      
      console.log('\n' + '='.repeat(80) + '\n');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFormattedResponses()
  .then(() => {
    console.log('🎉 AI formatting test completed!');
    console.log('\n💡 If formatting scores are low, the AI might need a few more examples.');
    console.log('The formatting instructions have been updated in the prompts.');
  })
  .catch(console.error);