// import React from "react";
// import img1 from "../assets/register.webp"; // Replace with your actual image path
// import img2 from "../assets/apply.png"; // Replace with your actual image path
// import img3 from "../assets/resume.png"; // Replace with your actual image path

// const AboutUs = () => {
//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
//       {/* 🔹 Headings */}
//       <p className="text-blue-600 text-2xl font-semibold text-center">Working Process</p>
//       <h2 className="text-4xl font-bold text-center mb-10 mt-5">How it Works</h2>

//       {/* 🔹 Cards Section */}
// <div className="flex justify-between items-center w-full max-w-5xl gap-6">
  
//   {/* 🔹 Card 1 - Blue */}
//   <div className="bg-blue-700 text-white p-6 rounded-lg flex-1 flex flex-col items-start shadow-lg h-64">
//     <img src={img1} alt="Step 1" className="w-16 h-16 mb-4" /> {/* Image on Top Left */}
//     <h3 className="text-xl font-bold mb-2">Register Your Account</h3>
//     <p className="text-sm">Join JobNest today and take the first step towards your dream career! Create your profile on JOBNEST</p>
//   </div>

//   {/* 🔹 Card 2 - Pink */}
//   <div className="bg-pink-500 text-white p-6 rounded-lg flex-1 flex flex-col items-start shadow-lg h-64">
//     <img src={img2} alt="Step 2" className="w-16 h-16 mb-4" /> {/* Image on Top Left */}
//     <h3 className="text-xl font-bold mb-2">Apply Your Dream Job</h3>
//     <p className="text-sm">Join JobNest today and apply for your dream job! Connect with top recruiters and land the perfect opportunity. 🚀</p>
//   </div>

//   {/* 🔹 Card 3 - Green */}
//   <div className="bg-green-600 text-white p-6 rounded-lg flex-1 flex flex-col items-start shadow-lg h-64">
//     <img src={img3} alt="Step 3" className="w-16 h-16 mb-4" /> {/* Image on Top Left */}
//     <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
//     <p className="text-sm">Create a professional resume with JobNest! Use diverse templates, customize your resume, and easily upload or download it for your job applications. 🚀</p>
//   </div>

// </div>

//     </div>
//   );
// };

// export default AboutUs;

import React from "react";
import img1 from "../assets/register.webp"; // Replace with actual image path
import img2 from "../assets/apply.png"; // Replace with actual image path
import img3 from "../assets/resume.png"; // Replace with actual image path

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
      {/* 🔹 Headings */}
      <p className="text-blue-600 text-xl sm:text-2xl font-semibold text-center">Working Process</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 mt-5">How it Works</h2>

      {/* 🔹 Responsive Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        
        {/* 🔹 Card 1 - Blue */}
        <div className="bg-blue-700 text-white p-6 rounded-lg flex flex-col items-center shadow-lg min-h-[280px]">
          <img src={img1} alt="Step 1" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-center">Register Your Account</h3>
          <p className="text-sm text-center">
            Join JobNest today and take the first step towards your dream career! 
            Create your profile on JOBNEST.
          </p>
        </div>

        {/* 🔹 Card 2 - Pink */}
        <div className="bg-pink-500 text-white p-6 rounded-lg flex flex-col items-center shadow-lg min-h-[280px]">
          <img src={img2} alt="Step 2" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-center">Apply Your Dream Job</h3>
          <p className="text-sm text-center">
            Join JobNest today and apply for your dream job! 
            Connect with top recruiters and land the perfect opportunity. 🚀
          </p>
        </div>

        {/* 🔹 Card 3 - Green */}
        <div className="bg-green-600 text-white p-6 rounded-lg flex flex-col items-center shadow-lg min-h-[280px]">
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
