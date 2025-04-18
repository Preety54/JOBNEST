// import React from "react";
// import img1 from "../assets/uiwebp.png"; // Example Image Imports
// import img2 from "../assets/circle1.png";

// const JobsCategory = () => {
//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
//       {/* 🔹 Headings */}
//       <p className="text-blue-600 text-2xl text-center">Jobs Category</p>
//       <h2 className="text-4xl font-bold text-center mb-10 mt-2">Choose Your Desire Category </h2>

//       {/* 🔹 Cards Section (Grid Layout) */}
//       <div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
        
//         {/* 🔹 First Row */}
//         <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <div className="bg-red-300 p-4 rounded-full mb-4 ">
//             <img src={img1} alt="Category 1" className="w-12 h-12" />
//           </div>
//           <p className="text-lg font-semibold">Software Development</p>
//         </div>

//         <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <div className="bg-yellow-300 p-4 rounded-full mb-4">
//             <img src={img2} alt="Category 2" className="w-12 h-12" />
//           </div>
//           <p className="text-lg font-semibold">Marketing</p>
//         </div>

//         <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <div className="bg-green-300 p-4 rounded-full mb-4">
//             <img src={img2} alt="Category 3" className="w-12 h-12" />
//           </div>
//           <p className="text-lg font-semibold">Design</p>
//         </div>

//         <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <div className="bg-blue-300 p-4 rounded-full mb-4">
//             <img src={img2} alt="Category 4" className="w-12 h-12" />
//           </div>
//           <p className="text-lg font-semibold">System Tester</p>
//         </div>

//         {/* 🔹 Second Row */}
//         <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <div className="bg-purple-300 p-4 rounded-full mb-4">
//             <img src={img2} alt="Category 5" className="w-12 h-12" />
//           </div>
//           <p className="text-lg font-semibold">Customer Service</p>
//         </div>

//         <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <div className="bg-orange-300 p-4 rounded-full mb-4">
//             <img src={img2} alt="Category 6" className="w-12 h-12" />
//           </div>
//           <p className="text-lg font-semibold">Animation</p>
//         </div>

//         <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <div className="bg-pink-300 p-4 rounded-full mb-4">
//             <img src={img2} alt="Category 7" className="w-12 h-12" />
//           </div>
//           <p className="text-lg font-semibold"> Product Engineering</p>
//         </div>

//         {/* 🔹 Special Card - Blue Background */}
//         <div className="bg-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
//           <p className="text-white text-3xl text-center mt-9 font-bold">100+ More Categories</p>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default JobsCategory;

import React from "react";
import img1 from "../assets/uiwebp.png"; // Example Image Imports
import img2 from "../assets/circle1.png";

const JobsCategory = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
      {/* 🔹 Headings */}
      <p className="text-blue-600 text-lg sm:text-2xl text-center">Jobs Category</p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 mt-2">
        Choose Your Desired Category
      </h2>

      {/* 🔹 Responsive Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        
        {/* 🔹 Job Category Cards */}
        {[
          { title: "Software Development", color: "bg-red-300" },
          { title: "Marketing", color: "bg-yellow-300" },
          { title: "Design", color: "bg-green-300" },
          { title: "System Tester", color: "bg-blue-300" },
          { title: "Customer Service", color: "bg-purple-300" },
          { title: "Animation", color: "bg-orange-300" },
          { title: "Product Engineering", color: "bg-pink-300" },
        ].map((category, index) => (
          <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
            <div className={`${category.color} p-4 rounded-full mb-4`}>
              <img src={img1} alt={category.title} className="w-12 h-12" />
            </div>
            <p className="text-lg font-semibold text-center">{category.title}</p>
          </div>
        ))}

        {/* 🔹 Special Card - Blue Background */}
        <div className="bg-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48">
          <p className="text-white text-xl sm:text-2xl md:text-3xl text-center mt-9 font-bold">
            100+ More Categories
          </p>
        </div>

      </div>

    </div>
  );
};

export default JobsCategory;
