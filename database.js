import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Test logs (you can remove these after confirming it works)
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Port:', process.env.PORT);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;