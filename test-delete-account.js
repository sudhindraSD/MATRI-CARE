// 🗑️ TEST DELETE ACCOUNT FUNCTIONALITY
// This tests the complete account deletion with all associated data cleanup

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import UserProfile from './src/models/UserProfile.js';
import CalendarEvent from './src/models/CalendarEvent.js';
import ChatMessage from './src/models/ChatMessage.js';

dotenv.config({ path: './.env' });

async function testDeleteAccount() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // 1. Create a test user with all associated data
    console.log('👤 Creating test user...');
    const user = await User.create({
      name: 'Delete Test User',
      email: `deletetest${Date.now()}@example.com`,
      phone: '+1234567890',
      password: 'password123',
      role: 'pregnant_woman'
    });
    console.log('✅ User created:', user._id);
    
    // 2. Create user profile
    console.log('📋 Creating user profile...');
    const profile = await UserProfile.create({
      user: user._id,
      age: 28,
      gestationalAgeWeeks: 24,
      weight: 65,
      height: 165
    });
    console.log('✅ Profile created:', profile._id);
    
    // 3. Create calendar events
    console.log('📅 Creating calendar events...');
    const events = await CalendarEvent.insertMany([
      {
        user: user._id,
        createdBy: user._id,
        title: 'Test Appointment 1',
        description: 'Test event 1',
        eventType: 'checkup',
        startDate: new Date(),
        endDate: new Date()
      },
      {
        user: user._id,
        createdBy: user._id,
        title: 'Test Appointment 2', 
        description: 'Test event 2',
        eventType: 'medication',
        startDate: new Date(),
        endDate: new Date()
      }
    ]);
    console.log(`✅ ${events.length} calendar events created`);
    
    // 4. Create chat messages
    console.log('💬 Creating chat messages...');
    const messages = await ChatMessage.insertMany([
      {
        user: user._id,
        message: 'Test question 1',
        response: 'Test response 1',
        intent: 'health',
        confidence: 0.95
      },
      {
        user: user._id,
        message: 'Test question 2',
        response: 'Test response 2', 
        intent: 'nutrition',
        confidence: 0.92
      }
    ]);
    console.log(`✅ ${messages.length} chat messages created`);
    
    // 5. Verify all data exists
    console.log('\n🔍 Verifying created data...');
    const userCount = await User.countDocuments({ _id: user._id });
    const profileCount = await UserProfile.countDocuments({ user: user._id });
    const eventCount = await CalendarEvent.countDocuments({ user: user._id });
    const messageCount = await ChatMessage.countDocuments({ user: user._id });
    
    console.log(`User records: ${userCount} ✅`);
    console.log(`Profile records: ${profileCount} ✅`);
    console.log(`Calendar events: ${eventCount} ✅`);
    console.log(`Chat messages: ${messageCount} ✅`);
    
    // 6. SIMULATE THE DELETE ACCOUNT PROCESS
    console.log('\n🗑️ STARTING ACCOUNT DELETION PROCESS...');
    console.log('===========================================');
    
    const userId = user._id;
    console.log(`🗑️ Deleting all data for user ID: ${userId}`);
    
    // Delete all associated data first (same as controller)
    console.log('🔄 Deleting user profile...');
    const deletedProfiles = await UserProfile.deleteMany({ user: userId });
    console.log(`✅ Deleted ${deletedProfiles.deletedCount} profile(s)`);
    
    console.log('🔄 Deleting calendar events...');
    const deletedEvents = await CalendarEvent.deleteMany({ user: userId });
    console.log(`✅ Deleted ${deletedEvents.deletedCount} calendar event(s)`);
    
    console.log('🔄 Deleting chat messages...');
    const deletedMessages = await ChatMessage.deleteMany({ user: userId });
    console.log(`✅ Deleted ${deletedMessages.deletedCount} chat message(s)`);
    
    // Delete the main user account
    console.log('🔄 Deleting user account...');
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log('✅ User account deleted:', deletedUser ? 'SUCCESS' : 'FAILED');
    
    // 7. Verify complete deletion
    console.log('\n✅ VERIFYING COMPLETE DELETION...');
    console.log('==================================');
    
    const remainingUser = await User.countDocuments({ _id: userId });
    const remainingProfile = await UserProfile.countDocuments({ user: userId });
    const remainingEvents = await CalendarEvent.countDocuments({ user: userId });
    const remainingMessages = await ChatMessage.countDocuments({ user: userId });
    
    console.log(`User records remaining: ${remainingUser} ${remainingUser === 0 ? '✅' : '❌'}`);
    console.log(`Profile records remaining: ${remainingProfile} ${remainingProfile === 0 ? '✅' : '❌'}`);
    console.log(`Calendar events remaining: ${remainingEvents} ${remainingEvents === 0 ? '✅' : '❌'}`);
    console.log(`Chat messages remaining: ${remainingMessages} ${remainingMessages === 0 ? '✅' : '❌'}`);
    
    const totalRemaining = remainingUser + remainingProfile + remainingEvents + remainingMessages;
    
    if (totalRemaining === 0) {
      console.log('\n🎉 ACCOUNT DELETION TEST PASSED!');
      console.log('All user data has been completely removed from MongoDB.');
    } else {
      console.log('\n❌ ACCOUNT DELETION TEST FAILED!');
      console.log(`${totalRemaining} records still remain in database.`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run test
console.log('🧪 TESTING COMPLETE ACCOUNT DELETION FUNCTIONALITY\n');
testDeleteAccount();