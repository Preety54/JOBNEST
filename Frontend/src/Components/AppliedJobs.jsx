import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaBriefcase, FaClock, FaCalendarAlt, FaUsers, FaRupeeSign } from "react-icons/fa"

const AppliedJobs = () => {
    const { id } = useParams()
    const navigate = useNavigate()  // Initialize the navigate hook
    const [profile, setProfile] = useState(null)
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfileAndJobs = async () => {
            const token = localStorage.getItem("authToken")

            if (!token) {
                console.warn("No auth token found.")
                setError("Authentication token not found")
                setLoading(false)
                return
            }

            try {
                // Step 1: Fetch the profile to get the appliedJobs array
                const profileResponse = await fetch(`http://localhost:3001/api/profile/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authToken: token,
                    },
                })
                const profileData = await profileResponse.json()

                if (!profileData.success) {
                    setError(profileData.message || "Failed to fetch profile")
                    setLoading(false)
                    return
                }

                setProfile(profileData.profile)

                // Check if the profile has applied jobs
                if (!profileData.profile.appliedJobs || profileData.profile.appliedJobs.length === 0) {
                    setLoading(false)
                    return
                }

                // Step 2: Fetch details for each job in the appliedJobs array
                const jobPromises = profileData.profile.appliedJobs.map(async (jobId) => {
                    const jobResponse = await fetch(`http://localhost:3001/api/jobs/jobs/${jobId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            authToken: token,
                        },
                    })
                    return jobResponse.json()
                })

                const jobResults = await Promise.all(jobPromises)
                const validJobs = jobResults.filter((result) => result.success).map((result) => result.job)

                setJobs(validJobs)
            } catch (error) {
                console.error("Error fetching data:", error)
                setError("Error fetching data")
            } finally {
                setLoading(false)
            }
        }

        fetchProfileAndJobs()
    }, [id])

    // Format date to a readable format
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const handleViewJob = (jobId) => {
        navigate("/applyjob", { state: { jobId } })  // Passing jobId via state
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Applied Jobs for {profile?.name || "User"}</h2>
                <div className="text-sm text-gray-500">
                    Total Applied: <span className="font-semibold">{jobs.length}</span>
                </div>
            </div>

            {jobs.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <FaBriefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Applied Jobs</h3>
                    <p className="text-gray-500">This user hasn't applied to any jobs yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Job
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Stipend
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Timing
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Apply Before
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Applicants
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {jobs.map((job) => (
                                <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                                {job.jobSrc ? (
                                                    <img
                                                        src={job.jobSrc || "/placeholder.svg"}
                                                        alt={job.designation}
                                                        className="h-8 w-8 object-contain"
                                                    />
                                                ) : (
                                                    <FaBriefcase className="h-5 w-5 text-gray-500" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{job.designation}</div>
                                                <div className="text-sm text-gray-500">{job.company || "Company"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <FaRupeeSign className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                            {job.stipend || "Not specified"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <FaClock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                            {job.timing || "Not specified"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <FaCalendarAlt className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                            {job.applyBefore ? formatDate(job.applyBefore) : "Not specified"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <FaUsers className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                            {job.appliedUsers ? job.appliedUsers.length : 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleViewJob(job._id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View Job
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AppliedJobs
