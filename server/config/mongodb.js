import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB", mongoose.connection.name);
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
