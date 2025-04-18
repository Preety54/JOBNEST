import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/register.webp";
import img2 from "../assets/apply.png";
import img3 from "../assets/resume.png";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <p className="text-blue-600 text-xl sm:text-2xl font-semibold text-center">Working Process</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 mt-5">How it Works</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Card 1 - Navigate on Click */}
        <div 
          className="bg-blue-700 text-white p-6 rounded-lg flex flex-col items-center shadow-lg min-h-[280px] cursor-pointer" 
          onClick={() => navigate("/register")}
        >
          <img src={img1} alt="Step 1" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-center">Register Your Account</h3>
          <p className="text-sm text-center">
            Join JobNest today and take the first step towards your dream career! 
            Create your profile on JOBNEST.
          </p>
        </div>

        {/* Card 2 - Navigate to Apply Page */}
        <div 
          className="bg-pink-500 text-white p-6 rounded-lg flex flex-col items-center shadow-lg min-h-[280px] cursor-pointer"
          onClick={() => navigate("/apply")}
        >
          <img src={img2} alt="Step 2" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-center">Apply Your Dream Job</h3>
          <p className="text-sm text-center">
            Join JobNest today and apply for your dream job! 
            Connect with top recruiters and land the perfect opportunity. 🚀
          </p>
        </div>

        <div 
          className="bg-green-600 text-white p-6 rounded-lg flex flex-col items-center shadow-lg min-h-[280px] cursor-pointer"
          onClick={() => navigate("/template")}
        >
          <img src={img3} alt="Step 3" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-center">Upload Your Resume</h3>
          <p className="text-sm text-center">
            Create a professional resume with JobNest! Use diverse templates, 
            customize your resume, and easily upload or download it for your job applications. 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

