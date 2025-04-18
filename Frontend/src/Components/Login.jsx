import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.jpg"; // Background image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      // Save token in localStorage
      localStorage.setItem("authToken", data.token);

      // Redirect to homepage/dashboard after successful login
      if (email === "abhishek@gmail.com") {
        navigate("/adminhome");
      } else {
        navigate("/");
      }
      
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* Login Container */}
      <div className="bg-black p-6 sm:p-8 rounded-lg w-full max-w-md sm:max-w-lg h-auto min-h-[400px] flex flex-col items-center shadow-lg">
        {/* Heading */}
        <h2 className="text-white text-3xl font-bold mb-10">Login</h2>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Login Form */}
        <form className="w-full flex flex-col items-center" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full h-12 p-3 mb-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full h-12 p-3 mb-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Centered Login Button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all w-2/3 sm:w-1/2 text-lg font-semibold"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-sm text-white mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 font-semibold cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>

        {/* Admin Login Link */}
        <p className="text-sm text-white mt-2">
          Are you an admin?{" "}
          <span
            onClick={() => navigate("/admin-login")}
            className="text-blue-400 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
