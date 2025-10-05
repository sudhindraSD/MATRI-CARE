import { getSmartResponse, findBestMatch } from './client/src/utils/smartChatbot.js';

console.log('🩸 TESTING IRON DEFICIENCY FIX\n');

async function testIronDeficiency() {
  const ironQuestions = [
    "I am feeling iron deficient",
    "I feel iron deficient", 
    "I think I have iron deficiency",
    "What are iron rich foods?",
    "How to treat iron deficiency during pregnancy?",
    "I'm tired and weak, could it be anemia?"
  ];

  console.log('🧪 TESTING IRON DEFICIENCY QUESTIONS:');
  console.log('='.repeat(50));

  for (let i = 0; i < ironQuestions.length; i++) {
    const question = ironQuestions[i];
    console.log(`\n🧪 Test ${i + 1}: "${question}"`);
    
    try {
      // Test match first
      const match = findBestMatch(question);
      if (match) {
        console.log(`🎯 Match Found: Category ${match.category}, Score ${match.matchScore}`);
      } else {
        console.log('❌ No match found');
      }
      
      // Test full response
      const response = await getSmartResponse(question);
      console.log(`📊 Source: ${response.source}`);
      console.log(`🎯 Confidence: ${response.confidence}`);
      console.log(`📁 Category: ${response.category}`);
      
      if (response.matchScore) {
        console.log(`⚡ Match Score: ${response.matchScore}`);
      }
      
      console.log(`💬 Response Preview: ${response.response.substring(0, 120)}...`);
      
      // Check if it's from custom dataset
      if (response.source === 'custom_dataset') {
        console.log('✅ SUCCESS: Found in custom dataset!');
      } else {
        console.log('❌ FAILED: Still using AI fallback');
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
    }
  }

  console.log('\n📊 SUMMARY:');
  console.log('The user question "I am feeling iron deficient" should now:');
  console.log('✅ Match keywords: iron, deficient, feel');
  console.log('✅ Get categorized as symptoms');
  console.log('✅ Return detailed iron deficiency information');
  console.log('✅ Show 94% confidence from custom dataset');
  console.log('✅ No more simulated OpenAI responses!');
}

testIronDeficiency().then(() => {
  console.log('\n🎉 IRON DEFICIENCY FIX TEST COMPLETE!');
  console.log('🔄 Now refresh your app and try "I am feeling iron deficient"');
});

export default { getSmartResponse };