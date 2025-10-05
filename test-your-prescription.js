import { parsePrescription, analyzeHealthRisk } from './client/src/utils/prescriptionAI.js';
import { assignHealthPersona, getPersonaTheme, getPersonalizedGreeting } from './client/src/utils/healthPersonas.js';

console.log('🧪 Testing YOUR Prescription: Azithromycin, Aciloc, Dolo 650\n');

const yourPrescription = "Azithromycin, Aciloc, Dolo 650";

console.log(`📋 Input: "${yourPrescription}"`);
console.log('🤖 Running AI analysis...\n');

try {
  // Step 1: Parse prescription
  const medications = parsePrescription(yourPrescription);
  console.log('✅ MEDICATIONS DETECTED:');
  
  if (medications.length > 0) {
    medications.forEach((med, index) => {
      console.log(`  ${index + 1}. ${med.name}`);
      console.log(`     Condition: ${med.condition}`);
      console.log(`     Category: ${med.category}`);
      console.log(`     Severity: ${med.severity}`);
      console.log(`     Confidence: ${med.confidence}`);
      console.log(`     Persona: ${med.persona}`);
      console.log('');
    });
    
    // Step 2: Risk Analysis
    const riskAnalysis = analyzeHealthRisk(medications);
    console.log(`📊 RISK ANALYSIS:`);
    console.log(`   Risk Level: ${riskAnalysis.riskLevel}`);
    console.log(`   Risk Score: ${riskAnalysis.riskScore}%`);
    console.log(`   Risk Factors: ${riskAnalysis.riskFactors.join(', ')}`);
    console.log('');
    
    // Step 3: Persona Assignment
    const persona = assignHealthPersona(medications, 24);
    const theme = getPersonaTheme(persona);
    const greeting = getPersonalizedGreeting(persona, "Mom");
    
    console.log(`🎭 HEALTH PERSONA ASSIGNED:`);
    console.log(`   Persona: ${theme.name} ${theme.emoji}`);
    console.log(`   Description: ${theme.description}`);
    console.log(`   Greeting: ${greeting}`);
    console.log(`   Theme Color: ${theme.primary}`);
    console.log('');
    
    console.log('🎉 SUCCESS! Your prescription is now properly recognized!');
    
  } else {
    console.log('❌ No medications detected - there might be an issue');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
}

// Test individual medications
console.log('\n🔍 TESTING INDIVIDUAL MEDICATIONS:');

const individualTests = [
  "Azithromycin 500mg",
  "Aciloc 150mg", 
  "Dolo 650mg"
];

individualTests.forEach((med, index) => {
  console.log(`\nTest ${index + 1}: "${med}"`);
  const result = parsePrescription(med);
  if (result.length > 0) {
    console.log(`✅ Detected: ${result[0].name} (${result[0].confidence})`);
  } else {
    console.log('❌ Not detected');
  }
});

export default { parsePrescription };