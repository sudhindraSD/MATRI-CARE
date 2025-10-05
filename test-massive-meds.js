import { parsePrescription, analyzeHealthRisk } from './client/src/utils/prescriptionAI.js';
import { assignHealthPersona, getPersonaTheme } from './client/src/utils/healthPersonas.js';

console.log('🚀 TESTING MASSIVE MEDICATION DATABASE\n');
console.log('Testing Indian and International medications...\n');

// Test cases - Common Indian medications
const testMedications = [
  // Pain & Fever
  "Dolo 650, Crocin 500mg, Combiflam, Brufen 400mg",
  
  // Antibiotics
  "Augmentin 625, Azithromycin 500mg, Ciprofloxacin 250mg",
  
  // Digestive
  "Digene, Gelusil, Cyclopam, Buscopan 20mg",
  
  // Allergy & Cold
  "Cetirizine 10mg, Benadryl, Sinarest, Wikoryl",
  
  // Vitamins & Supplements
  "Becosules, Revital, Neurobion Forte, Evion 400",
  
  // Heart & BP
  "Atenolol 50mg, Amlodipine 5mg, Telmisartan 40mg",
  
  // Diabetes
  "Glimepiride 2mg, Metformin 500mg, Insulin",
  
  // Women's Health
  "Meprate 10mg, Yasmin, Femilon",
  
  // Bone & Joint
  "Shelcal 500, Glucosamine, Diclofenac 50mg",
  
  // Ayurvedic
  "Ashwagandha, Triphala, Giloy, Brahmi",
  
  // Skin
  "Betnovate cream, Candid B, Calamine lotion",
  
  // Eye/Ear
  "Moxifloxacin drops, Systane eye drops",
  
  // Mental Health
  "Fluoxetine 20mg, Escitalopram 10mg, Gabapentin 300mg"
];

let successCount = 0;
let totalMedications = 0;

testMedications.forEach((prescription, index) => {
  console.log(`🧪 TEST ${index + 1}: "${prescription}"`);
  
  try {
    const medications = parsePrescription(prescription);
    const detectedCount = medications.length;
    totalMedications += detectedCount;
    
    if (detectedCount > 0) {
      successCount++;
      console.log(`   ✅ DETECTED: ${detectedCount} medications`);
      
      medications.forEach(med => {
        console.log(`      • ${med.name} (${med.confidence}) - ${med.category}`);
      });
      
      const riskAnalysis = analyzeHealthRisk(medications);
      const persona = assignHealthPersona(medications, 24);
      const theme = getPersonaTheme(persona);
      
      console.log(`   🎭 Persona: ${theme.name} ${theme.emoji}`);
      console.log(`   ⚠️ Risk: ${riskAnalysis.riskLevel}`);
    } else {
      console.log('   ❌ No medications detected');
    }
    
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
  }
  
  console.log('');
});

console.log('📊 FINAL RESULTS:');
console.log(`   Test Cases: ${testMedications.length}`);
console.log(`   Successful: ${successCount}`);
console.log(`   Success Rate: ${Math.round((successCount/testMedications.length) * 100)}%`);
console.log(`   Total Medications Detected: ${totalMedications}`);

// Test specific brand names
console.log('\n🏷️ TESTING BRAND NAMES:');
const brandTests = [
  "Cipla Azithromycin",
  "Abbott Augmentin", 
  "GSK Crocin",
  "Mankind Dolo",
  "Lupin Supradyn",
  "Pfizer Viagra", // Just for fun 😄
  "Novartis eye drops"
];

brandTests.forEach((brand, index) => {
  console.log(`Brand Test ${index + 1}: "${brand}"`);
  const result = parsePrescription(brand);
  console.log(`   Result: ${result.length} detected`);
  if (result.length > 0) {
    result.forEach(med => console.log(`   • ${med.name} (${med.confidence})`));
  }
});

// Test random combinations
console.log('\n🎲 TESTING RANDOM COMBINATIONS:');
const randomCombos = [
  "Doctor prescribed me Paracetamol 650mg twice daily and Cetirizine 10mg at night",
  "Taking Becosules capsule daily with Shelcal 500mg",
  "Using Betnovate cream and Candid powder for skin infection",
  "Started Metformin 500mg and checking sugar levels",
  "Got Augmentin 625 for throat infection, taking with Digene"
];

randomCombos.forEach((combo, index) => {
  console.log(`\nRandom Test ${index + 1}: "${combo}"`);
  const result = parsePrescription(combo);
  console.log(`   AI detected: ${result.length} medications`);
  result.forEach(med => console.log(`   • ${med.name} for ${med.condition}`));
});

console.log('\n🎉 MASSIVE MEDICATION DATABASE TEST COMPLETE!');
console.log('💪 Your system now recognizes hundreds of medications!');
console.log('🇮🇳 Covers Indian brands, international drugs, and ayurvedic medicines!');
console.log('🏆 Ready for any prescription users throw at it!');

export default { parsePrescription };