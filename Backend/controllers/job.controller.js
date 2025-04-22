import { Job } from "../models/Job.js";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";

// Create Job
// Create Job
export const createJob = async (req, res) => {
  try {
    const {
      jobSrc,
      designation,
      qualification,
      stipend,
      category, // ✅ INCLUDE THIS
      location,
      timing,
      description,
      applyBefore,
    } = req.body;

    // Check for required fields
    if (
      !jobSrc ||
      !designation ||
      !qualification ||
      !stipend ||
      !category || // ✅ Validate category
      !location ||
      !timing ||
      !description ||
      !applyBefore
    ) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const applyBeforeDate = new Date(applyBefore);
    if (isNaN(applyBeforeDate)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format for applyBefore" });
    }

    const newJob = new Job({
      jobSrc,
      designation,
      qualification,
      stipend,
      category, // ✅ Add to Job model instance
      location,
      timing,
      description,
      applyBefore: applyBeforeDate,
    });

    await newJob.save();

    res.status(201).json({ success: true, message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("❌ createJob error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
  

// Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find(); // Ensure you're fetching all job fields
      console.log("Fetched Jobs: ", jobs); // Log the jobs to check if appliedUsers is present
      res.status(200).json({ jobs });
    } catch (error) {
      console.error("Error fetching jobs: ", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

export const getJobById = async (req, res) => {
    const { jobId } = req.params;
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      res.status(200).json({ success: true, job });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

// Update Job
export const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const {
    jobSrc,
    designation,
    qualification,
    stipend,
    location,
    timing,
    description,
    applyBefore,
  } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        jobSrc,
        designation,
        qualification,
        stipend,
        location,
        timing,
        description,
        applyBefore: new Date(applyBefore),
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(jobId); // ✅ Corrected

    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Apply for Job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId } = req.body;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user already applied
    if (job.appliedUsers.includes(userId)) {
      return res.status(400).json({ message: "User already applied for this job" });
    }

    // Update job with the user ID
    job.appliedUsers.push(userId);
    await job.save();

    // Update user profile with the job ID
    const profile = await Profile.findOne({ userId });
    if (profile) {
      // Add job to user's applied jobs if not already there
      if (!profile.appliedJobs.includes(jobId)) {
        profile.appliedJobs.push(jobId);
        await profile.save();
      }
    }

    res.status(200).json({ message: "Applied successfully", job });
  } catch (error) {
    console.error("Apply error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  
