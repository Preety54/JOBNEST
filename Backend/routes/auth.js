import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    body("fullname", "Full name is required").notEmpty(),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone number").notEmpty().isMobilePhone(),
    body("password", "Password must be at least 8 characters").isLength({ min: 8 })
  ],
  registerUser
);

// Login Route
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").notEmpty(),
  ],
  loginUser
);

export default router;
