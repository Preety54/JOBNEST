// import { validationResult } from "express-validator";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";
// import { v4 as uuidv4 } from "uuid";

// const JWT_SECRET = "*ITSanAdvancedCRM$";

// // Register User
// export const registerUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   try {
//     const { fullname, email, phone,location, password } = req.body;

//     // Check if the user already exists
//     let existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered" });
//     }

//     // Generate unique userId
//     const userId = uuidv4(); 

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({ userId, fullname, email, phone,location, password: hashedPassword });
//     await newUser.save();

//     // Generate JWT Token
//     const payload = { user: { id: newUser.id } };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

//     res.status(201).json({ success: true, token, message: "User registered successfully" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Login User
// export const loginUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//         email: user.email
//       }
//     };

//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

//     res.json({ success: true, token, message: "Login successful" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = "*ITSanAdvancedCRM$";

// Register User
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { fullname, email, phone,location, password } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Generate unique userId
    const userId = uuidv4(); 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ userId, fullname, email, phone,location, password: hashedPassword });
    await newUser.save();

    // Generate JWT Token
    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ success: true, token, message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email
      }
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
