import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO);

    console.log("Connected to MongoDB");

    return connection;
  } catch (error) {
    console.error("Connection error:", error.message);
    throw new Error("Connection error");
  }
};

export default connectDB;
