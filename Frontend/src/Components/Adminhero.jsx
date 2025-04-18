import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/jobs/jobs");
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (jobId) => {
    navigate(`/editjob/${jobId}`);
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setError("Authentication token not found");
        return;
      }
      
      await axios.delete(`http://localhost:3001/api/jobs/delete-job/${jobId}`, {
        headers: {
          authToken: token,
        },
      });
      
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      setError("Failed to delete job. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mt-12 mb-6">Job Management Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img
                        src={job.jobSrc || "/placeholder.svg?height=48&width=48"}
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

                  <h3 className="text-lg font-bold mt-4">{job.designation}</h3>
                  <p className="text-sm text-gray-600">Qualification: {job.qualification}</p>
                  <p className="text-sm text-gray-600">Stipend: ₹{job.stipend}/month</p>
                  <p className="text-sm text-gray-600">Location: {job.location}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="border-t p-4 flex justify-between items-center">
                  <span className="text-sm text-red-500">
                    Apply Before: {new Date(job.applyBefore).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                      onClick={() => handleEdit(job._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
                      onClick={() => handleDelete(job._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;