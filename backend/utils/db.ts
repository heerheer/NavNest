import mongoose from 'mongoose';


const MONGODB_URI = Bun.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🍃 Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}