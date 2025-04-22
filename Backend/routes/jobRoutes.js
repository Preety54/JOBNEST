import express from "express";
import { body } from "express-validator";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Create Job Route
router.post("/create-job", createJob);

// Get All Jobs Route
router.get("/jobs", getAllJobs);

// Get Job by ID Route
router.get("/jobs/:jobId", getJobById);


// Update Job Route
router.put("/update-job/:jobId", updateJob);

// Delete Job Route
router.delete("/delete-job/:jobId", deleteJob);

// Apply for Job Route
router.post("/apply/:jobId", applyForJob);



export default router;
