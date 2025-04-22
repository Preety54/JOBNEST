import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    location:"",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear previous errors
  };

  // Validate input fields
  const validateForm = () => {
    let newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.fullname)) {
      newErrors.fullname = "Full name should not contain numbers!";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents page reload
    setSuccess("");
    setErrors({});       // Clear previous errors
  
    if (!validateForm()) return; // Check validation before making API call
  
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", formData);
  
      if (response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);  // Redirect to login after success
      } else {
        setErrors({ general: "Registration failed. Please try again!" });
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Something went wrong!" });
    }
  };
  

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="bg-black p-8 sm:p-6 rounded-xl w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center shadow-lg">
        <h2 className="text-blue-400 text-2xl sm:text-3xl font-bold mb-4">Register</h2>

        {errors.general && <p className="text-red-500 mb-3">{errors.general}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <form className="w-full flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
          </div>

          <div className="w-full">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full">
            <input
              type="number"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="w-full">
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="w-full">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Centered Register Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all w-2/3 sm:w-1/2 text-lg font-semibold"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-white mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 font-semibold underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
