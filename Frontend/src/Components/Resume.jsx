
import React from "react";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div className="p-24">
      {/* User Profile and Upload Button */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600">User</span>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Upload Photo</button>
      </div>
      
      {/* Resume Form */}
      <div className="grid grid-cols-3 gap-4">
        <input type="text" placeholder="First Name" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Middle Name" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Last Name" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Address" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="City" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Pincode" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Country" className="p-2 border rounded-2xl" />
        <input type="email" placeholder="Email" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Role" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Project 1" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Project 2" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Project 3" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Project 4" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Experience 1" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Experience 2" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Experience 3" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Xth Qualification" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="XII Qualification" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Degree Qualification" className="p-2 border rounded-2xl" />
        <input type="text" placeholder="Other Details" className="p-2 border rounded-2xl " />
      </div>

      {/* Select Template Button */}
      <div className="mt-6 ">
        <button 
          className="bg-black text-white px-6 py-3 rounded-2xl"
          onClick={() => navigate("/template")}
        >
          Select Template
        </button>
      </div>
    </div>
  );
};

export default Resume;

