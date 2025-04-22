import React, { useEffect, useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export default function Template1() {
  const [data, setData] = useState(null)
  const [profile, setProfile] = useState({
    education: [],
    hobbies: [],
    certifications: [],
    skills: [],
    experience: [],
    projects: [],
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const pathSegments = window.location.pathname.split("/")
      const templateName = pathSegments[1]
      const pathUserId = pathSegments[pathSegments.length - 1]

      if (!pathUserId) {
        console.error("No userId found in URL")
        return
      }

      try {
        const res = await axios.get(`http://localhost:3001/api/profile/user/${pathUserId}`)
        if (res.data.success && res.data.profile) {
          const userProfile = res.data.profile

          if (userProfile.resume !== templateName) {
            setData({ error: "Resume not found" })
            return
          }

          setProfile({
            education: userProfile.education || [],
            hobbies: userProfile.hobbies || [],
            certifications: userProfile.certifications || [],
            skills: userProfile.skills || [],
            experience: userProfile.experience || [],
            projects: userProfile.projects || [],
          })

          const token = localStorage.getItem("authToken")
          let isOwner = false
          if (token) {
            try {
              const decoded = jwtDecode(token)
              const tokenUserId = decoded?.user?.id
              isOwner = tokenUserId === pathUserId
            } catch (err) {
              console.error("Error decoding token:", err)
            }
          }

          setData({
            ...userProfile,
            isOwner,
          })
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
      }
    }

    fetchProfile()
  }, [])

  const removeDefaultTemplate = async () => {
    const pathSegments = window.location.pathname.split("/")
    const pathUserId = pathSegments[pathSegments.length - 1]

    if (!pathUserId) return

    try {
      const response = await axios.put(`http://localhost:3001/api/profile/update/${pathUserId}`, {
        ...data,
        resume: "",
      })

      if (response.data.success) {
        window.location.reload()
      }
    } catch (err) {
      console.error("Error removing template:", err)
      alert("Failed to remove template")
    }
  }

  if (!data) {
    return <div className="text-center p-10 text-gray-600">Loading profile...</div>
  }

  if (data.error) {
    return <div className="text-center p-10 text-red-600">{data.error}</div>
  }

  const certificationsCount = data.certifications?.length || 0
  const hobbiesCount = data.hobbies?.length || 0
  const skillsCount = data.skills?.length || 0
  const educationCount = data.education?.length || 0
  const experienceCount = data.experience?.length || 0
  const projectsCount = data.projects?.length || 0

  return (
    <>
      {data?.isOwner && (
        <div className="w-full bg-gray-100 p-4 text-center">
          <button
            onClick={removeDefaultTemplate}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Remove this template as default
          </button>
        </div>
      )}
      <div className="w-[210mm] h-[297mm] p-[6mm] bg-white shadow-md mx-auto">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Sidebar */}
          <div className="bg-[#2c5282] text-white p-4 md:w-1/3">
            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={data.imageSrc || "/placeholder.svg"}
                  alt="Profile"
                  className=" w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-1">ABOUT ME</h2>
              <p className="text-sm">{data.description}</p>
            </div>

            {skillsCount > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-1">SKILLS</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {data.skills.slice(0, 8).map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-1">CONTACT</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="text-sm">{data.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span className="text-sm">{data.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="text-sm">{data.email}</span>
                </div>
              </div>
            </div>

            {certificationsCount > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-1">CERTIFICATIONS</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {data.certifications.slice(0, 2).map((cert, idx) => (
                    <li key={idx}>
                      <div className="font-semibold">{cert.name}</div>
                      <div className="text-xs italic">Issued by: {cert.issuer}</div>
                      {cert.credentialId && <div className="text-xs">Credential ID: {cert.credentialId}</div>}
                      {cert.date && <div className="text-xs">Issued: {cert.date}</div>}
                      {cert.expiryDate && <div className="text-xs">Valid until: {cert.expiryDate}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="bg-white text-gray-800 p-6 md:w-2/3 overflow-auto">
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-[#2c5282]">{`${data.name}`}</h1>
              <h2 className="text-xl text-gray-600">{data.designation}</h2>
              <div className="h-px bg-gray-300 w-full my-4"></div>
            </div>

            {/* Work Experience */}
            {experienceCount > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#2c5282] mb-1">WORK EXPERIENCE</h2>
                {data.experience.slice(0, 2).map((exp, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="font-bold text-lg">{exp.company}</h3>
                    <p className="text-sm italic">
                      {exp.title} | {exp.fromYear} – {exp.toYear}
                    </p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projectsCount > 0 && (
              <div className={`mb-4 ${experienceCount === 0 ? "mb-8" : ""}`}>
                <h2 className="text-lg font-bold text-[#2c5282] mb-1">PROJECTS</h2>
                {data.projects.slice(0, 2).map((project, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <p className="text-sm italic">
                      {project.companyName} | {project.startDate} – {project.endDate}
                    </p>
                    <p className="text-sm mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {educationCount > 0 && (
              <div className={`${experienceCount === 0 ? "mb-8" : ""}`}>
                <h2 className="text-lg font-bold text-[#2c5282] mb-1">EDUCATION</h2>
                {data.education.slice(0, 2).map((edu, idx) => (
                  <div key={idx} className="mb-1">
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-sm italic">
                      {edu.institution} | {edu.fromYear} – {edu.toYear}
                    </p>
                    <p className="text-sm">{edu.cgpa}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Hobbies */}
            {(experienceCount < 2 || projectsCount < 2) && hobbiesCount > 2 && (
              <div className={`mb-6 ${experienceCount === 0 ? "mb-8" : ""}`}>
                <h2 className="text-lg font-bold text-[#2c5282] mb-1 mt-6">HOBBIES</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {data.hobbies.slice(0, 4).map((hobby, idx) => (
                    <li key={idx}>{hobby}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
