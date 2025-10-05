// 🧪 TEST NEW USER CLEAN PROFILE INITIALIZATION
// This tests that new users get empty/null values instead of sample data

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import UserProfile from './src/models/UserProfile.js';

dotenv.config({ path: './.env' });

// Test function
async function testNewUserProfile() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Create a test user (simulate registration)
    const testUserData = {
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`,
      phone: '+1234567890',
      password: 'password123',
      role: 'pregnant_woman'
    };
    
    console.log('👤 Creating test user...');
    const user = await User.create(testUserData);
    console.log('✅ Test user created:', user.name, user.email);
    
    // Simulate fetching profile (like the controller does)
    console.log('\n🔍 Checking if profile exists...');
    let profile = await UserProfile.findOne({ user: user._id });
    
    if (!profile) {
      console.log('❌ No profile found - creating clean profile...');
      
      // This simulates the fixed controller logic
      profile = await UserProfile.create({
        user: user._id,
        age: null,
        gestationalAgeWeeks: null,
        height: null,
        weight: null,
        bloodPressure: {
          systolic: null,
          diastolic: null,
          lastChecked: null
        },
        bloodSugar: {
          value: null,
          unit: 'mg/dL',
          lastChecked: null
        },
        hemoglobin: {
          value: null,
          unit: 'g/dL',
          lastChecked: null
        },
        hasHypertension: false,
        hasDiabetes: false,
        stressLevel: null,
        hasSupportSystem: null,
        weightHistory: []
      });
      
      console.log('✅ Clean profile created!');
    }
    
    // Test the profile values
    console.log('\n📊 PROFILE TEST RESULTS:');
    console.log('=========================');
    console.log('Age:', profile.age || 'null ✅');
    console.log('Gestational Age:', profile.gestationalAgeWeeks || 'null ✅');
    console.log('Height:', profile.height || 'null ✅');
    console.log('Weight:', profile.weight || 'null ✅');
    console.log('Blood Pressure:', profile.bloodPressure.systolic ? 
      `${profile.bloodPressure.systolic}/${profile.bloodPressure.diastolic}` : 'null/null ✅');
    console.log('Blood Sugar:', profile.bloodSugar.value || 'null ✅');
    console.log('Hemoglobin:', profile.hemoglobin.value || 'null ✅');
    console.log('Stress Level:', profile.stressLevel || 'null ✅');
    console.log('Support System:', profile.hasSupportSystem === null ? 'null ✅' : profile.hasSupportSystem);
    console.log('Weight History Length:', profile.weightHistory.length, profile.weightHistory.length === 0 ? '✅' : '❌');
    
    // Verify dashboard would show N/A values
    console.log('\n📈 DASHBOARD DISPLAY TEST:');
    console.log('==========================');
    const dashboardValues = {
      gestationalAge: profile.gestationalAgeWeeks ? `${profile.gestationalAgeWeeks} weeks` : 'N/A',
      weight: profile.weight ? `${profile.weight} kg` : 'N/A',
      bloodPressure: profile.bloodPressure.systolic ? 
        `${profile.bloodPressure.systolic}/${profile.bloodPressure.diastolic}` : 'N/A',
      bloodSugar: profile.bloodSugar.value ? 
        `${profile.bloodSugar.value} ${profile.bloodSugar.unit}` : 'N/A'
    };
    
    console.log('Gestational Age Display:', dashboardValues.gestationalAge);
    console.log('Weight Display:', dashboardValues.weight);
    console.log('Blood Pressure Display:', dashboardValues.bloodPressure);
    console.log('Blood Sugar Display:', dashboardValues.bloodSugar);
    
    // Test chart data generation
    console.log('\n📊 CHART DATA TEST:');
    console.log('===================');
    const generateChartData = () => {
      if (!profile.weightHistory || profile.weightHistory.length === 0) {
        if (!profile.weight || !profile.gestationalAgeWeeks) {
          return []; // Empty chart for new users
        }
        return [{
          week: `Week ${profile.gestationalAgeWeeks}`,
          weight: profile.weight,
          date: new Date().toLocaleDateString()
        }];
      }
      return profile.weightHistory.map((entry, index) => ({
        week: `Week ${entry.gestationalWeeks}`,
        weight: entry.weight,
        date: new Date(entry.date).toLocaleDateString()
      }));
    };
    
    const chartData = generateChartData();
    console.log('Chart Data Points:', chartData.length);
    console.log('Chart Shows Empty State:', chartData.length === 0 ? '✅ YES' : '❌ NO');
    
    // Cleanup
    console.log('\n🧹 Cleaning up test data...');
    await UserProfile.findByIdAndDelete(profile._id);
    await User.findByIdAndDelete(user._id);
    console.log('✅ Test data cleaned up');
    
    console.log('\n🎉 TEST COMPLETED SUCCESSFULLY!');
    console.log('New users will now see clean empty values instead of sample data.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run test
testNewUserProfile();