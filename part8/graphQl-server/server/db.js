import mongoose from "mongoose";

export const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(`Failed to connect to database, why?: ${error.message}`);
    process.exit(1);
  }
};
