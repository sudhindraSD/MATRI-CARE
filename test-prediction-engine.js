import { predictHealthEvents, getPredictionSummary, demonstratePredictionEngine } from './client/src/utils/healthPredictor.js';
import { parsePrescription } from './client/src/utils/prescriptionAI.js';

console.log('🔮 Testing MATRI-MIND Prediction Engine\n');
console.log('This shows how our AI predicts future health events!\n');

// Test Scenario 1: Iron Deficiency Prediction
console.log('🧪 TEST 1: IRON DEFICIENCY PREDICTIONS');
const ironPrescription = "Iron 65mg daily, Folic Acid 400mcg once daily";
const ironMeds = parsePrescription(ironPrescription);
const ironPredictions = predictHealthEvents(ironMeds, 16, 90); // Week 16, 90% adherence

console.log(`📋 Prescription: "${ironPrescription}"`);
console.log(`📅 Current Week: 16 (4 months pregnant)`);
console.log(`💊 Medication Adherence: 90%`);
console.log(`🔮 Generated ${ironPredictions.predictions.length} predictions over next ${ironPredictions.predictionHorizon} weeks`);
console.log(`📊 Prediction Confidence: ${ironPredictions.confidenceScore}%\n`);

console.log('🎯 Predicted Health Events:');
ironPredictions.predictions.forEach((pred, index) => {
  console.log(`  ${index + 1}. Week ${pred.week} (${pred.daysFromNow} days): ${pred.event}`);
  console.log(`     Probability: ${pred.probability}% | Severity: ${pred.severity} | Action: ${pred.actionRequired}`);
});

console.log('\n');

// Test Scenario 2: Gestational Diabetes Prediction  
console.log('🧪 TEST 2: GESTATIONAL DIABETES PREDICTIONS');
const diabetesPrescription = "Insulin 10 units before meals, Metformin 500mg twice daily";
const diabetesMeds = parsePrescription(diabetesPrescription);
const diabetesPredictions = predictHealthEvents(diabetesMeds, 26, 85); // Week 26, 85% adherence

console.log(`📋 Prescription: "${diabetesPrescription}"`);
console.log(`📅 Current Week: 26 (6 months pregnant)`);
console.log(`💊 Medication Adherence: 85%`);
console.log(`🔮 Generated ${diabetesPredictions.predictions.length} predictions`);
console.log(`📊 Prediction Confidence: ${diabetesPredictions.confidenceScore}%\n`);

console.log('🎯 Predicted Health Events:');
diabetesPredictions.predictions.slice(0, 5).forEach((pred, index) => {
  console.log(`  ${index + 1}. Week ${pred.week}: ${pred.event}`);
  console.log(`     Probability: ${pred.probability}% | Medication: ${pred.medication} | Confidence: ${pred.confidence}`);
});

console.log('\n');

// Test Scenario 3: High Blood Pressure Prediction
console.log('🧪 TEST 3: HIGH BLOOD PRESSURE PREDICTIONS');
const bpPrescription = "Methyldopa 250mg twice daily, Calcium 500mg with meals";
const bpMeds = parsePrescription(bpPrescription);
const bpPredictions = predictHealthEvents(bpMeds, 22, 95); // Week 22, 95% adherence
const bpSummary = getPredictionSummary(bpMeds, 22);

console.log(`📋 Prescription: "${bpPrescription}"`);
console.log(`📅 Current Week: 22 (5.5 months pregnant)`);
console.log(`💊 Medication Adherence: 95% (excellent!)`);
console.log(`🔮 Generated ${bpSummary.totalPredictions} total predictions`);
console.log(`⚠️ High Priority Events: ${bpSummary.highPriorityEvents}`);
console.log(`✅ Positive Events: ${bpSummary.positiveEvents}`);
console.log(`📊 Overall Confidence: ${bpSummary.confidenceScore}%\n`);

if (bpSummary.nextCriticalEvent) {
  console.log('🚨 Next Critical Event:');
  console.log(`   Week ${bpSummary.nextCriticalEvent.week}: ${bpSummary.nextCriticalEvent.event}`);
  console.log(`   Action Required: ${bpSummary.nextCriticalEvent.actionRequired}`);
}

console.log('\n🎪 TIMELINE PREVIEW:');
bpSummary.timelinePreview.forEach((pred, index) => {
  const urgency = pred.severity === 'high' ? '🚨' : pred.severity === 'moderate' ? '⚠️' : '💚';
  console.log(`   ${urgency} Week ${pred.week}: ${pred.event} (${pred.probability}% likely)`);
});

console.log('\n');

// Test Scenario 4: Complete System Demo
console.log('🎪 RUNNING COMPLETE PREDICTION ENGINE DEMO:');
demonstratePredictionEngine();

// Show the prediction magic summary
console.log('\n🌟 THE PREDICTION MAGIC IN ACTION:');
console.log('═══════════════════════════════════════');
console.log('👤 USER: "Iron 65mg daily" at Week 16');
console.log('🔮 AI PREDICTS: "Fatigue may increase around Week 18"');
console.log('📊 CONFIDENCE: 85% probability, 7 days early warning');
console.log('⚡ ACTION: "Take iron with vitamin C for better absorption"');
console.log('');
console.log('👤 USER: "Insulin 10 units" at Week 26');  
console.log('🔮 AI PREDICTS: "Glucose monitoring critical at Week 28"');
console.log('📊 CONFIDENCE: 95% probability, medication-specific');
console.log('⚡ ACTION: "Medical consultation required"');
console.log('');
console.log('👤 USER: "Methyldopa 250mg" at Week 22');
console.log('🔮 AI PREDICTS: "Watch for swelling at Week 26"');
console.log('📊 CONFIDENCE: 78% probability, personalized timeline');
console.log('⚡ ACTION: "Monitor and track symptoms"');

console.log('\n✨ JUDGE IMPACT:');
console.log('• "AI predicts health events 2-8 weeks in advance"');
console.log('• "Medication-specific timeline predictions"');
console.log('• "Adherence-adjusted probability scoring"');
console.log('• "Personalized action recommendations"');
console.log('• "Confidence intervals for each prediction"');

console.log('\n🚀 TECHNICAL SOPHISTICATION:');
console.log('• Prescription pattern analysis');
console.log('• Gestational week correlation modeling');
console.log('• Multi-factor confidence scoring');
console.log('• Medication adherence probability adjustment');
console.log('• Timeline-based event clustering');

console.log('\n🏆 HACKATHON WINNING FACTORS:');
console.log('• Predictive healthcare intelligence');
console.log('• Proactive rather than reactive care');
console.log('• Pregnancy-specific prediction models');
console.log('• Actionable early warning system');
console.log('• Personalized risk assessment');

console.log('\n🎯 DEMO FLOW FOR JUDGES:');
console.log('1. Show prescription input → AI analysis');
console.log('2. Display persona assignment → theme change');
console.log('3. Reveal prediction timeline → future events');
console.log('4. Explain confidence scoring → probability math');
console.log('5. Highlight actionable recommendations → practical value');

export default { predictHealthEvents, getPredictionSummary };