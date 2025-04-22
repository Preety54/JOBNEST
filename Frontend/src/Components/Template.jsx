import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import t1 from "../assets/T4.png"
import t2 from "../assets/T2.png"
import t3 from "../assets/T3.png"
import t4 from "../assets/T6.png"
import t5 from "../assets/T5.png"

const Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const templates = [
    { id: 1, image: t1 },
    { id: 2, image: t2 },
    { id: 3, image: t3 },
    { id: 4, image: t4 },
    { id: 5, image: t5 },
  ]

  const handleProceed = async () => {
    if (!selectedTemplate) return

    setLoading(true)
    setError(null)

    try {
      // Get user ID from auth token
      const token = localStorage.getItem("authToken")
      if (!token) {
        setError("You must be logged in to select a template")
        setLoading(false)
        return
      }

      const decoded = jwtDecode(token)
      const userId = decoded?.user?.id

      if (!userId) {
        setError("Invalid authentication token")
        setLoading(false)
        return
      }

      // Update profile with selected template
      const templateValue = `template${selectedTemplate}`

      // Get current profile data first
      const profileResponse = await axios.get(`http://localhost:3001/api/profile/user/${userId}`)
      const currentProfile = profileResponse.data.profile

      // Update profile with new template value
      await axios.put(`http://localhost:3001/api/profile/update/${userId}`, {
        ...currentProfile,
        resume: templateValue,
      })

      // Navigate to the template page with user ID
      navigate(`/${templateValue}/${userId}`)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 p-8 max-w-[1400px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Select a Resume Template</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-center">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border p-2 rounded-lg cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105 ${
              selectedTemplate === template.id ? "border-blue-500 border-2" : ""
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <img
              src={template.image || "/placeholder.svg"}
              alt={`Template ${template.id}`}
              className="w-[240px] h-[350px] object-cover rounded"
            />
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-6 text-center">
          <button
            className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
            onClick={handleProceed}
            disabled={loading}
          >
            {loading ? "Processing..." : `Proceed with Template ${selectedTemplate}`}
          </button>
        </div>
      )}
    </div>
  )
}

export default Template
