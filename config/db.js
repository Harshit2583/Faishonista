import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB connection string is not defined in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to MongoDB Database: ${conn.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;