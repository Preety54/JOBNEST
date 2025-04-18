import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ApplyJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = location.state || {};
  const [job, setJob] = useState(null);
  const [userId, setUserId] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (!jobId) {
      navigate("/jobs");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    setUserId(decoded.user.id);

    // Fetch Job Details
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/jobs/jobs/${jobId}`);
        const fetchedJob = response.data.job;
        setJob(fetchedJob);

        // Check if the user has already applied
        if (fetchedJob.appliedUsers && fetchedJob.appliedUsers.includes(decoded.user.id)) {
          setIsApplied(true);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  const handleApply = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/jobs/apply/${jobId}`, { userId });
      alert("Application submitted!");
      setIsApplied(true); // Mark as applied after successful submission
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply. Try again later.");
    }
  };

  if (!job) return <div className="text-center mt-10">Loading job details...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{job.designation}</h2>
      <p><strong>Qualification:</strong> {job.qualification}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Timing:</strong> {job.timing}</p>
      <p><strong>Stipend:</strong> ₹{job.stipend}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p className="text-red-600 mt-2">
        <strong>Apply Before:</strong> {new Date(job.applyBefore).toLocaleDateString()}
      </p>

      {/* Conditional button rendering */}
      <button
        className={`mt-6 px-6 py-2 rounded ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        onClick={handleApply}
        disabled={isApplied} // Disable button if already applied
      >
        {isApplied ? "Applied" : "Apply Now"}
      </button>
    </div>
  );
};

export default ApplyJob;
