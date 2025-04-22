import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Ensure this is properly imported

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  console.log("Token from LocalStorage:", token); // Log token from localStorage

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded); // Log decoded token content
    return decoded.user?.id || decoded.id; // Adjust based on your token structure
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const ADMIN_ID = "67fa894488d2565e980da503"; // Admin ID

const AdminRoute = ({ children }) => {
  const userId = getUserIdFromToken();
  console.log("User ID from Token:", userId); // Log user ID from token
  console.log("Admin ID:", ADMIN_ID); // Log admin ID to compare

  if (userId === ADMIN_ID) {
    console.log("Access granted to admin route");
    return children; // Allow access to admin route if userId matches
  } else {
    console.log("Access denied! Redirecting to home...");
    return <Navigate to="/" replace />; // Redirect to home page if not admin
  }
};

export default AdminRoute;
