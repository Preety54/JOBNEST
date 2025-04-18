import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/jobs/jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // Decode user ID from token
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded?.user?.id;
        if (id) setUserId(id);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }

    fetchJobs();
  }, []);


  // Handle apply click
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
        // Pass jobId and userId via state
        navigate("/applyjob", { state: { jobId, userId } }); // ✔️ cleaner and secure

      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Token decode error:", err);
      navigate("/login");
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <p className="text-blue-600 text-lg sm:text-xl md:text-2xl text-center">
        Latest Job Openings
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 mt-2">
        Find The Perfect Job You Deserve
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full h-auto"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={job.jobSrc}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-row items-center gap-4">
                  <span className="text-gray-500 text-sm">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <span className="text-blue-600 text-md font-semibold">
                    {job.timing}
                  </span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mt-4">{job.designation}</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Qualification: {job.qualification}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                Stipend: ₹{job.stipend}/month
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                Location: {job.location}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                Timing: {job.timing}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {job.description?.length > 90
                  ? `${job.description.slice(0, 90)}...`
                  : job.description}
              </p>

              {/* Apply Section */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-red-500">
                  Apply Before: {new Date(job.applyBefore).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleApply(job._id)}
                  className={`${(job.appliedUsers || []).map(id => id.toString()).includes(userId)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                    } text-white px-4 py-2 rounded-md text-sm`}
                >
                  {console.log("UserId:", userId)}
                  {console.log("AppliedUsers:", job.appliedUsers)}
                  {(job.appliedUsers || []).map(id => id.toString()).includes(userId)
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
  );
};

export default Jobs;
