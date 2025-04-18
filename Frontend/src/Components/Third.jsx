// import React from "react";
// import first from "../assets/girl1.jpg"; // Replace with actual image paths
// import second from "../assets/main2.jpeg";

// const Third = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="relative w-full min-h-screen bg-gray-300 flex flex-col items-center justify-center text-black px-6 overflow-hidden">
      
//       {/* 🔹 Top Left Polygon - Visible only on lg screens */}
//       <div className="hidden lg:block absolute top-[-150px] left-[-260px] w-96 h-78 bg-blue-500 clip-polygon rotate-38 opacity-70"></div>

//       {/* 🔹 Bottom Right Polygon - Visible only on lg screens */}
//       <div className="hidden lg:block absolute bottom-[-220px] right-[-190px] w-96 h-200 bg-blue-500 clip-polygon rotate-40 opacity-70"></div>

//       {/* 🔹 Content Section - Responsive Layout */}
//       <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-6xl gap-10">

//         {/* 🔹 Left Image - Responsive */}
//         <img 
//           src={first} 
//           alt="Description 1" 
//           className="w-[80%] sm:w-[60%] md:w-1/3 h-[250px] md:h-[350px] rounded-lg shadow-lg object-cover"
//         />

//         {/* 🔹 Text Section */}
//         <div className="w-full md:w-[400px] text-center mx-auto px-4">
//           <h2 className="text-2xl font-bold text-blue-600 mb-4">Companies</h2>

//           <p className="text-2xl md:text-4xl font-serif font-bold mb-6">
//             500+ World Top Companies have Posted their Jobs.
//           </p>

//           <button
//         onClick={() => navigate("/jobs")}
//         className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
//       >
//         Get Started
//       </button>
//         </div>

//         {/* 🔹 Right Image - Responsive */}
//         <img 
//           src={second} 
//           alt="Description 2" 
//           className="w-[80%] sm:w-[60%] md:w-1/3 h-[250px] md:h-[350px] rounded-lg shadow-lg object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default Third;

import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ FIXED import
import first from "../assets/girl1.jpg";
import second from "../assets/main2.jpeg";

const Third = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-gray-300 flex flex-col items-center justify-center text-black px-6 overflow-hidden">
      {/* 🔹 Top Left Polygon - Visible only on lg screens */}
      <div className="hidden lg:block absolute top-[-150px] left-[-260px] w-96 h-78 bg-blue-500 clip-polygon rotate-38 opacity-70"></div>

      {/* 🔹 Bottom Right Polygon - Visible only on lg screens */}
      <div className="hidden lg:block absolute bottom-[-220px] right-[-190px] w-96 h-200 bg-blue-500 clip-polygon rotate-40 opacity-70"></div>

      {/* 🔹 Content Section - Responsive Layout */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-6xl gap-10">
        {/* 🔹 Left Image */}
        <img
          src={first}
          alt="Description 1"
          className="w-[80%] sm:w-[60%] md:w-1/3 h-[250px] md:h-[350px] rounded-lg shadow-lg object-cover"
        />

        {/* 🔹 Text Section */}
        <div className="w-full md:w-[400px] text-center mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Companies</h2>
          <p className="text-2xl md:text-4xl font-serif font-bold mb-6">
            500+ World Top Companies have Posted their Jobs.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        </div>

        {/* 🔹 Right Image */}
        <img
          src={second}
          alt="Description 2"
          className="w-[80%] sm:w-[60%] md:w-1/3 h-[250px] md:h-[350px] rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Third;
