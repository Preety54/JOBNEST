import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // For generating a unique ID for each job

const JobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  jobSrc: { type: String, required: true },
  designation: { type: String, required: true },
  qualification: { type: String, required: true },
  stipend: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  timing: { type: String, required: true },
  description: { type: String, required: true },

  // 🔥 NEW FIELD
  applyBefore: {
    type: Date,
    required: true, // Make sure user provides this when creating a job
  },

  postedDate: {
    type: Date,
    default: Date.now,
  },
  appliedUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ]
});

export const Job = mongoose.model("Job", JobSchema);
