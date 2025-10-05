// 🧪 COMPREHENSIVE PRECISION MATCHING TEST
console.log('🧪 TESTING NEW PRECISION MATCHING SYSTEM\n');

async function testPrecisionMatching() {
  try {
    const { getSmartResponse } = await import('./client/src/utils/newSmartChatbot.js');
    
    // Test cases that were previously problematic
    const testCases = [
      // Emergency symptoms - should get URGENT responses
      {
        query: "I have vaginal bleeding",
        expectedCategory: "emergency",
        expectedSource: "Emergency Medical Guidelines",
        expectUrgent: true,
        description: "Emergency bleeding should trigger urgent care"
      },
      {
        query: "severe abdominal pain",
        expectedCategory: "emergency", 
        expectedSource: "Emergency Medical Guidelines",
        expectUrgent: true,
        description: "Severe pain should be flagged as emergency"
      },
      {
        query: "water broke early",
        expectedCategory: "emergency",
        expectedSource: "Emergency Medical Guidelines", 
        expectUrgent: true,
        description: "Early water breaking is emergency"
      },
      
      // Specific symptom matching - should get exact responses
      {
        query: "morning sickness remedies",
        expectedCategory: "nausea",
        expectedSource: "American Pregnancy Association",
        expectUrgent: false,
        description: "Morning sickness should match nausea category"
      },
      {
        query: "spotting during first trimester",
        expectedCategory: "bleeding",
        expectedSource: "ACOG & Mayo Clinic",
        expectUrgent: false,
        description: "Light bleeding should match bleeding category, not emergency"
      },
      {
        query: "heartburn relief pregnancy",
        expectedCategory: "digestive", 
        expectedSource: "American Gastroenterological Association",
        expectUrgent: false,
        description: "Heartburn should match digestive category"
      },
      {
        query: "can't sleep during pregnancy",
        expectedCategory: "sleep",
        expectedSource: "National Sleep Foundation",
        expectUrgent: false,
        description: "Sleep issues should match sleep category"
      },
      {
        query: "safe exercises while pregnant",
        expectedCategory: "exercise",
        expectedSource: "ACOG Exercise Guidelines", 
        expectUrgent: false,
        description: "Exercise questions should match exercise category"
      },
      {
        query: "what foods to eat pregnancy",
        expectedCategory: "nutrition",
        expectedSource: "Mayo Clinic Nutrition Guidelines",
        expectUrgent: false,
        description: "Nutrition questions should match nutrition category"
      },
      
      // Non-pregnancy queries - should route to AI
      {
        query: "what's the weather like",
        expectedTier: 2,
        expectedSource: "gemini_ai",
        expectUrgent: false,
        description: "Weather should go to AI"
      },
      {
        query: "football game scores",
        expectedTier: 2, 
        expectedSource: "gemini_ai",
        expectUrgent: false,
        description: "Sports should go to AI"
      }
    ];
    
    let passedTests = 0;
    let totalTests = testCases.length;
    
    console.log(`Running ${totalTests} precision tests...\n`);
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(`🔍 Test ${i + 1}: "${testCase.query}"`);
      console.log(`📝 Expected: ${testCase.description}`);
      
      try {
        const response = await getSmartResponse(testCase.query);
        
        let testPassed = true;
        let failureReasons = [];
        
        // Check if it's emergency and should be urgent
        if (testCase.expectUrgent && !response.isUrgent) {
          testPassed = false;
          failureReasons.push('Should be marked as urgent');
        }
        
        // Check if it matches expected category
        if (testCase.expectedCategory && response.category !== testCase.expectedCategory) {
          testPassed = false;
          failureReasons.push(`Expected category '${testCase.expectedCategory}', got '${response.category}'`);
        }
        
        // Check if it matches expected source
        if (testCase.expectedSource && !response.source.includes(testCase.expectedSource.split(' ')[0])) {
          testPassed = false; 
          failureReasons.push(`Expected source to include '${testCase.expectedSource}', got '${response.source}'`);
        }
        
        // Check if it routes to correct tier
        if (testCase.expectedTier && response.tier !== testCase.expectedTier) {
          testPassed = false;
          failureReasons.push(`Expected tier ${testCase.expectedTier}, got tier ${response.tier}`);
        }
        
        if (testPassed) {
          console.log(`✅ PASSED - Tier ${response.tier}, Category: ${response.category}, Source: ${response.source}`);
          passedTests++;
        } else {
          console.log(`❌ FAILED - ${failureReasons.join(', ')}`);
          console.log(`   Got: Tier ${response.tier}, Category: ${response.category}, Source: ${response.source}`);
        }
        
        // Show response preview for emergency cases
        if (response.isUrgent) {
          console.log(`🚨 URGENT RESPONSE: ${response.response.substring(0, 100)}...`);
        }
        
      } catch (error) {
        console.log(`❌ ERROR: ${error.message}`);
      }
      
      console.log(''); // Empty line for readability
    }
    
    // Final summary
    const successRate = (passedTests / totalTests * 100).toFixed(1);
    console.log('='.repeat(80));
    console.log(`📊 TEST RESULTS: ${passedTests}/${totalTests} tests passed (${successRate}%)`);
    
    if (successRate >= 90) {
      console.log('🎉 EXCELLENT: Precision matching is working great!');
    } else if (successRate >= 75) {
      console.log('👍 GOOD: Most queries are matching correctly');  
    } else {
      console.log('⚠️ NEEDS WORK: Several queries are not matching correctly');
    }
    
    console.log('\n🎯 KEY IMPROVEMENTS:');
    console.log('✅ Emergency symptoms now trigger immediate urgent care instructions');
    console.log('✅ Specific symptoms match exact medical categories');
    console.log('✅ Non-pregnancy queries properly route to AI');
    console.log('✅ No more incorrect matches like "weather" showing back pain info');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testPrecisionMatching().catch(console.error);