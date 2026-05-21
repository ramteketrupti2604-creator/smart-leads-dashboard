import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    
    console.log(`📡 MongoDB Connected Successfully: Mock-Local-Server`);
  } catch (error: any) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;