// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// // 👇 Cloudinary upload function
// const uploadToCloudinary = async (base64Image) => {
//   try {
//     const base64Data = base64Image.split(",")[1];
//     const formData = new FormData();
//     formData.append("file", `data:image/jpeg;base64,${base64Data}`);
//     formData.append("upload_preset", "iampreety");

//     const response = await fetch("https://api.cloudinary.com/v1_1/dinlgwks4/image/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     if (data.secure_url) {
//       console.log("✅ Image uploaded:", data.secure_url);
//       return data.secure_url;
//     } else {
//       throw new Error("❌ Upload failed: " + JSON.stringify(data));
//     }
//   } catch (error) {
//     console.error("🚨 Error uploading to Cloudinary:", error);
//     toast.error("Failed to upload image");
//     return null;
//   }
// };

// const AddJob = () => {
//   const [jobData, setJobData] = useState({
//     category: "",
//     designation: "",
//     qualification: "",
//     stipend: "",
//     location: "",
//     timing: "",
//     description: "",
//     applyBefore: "",
//     jobSrc: "",
//   });

//   const [imagePreview, setImagePreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setJobData({
//       ...jobData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => setImagePreview(reader.result);
//     if (file) reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const token = localStorage.getItem("authToken");

//     try {
//       let uploadedImageUrl = "";
//       if (imagePreview.startsWith("data:image")) {
//         uploadedImageUrl = await uploadToCloudinary(imagePreview);
//       }

//       const response = await axios.post(
//         "http://localhost:3001/api/jobs/create-job",
//         {
//           ...jobData,
//           jobSrc: uploadedImageUrl || "",
//         },
//         {
//           headers: {
//             authToken: token,
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success("Job added successfully!");
//         navigate("/adminhome");
//       } else {
//         toast.error("Failed to add job.");
//       }
//     } catch (error) {
//       console.error("❌ Error creating job:", error);
//       toast.error("Something went wrong while creating the job.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl  font-bold mb-6 text-center">Add New Job</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* 🔽 Category Dropdown */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Category</label>
//           <select
//             name="category"
//             value={jobData.category}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             <option value="">Select Category</option>
//             <option value="Software Developer">Software Developer</option>
//             <option value="Animation">Animation</option>
//             <option value="Marketing">Marketing</option>
//             <option value="Product Development">Product Development</option>
//             <option value="Tester">Tester</option>
//             <option value="Designer">Designer</option>
//           </select>
//         </div>

//         {/* Other Input Fields */}
//         {[
//           { label: "Designation", name: "designation" },
//           { label: "Qualification", name: "qualification" },
//           { label: "Stipend", name: "stipend" },
//           { label: "Location", name: "location" },
//           { label: "Timing", name: "timing" },
//           { label: "Description", name: "description" },
//           { label: "Apply Before", name: "applyBefore", type: "date" },
//         ].map(({ label, name, type = "text" }) => (
//           <div key={name}>
//             <label className="block text-sm font-medium mb-1">{label}</label>
//             <input
//               type={type}
//               name={name}
//               value={jobData[name]}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>
//         ))}

//         {/* 🖼️ Image Upload */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Job Image</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="h-32 mt-3 rounded-md object-cover"
//             />
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//         >
//           {loading ? "Posting..." : "Add Job"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddJob;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const uploadToCloudinary = async (base64Image) => {
  try {
    const base64Data = base64Image.split(",")[1];
    const formData = new FormData();
    formData.append("file", `data:image/jpeg;base64,${base64Data}`);
    formData.append("upload_preset", "iampreety");

    const response = await fetch("https://api.cloudinary.com/v1_1/dinlgwks4/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.secure_url) {
      console.log("✅ Image uploaded:", data.secure_url);
      return data.secure_url;
    } else {
      throw new Error("❌ Upload failed: " + JSON.stringify(data));
    }
  } catch (error) {
    console.error("🚨 Error uploading to Cloudinary:", error);
    toast.error("Failed to upload image");
    return null;
  }
};

const AddJob = () => {
  const [jobData, setJobData] = useState({
    category: "",
    designation: "",
    qualification: "",
    stipend: "",
    location: "",
    timing: "",
    description: "",
    applyBefore: "",
    jobSrc: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      let uploadedImageUrl = "";
      if (imagePreview.startsWith("data:image")) {
        uploadedImageUrl = await uploadToCloudinary(imagePreview);
      }

      const response = await axios.post(
        "http://localhost:3001/api/jobs/create-job",
        {
          ...jobData,
          jobSrc: uploadedImageUrl || "",
        },
        {
          headers: {
            authToken: token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Job added successfully!");
        navigate("/adminhome");
      } else {
        toast.error("Failed to add job.");
      }
    } catch (error) {
      console.error("❌ Error creating job:", error);
      toast.error("Something went wrong while creating the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-black rounded-xl shadow-lg border border-yellow-500">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Add New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* 🔽 Category Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-blue-500 mb-1">Category</label>
          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="" className="text-yellow-500">Select Category</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Animation">Animation</option>
            <option value="Marketing">Marketing</option>
            <option value="Product Development">Product Development</option>
            <option value="Tester">Tester</option>
            <option value="Designer">Designer</option>
          </select>
        </div>

        {/* 🔠 Input Fields */}
        {[
          { label: "Designation", name: "designation" },
          { label: "Qualification", name: "qualification" },
          { label: "Stipend", name: "stipend" },
          { label: "Location", name: "location" },
          { label: "Timing", name: "timing" },
          { label: "Description", name: "description" },
          { label: "Apply Before", name: "applyBefore", type: "date" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-semibold text-blue-500 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={jobData[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}

        {/* 🖼️ Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-blue-500 mb-1">Job Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-white" />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 mt-3 rounded-md object-cover border border-yellow-400"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-black font-bold py-2 rounded-md hover:bg-blue-500 transition"
        >
          {loading ? "Posting..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
