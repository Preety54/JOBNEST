// // import React from "react";
// // import b1 from "../assets/bg1.jpg"

// // const Home = () => {
// //   return (
// //     <div 
// //       className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4 overflow-hidden"
// //       style={{ backgroundImage: `url(${b1})` }} // 🔹 Replace with your actual image path
// //     >
// //       {/* 🔹 Top Left Polygon (Rotated & Larger) */}
// //       <div className="absolute top-[-150px] left-[-260px] w-96 h-78 bg-blue-500 clip-polygon rotate-38 opacity-70"></div>

// //       {/* 🔹 Bottom Right Polygon (Rotated & Bigger) */}
// //       <div className="absolute bottom-[-220px] right-[-190px] w-96 h-200 bg-blue-500 clip-polygon rotate-40 opacity-70"></div>

// //       {/* 🔹 Main Content in Center */}
// //       <div className="text-center max-w-3xl">
// //         <h1 className="text-4xl font-bold mb-4 text-black">Your <span class="text-blue-600">Dream</span> Job is Waiting For You...</h1>
// //         <p className="text-lg mb-6 text-black">
// //           Discover thousands of job opportunities in your preferred location and industry.
// //           Search for jobs by title, keyword, or city and start your career today!
// //         </p>

// //         {/* 🔹 Search Section */}
// //         <div className="bg-blue-100 p-6 rounded-xl shadow-lg flex flex-wrap gap-4 justify-center items-center text-black">
// //           <input 
// //             type="text" 
// //             placeholder="Job Title, Keywords..." 
// //             className="border px-4 py-2 rounded-md w-64 focus:outline-none"
// //           />
// //           <input 
// //             type="text" 
// //             placeholder="Job Location, City..." 
// //             className="border px-4 py-2 rounded-md w-64 focus:outline-none"
// //           />
// //           <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
// //             Find Jobs
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
// import React from "react";
// import b1 from "../assets/bg1.jpg";
// import jobSearchImage from "../assets/man.png"; // Replace with your actual image

// const Home = () => {
//   return (
//     <div 
//       className="relative w-full h-screen bg-cover bg-center flex items-center justify-center px-8 overflow-hidden"
//       style={{ backgroundImage: `url(${b1})` }} 
//     >
//       {/* 🔹 Top Left Polygon */}
//       <div className="absolute top-[-120px] left-[-200px] w-94 h-86 bg-blue-500 clip-polygon rotate-45 opacity-70"></div>

//       {/* 🔹 Bottom Right Polygon */}
//       <div className="absolute bottom-[-220px] right-[-190px] w-96 h-200 bg-blue-500 clip-polygon rotate-40 opacity-70"></div>

//       {/* 🔹 Main Content (Flexbox for Text + Image) */}
// <div className="flex items-center justify-between w-full max-w-6xl">

// {/* Left Section - More Width (60%) */}
// <div className="w-[60%] text-left p-8">
//   <p className="text-blue-600 font-serif font-bold">We have 2500 + Live Jobs</p>
//   <h1 className="text-4xl font-bold mb-6 text-black leading-tight">
//     Your <span className="text-blue-600">Dream</span> Job is Waiting For You...
//   </h1>
//   <p className="text-lg mb-8 text-blue-600">
//     Enter Keywords and Find Your Perfect Job
//   </p>

//   {/* 🔹 Search Section - Flexbox Layout */}
// <div className="bg-blue-100 font-semibold text-black p-6 rounded-xl shadow-lg flex justify-between items-center w-full gap-4">
//   <input 
//     type="text" 
//     placeholder="Job Title, Keywords..." 
//     className="border px-4 py-3 rounded-md w-[45%] focus:outline-none"
//   />
//   <input 
//     type="text" 
//     placeholder="Job Location, City..." 
//     className="border px-4 py-3 rounded-md w-[45%] focus:outline-none"
//   />
//   <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold w-[30%] hover:bg-blue-700">
//     Find Jobs
//   </button>
// </div>

// <p className="text-sm text-black mt-5 font-serif font-bold">
//   Popular Searches: 
//   <span className="text-blue-600 text-sm"> UI/UX, Software Engineers, Architect...</span> 
// </p>

// </div>

// {/* Right Section - Smaller Width (40%) */}
// <div className="w-[40%] flex justify-center">
//   <img 
//     src={jobSearchImage} 
//     alt="Job Search" 
//     className="w-[400px] h-auto drop-shadow-lg"
//   />
// </div>

// </div>

//     </div>
//   );
// };

// export default Home;


import React from "react";
import b1 from "../assets/bg1.jpg";
import jobSearchImage from "../assets/man.png"; // Replace with actual image path

const Home = () => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ backgroundImage: `url(${b1})` }}
    >
      {/* 🔹 Decorative Shapes */}
      <div className="absolute top-[-120px] left-[-200px] w-96 h-89 bg-blue-500 clip-polygon rotate-45 opacity-70 hidden lg:block"></div>
      <div className="absolute bottom-[-220px] right-[-190px] w-96 h-200 bg-blue-500 clip-polygon rotate-40 opacity-70 hidden lg:block"></div>

      {/* 🔹 Main Content - Flexbox Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl space-y-10 lg:space-y-0">
        
        {/* 🔹 Left Section - Text & Search Bar */}
        <div className="lg:w-3/5 text-center lg:text-left px-4">
          <p className="text-blue-600 font-serif font-bold">We have 2500+ Live Jobs</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-black leading-tight">
            Your <span className="text-blue-600">Dream</span> Job is Waiting For You...
          </h1>
          <p className="text-base sm:text-lg mb-8 text-blue-600">
            Enter Keywords and Find Your Perfect Job
          </p>

          {/* 🔹 Search Section */}
          <div className="bg-blue-100 font-semibold space-x-3 text-black p-6 rounded-xl shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between w-full space-y-4 sm:space-y-0">
            <input
              type="text"
              placeholder="Job Title, Keywords..."
              className="border px-4 py-3 rounded-md w-full sm:w-[45%] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Job Location, City..."
              className="border px-4 py-3 rounded-md w-full sm:w-[45%] focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold w-full sm:w-[30%] hover:bg-blue-700">
              Find Jobs
            </button>
          </div>

          <p className="text-sm text-black mt-5 font-serif font-bold">
            Popular Searches:{" "}
            <span className="text-blue-600 text-sm">UI/UX, Software Engineers, Architect...</span>
          </p>
        </div>

        {/* 🔹 Right Section - Job Search Image */}
        <div className="lg:w-2/5 flex justify-center">
          <img
            src={jobSearchImage}
            alt="Job Search"
            className="w-[80%] max-w-[400px] h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
