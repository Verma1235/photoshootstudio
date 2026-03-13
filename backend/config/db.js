import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Mongodb atlas connected`);
    } catch (error) {
        console.log(`MONGODB connection Error:`, error);
        process.exit(1);
    }
};

export default connectDB;