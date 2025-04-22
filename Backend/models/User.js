import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // ✅ Generate unique ID

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true, // Prevent duplicate user IDs
    default: uuidv4, // Automatically generate unique ID
  },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true }
});

export const User = mongoose.model("User", UserSchema);
