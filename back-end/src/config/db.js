import mongoose from "mongoose";
import { mongoUri } from "./env.js";
export default async function connectDb() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Failed to connect mongodb" + error.message);
  }
}
