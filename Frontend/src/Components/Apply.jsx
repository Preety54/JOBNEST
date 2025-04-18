import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Apply = () => {
  const [profileData, setProfileData] = useState({});
  const [jobs, setJobs] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/profile/user/${id}`);
      if (res.data.success && res.data.profile) {
        setProfileData(res.data.profile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded?.user?.id;
        setUserId(id);
        fetchUserProfile(id);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }

    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/jobs/jobs");
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleApply = (jobId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded?.user?.id;

      if (userId) {
        navigate("/applyjob", { state: { jobId, userId } });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Token decode error:", err);
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col lg:flex-row items-start py-12 px-4 lg:px-6">
      {/* 🔹 Profile Sidebar */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center w-full sm:w-80 md:w-96 lg:w-72 xl:w-64 h-auto sticky top-24 mx-auto lg:mx-0 lg:fixed left-6">
        <label className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <img
            src={profileData.imageSrc || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </label>

        <h3 className="text-lg font-semibold mt-3">{profileData.name || "Loading..."}</h3>
        <p className="text-gray-600 text-sm">{profileData.college || "VIT Bhopal University"}</p>
        <p className="text-blue-500 font-semibold mt-1 text-sm">
          Preferred Role: {profileData.designation || "Full Stack Developer"}
        </p>

        <button
          onClick={() => navigate("/userprofile")}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          View Profile
        </button>
      </div>

      {/* 🔹 Job Listings Section */}
      <div className="w-full lg:ml-80 mt-10 lg:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                    <img src={job.jobSrc} alt="Company Logo" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <span className="text-gray-500 text-xs">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                    <span className="text-blue-600 text-xs font-semibold">{job.timing}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-3">{job.designation}</h3>
                <p className="text-sm text-gray-600">Qualification: {job.qualification}</p>
                <p className="text-sm text-gray-600">Stipend: ₹{job.stipend}/month</p>
                <p className="text-sm text-gray-600">Location: {job.location}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {job.description?.length > 90 ? `${job.description.slice(0, 90)}...` : job.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-red-500">
                    Apply Before: {new Date(job.applyBefore).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleApply(job._id)}
                    className={`${
                      (job.appliedUsers || []).map((id) => id.toString()).includes(userId)
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white px-4 py-2 rounded-md text-xs`}
                  >
                    {(job.appliedUsers || []).map((id) => id.toString()).includes(userId)
                      ? "View Job"
                      : "Apply Now"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
