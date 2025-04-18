import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/uiwebp.png"; // Example Image Imports

const JobsCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (title) => {
    navigate("/filteredjobs", { state: { category: title } });
  };

  const categories = [
    { title: "Software Development", color: "bg-red-300" },
    { title: "Marketing", color: "bg-yellow-300" },
    { title: "Design", color: "bg-green-300" },
    { title: "System Tester", color: "bg-blue-300" },
    { title: "Customer Service", color: "bg-purple-300" },
    { title: "Animation", color: "bg-orange-300" },
    { title: "Product Engineering", color: "bg-pink-300" },
  ];

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
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-48 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleCategoryClick(category.title)}
          >
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
