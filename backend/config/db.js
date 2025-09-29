import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.js";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
}

export default connectToMongoDB;