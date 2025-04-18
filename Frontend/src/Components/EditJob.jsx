import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [jobData, setJobData] = useState({
    designation: "",
    qualification: "",
    stipend: "",
    location: "",
    timing: "",
    description: "",
    applyBefore: "",
    jobSrc: "",
  });

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("jobId from URL:", jobId);
  
    const fetchJobDetails = async () => {
      try {
        console.log("Fetching job details...");
        setIsLoading(true);
  
        const token = localStorage.getItem("authToken");
  
        if (!token) {
          console.warn("No auth token found.");
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
  
        console.log("Auth Token:", token);
  
        const response = await axios.get(`http://localhost:3001/api/jobs/jobs/${jobId}`, {
          headers: {
            authToken: token,
          },
        });
  
        console.log("Job details response:", response);
  
        const job = response.data.job;
  
        setJobData({
          designation: job.designation || "",
          qualification: job.qualification || "",
          stipend: job.stipend || "",
          location: job.location || "",
          timing: job.timing || "",
          description: job.description || "",
          applyBefore: job.applyBefore?.split("T")[0] || "",
          jobSrc: job.jobSrc || "",
        });
  
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error.response?.data || error.message);
        setError("Failed to load job details. Please try again.");
        setIsLoading(false);
      }
    };
  
    if (jobId) {
      fetchJobDetails();
    } else {
      console.warn("jobId is not defined");
      setError("Invalid job ID");
      setIsLoading(false);
    }
  }, [jobId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication token not found");
        return;
      }

      await axios.put(
        `http://localhost:3001/api/jobs/update-job/${jobId}`,
        jobData,
        {
          headers: {
            authToken: token,
          },
        }
      );

      alert("Job updated successfully!");
      navigate("/adminhero");
    } catch (error) {
      console.error("Error updating job:", error.response?.data || error.message);
      setError("Failed to update job. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => navigate("/adminhero")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Job</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="designation"
          value={jobData.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="qualification"
          value={jobData.qualification}
          onChange={handleChange}
          placeholder="Qualification"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="stipend"
          value={jobData.stipend}
          onChange={handleChange}
          placeholder="Stipend"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="timing"
          value={jobData.timing}
          onChange={handleChange}
          placeholder="Timing"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="applyBefore"
          value={jobData.applyBefore}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border p-2 rounded"
          rows={4}
        />
        <input
          type="text"
          name="jobSrc"
          value={jobData.jobSrc}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/adminhero")}
            className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
