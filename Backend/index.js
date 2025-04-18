import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import jobRoutes from "./routes/jobRoutes.js";
import fetchuser from "./middleware/fetchuser.js"; // Import authentication middleware

// Importing Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js"; // Example protected routes
import profileRoutes from "./routes/profileRoutes.js"

// Connect to Database
connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Allowed Origins for CORS
const allowedOrigins = ["http://localhost:5173"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed for this origin"));
//       }
//     },
//     methods: "GET, POST, PUT, DELETE, OPTIONS",
//     allowedHeaders: ["Content-Type", "Authorization", "auth-token"], // Include "auth-token"
//   })
// );

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, auth-token"); // Include "auth-token"

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// import cors from "cors";

// const app = express();

app.use(cors({
  origin: "http://localhost:5173", // React app origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "authtoken"], // must match exactly!
  credentials: true
}));




// **Middleware**
app.use(express.json()); // Parse JSON data

// **Public Routes (No Authentication Needed)**
app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/profile", profileRoutes)

// **Apply Authentication to All Other Routes**
app.use(fetchuser);

// **Protected Routes (Only Accessible with Authentication)**
app.use("/api/user", userRoutes); // Example protected route


// **Root Route**
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// **Start Server**
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
