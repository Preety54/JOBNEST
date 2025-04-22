import React, { useState, useEffect } from "react"
import { FaGithub, FaLinkedin, FaBriefcase, FaEye } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import AdminNavbar from "./AdminNavbar" // ✅ Make sure path is correct

const Users = () => {
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfiles = async () => {
            const token = localStorage.getItem("authToken")

            if (!token) {
                console.warn("No auth token found.")
                setError("Authentication token not found")
                setLoading(false)
                return
            }

            try {
                const response = await fetch("http://localhost:3001/api/profile/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authToken: token,
                    },
                })
                const data = await response.json()

                if (data.success) {
                    const filteredProfiles = data.profiles.filter(
                        (profile) => profile.userId !== "67fa894488d2565e980da503"
                    )
                    setProfiles(filteredProfiles)
                } else {
                    setError(data.message || "Failed to fetch profiles")
                }
            } catch (error) {
                setError("Error fetching profiles")
                console.error("Error fetching profiles:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfiles()
    }, [])

    const handleAppliedJobsClick = (id) => {
        navigate(`/appliedjobs/${id}`)
    }

    const handleViewProfileClick = (id) => {
        navigate(`/userprofile/${id}`)
    }

    return (
        <>
            <AdminNavbar />

            <div className="pt-[92px] pb-10 px-4 min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">User Profiles</h2>

                    {loading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-lg mx-auto text-center">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-600">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Profile</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Links</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {profiles.map((profile) => (
                                            <tr key={profile._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={profile.imageSrc || "/placeholder.svg"}
                                                            alt={profile.name}
                                                        />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                                                            <div className="text-sm text-gray-500">{profile.designation}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{profile.email}</div>
                                                    <div className="text-sm text-gray-500">{profile.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{profile.location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-3">
                                                        {profile.github && (
                                                            <a
                                                                href={
                                                                    profile.github.startsWith("http")
                                                                        ? profile.github
                                                                        : `https://github.com/${profile.github}`
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-600 hover:text-black"
                                                            >
                                                                <FaGithub className="h-5 w-5" />
                                                            </a>
                                                        )}
                                                        {profile.linkedin && (
                                                            <a
                                                                href={
                                                                    profile.linkedin.startsWith("http")
                                                                        ? profile.linkedin
                                                                        : `https://linkedin.com/in/${profile.linkedin}`
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800"
                                                            >
                                                                <FaLinkedin className="h-5 w-5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleAppliedJobsClick(profile._id)}
                                                            className="bg-indigo-600 text-white px-3 py-1.5 text-xs rounded-md hover:bg-indigo-700 flex items-center"
                                                        >
                                                            <FaBriefcase className="mr-1" />
                                                            Applied Jobs
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewProfileClick(profile.userId)}
                                                            className="bg-white text-gray-700 border border-gray-300 px-3 py-1.5 text-xs rounded-md hover:bg-gray-100 flex items-center"
                                                        >
                                                            <FaEye className="mr-1" />
                                                            View Profile
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {profiles.length === 0 && (
                                <div className="text-center py-10 bg-white rounded-lg shadow mt-4">
                                    <p className="text-gray-500">No profiles found</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Users
