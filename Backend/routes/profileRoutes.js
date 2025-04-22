import express from "express"
import {
  createProfile,
  getProfileByUserId,
  getAllProfiles,
  updateProfile,
  deleteProfile,
  addEducation,
  updateEducation,
  deleteEducation,
  addProject,
  updateProject,
  deleteProject,
  addExperience,
  updateExperience,
  deleteExperience,
  addCertification,
  updateCertification,
  deleteCertification,
  addSkill,
  deleteSkill,
  addHobby,
  deleteHobby,
  updateProfileImage,
  getProfileByUserIds
} from "../controllers/profile.controller.js"

// Import middleware if you have authentication
// import { authenticate } from "../middleware/auth.js";

const router = express.Router()

// Base profile routes
router.post("/create", createProfile)
router.get("/user/:userId", getProfileByUserId);
router.get("/all", getAllProfiles)
router.put("/update/:userId", updateProfile)
router.delete("/delete/:userId", deleteProfile)

// Education routes
router.post("/education/add/:userId", addEducation)
router.put("/education/update/:userId/:eduId", updateEducation)
router.delete("/education/delete/:userId/:eduId", deleteEducation)

// Project routes
router.post("/project/add/:userId", addProject)
router.put("/project/update/:userId/:projectId", updateProject)
router.delete("/project/delete/:userId/:projectId", deleteProject)

// Experience routes
router.post("/experience/add/:userId", addExperience)
router.put("/experience/update/:userId/:expId", updateExperience)
router.delete("/experience/delete/:userId/:expId", deleteExperience)

// Certification routes
router.post("/certification/add/:userId", addCertification)
router.put("/certification/update/:userId/:certId", updateCertification)
router.delete("/certification/delete/:userId/:certId", deleteCertification)

// Skills routes
router.post("/skill/add/:userId", addSkill)
router.delete("/skill/delete/:userId/:skill", deleteSkill)

// Hobbies routes
router.post("/hobby/add/:userId", addHobby)
router.delete("/hobby/delete/:userId/:hobby", deleteHobby)

// Profile image route
router.put("/image/update/:userId", updateProfileImage)

// Get profile by user ID
router.get("/:id", getProfileByUserIds)

export default router
