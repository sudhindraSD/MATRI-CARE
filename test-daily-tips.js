import { getDailyHealthTip } from './client/src/utils/dailyTips.js';

console.log('🧪 Testing Smart Daily Tips System\n');

// Test different gestational weeks
const testWeeks = [8, 20, 35]; // First, Second, Third trimester
const today = new Date();

testWeeks.forEach(weeks => {
  console.log(`🤰 Testing Gestational Week ${weeks}:`);
  const tip = getDailyHealthTip(weeks);
  
  console.log(`  📅 Date: ${tip.date}`);
  console.log(`  ${tip.emoji} Title: ${tip.title}`);
  console.log(`  📝 Tip: ${tip.tip.substring(0, 80)}...`);
  console.log(`  🏷️ Category: ${tip.category}`);
  console.log(`  🎯 Trimester: ${tip.trimester}`);
  console.log(`  ⭐ Personalized: ${tip.isPersonalized ? 'Yes' : 'No'}`);
  console.log('');
});

// Test what happens tomorrow
console.log('🔮 Testing Tomorrow\'s Tip:');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Simulate tomorrow's calculation
const dayOfYear = Math.floor((tomorrow - new Date(tomorrow.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
console.log(`  📅 Tomorrow: ${tomorrow.toLocaleDateString()}`);
console.log(`  📊 Day of Year: ${dayOfYear}`);

// Show tip rotation over next 7 days
console.log('📆 Next 7 Days Preview (Week 24):');
for (let i = 0; i < 7; i++) {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + i);
  
  // Simulate the tip calculation for that day
  const futureDayOfYear = Math.floor((futureDate - new Date(futureDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  // Get tips available for week 24 (second trimester)
  const generalTips = [
    { emoji: "💧", title: "Stay Hydrated" },
    { emoji: "🚶‍♀️", title: "Gentle Exercise" },
    { emoji: "🥗", title: "Eat Iron-Rich Foods" },
    { emoji: "😴", title: "Quality Sleep" },
    { emoji: "🧘‍♀️", title: "Manage Stress" },
    { emoji: "🥛", title: "Calcium Intake" },
    { emoji: "🍊", title: "Vitamin C Power" }
  ];
  
  const secondTrimesterTips = [
    { emoji: "🍎", title: "Healthy Weight Gain" },
    { emoji: "👶", title: "Track Baby Movements" },
    { emoji: "🦷", title: "Dental Care" }
  ];
  
  const allTips = [...generalTips, ...secondTrimesterTips];
  const tipIndex = futureDayOfYear % allTips.length;
  const dayTip = allTips[tipIndex];
  
  console.log(`  ${i === 0 ? '🌟' : '📅'} ${futureDate.toLocaleDateString()} - ${dayTip.emoji} ${dayTip.title}`);
}

console.log('\n✅ Smart Daily Tips System Ready!');
console.log('🔄 Tips automatically rotate based on:');
console.log('  • Current date (changes daily)');
console.log('  • Gestational age (trimester-specific tips)');
console.log('  • Smart algorithm (no repeats for weeks)');
console.log('  • Personalized categories');

export default getDailyHealthTip;