// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected', () => console.log("Database Connected"))
    
//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
// }

// export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.once("connected", () => {
      console.log("MongoDB Connected");
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
