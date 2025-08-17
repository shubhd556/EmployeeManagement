import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected || mongoose.connection.readyState === 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 60000,

            ssl: true, // Only if using Atlas
        });
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectToDatabase;
