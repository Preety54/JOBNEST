import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Template4() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
          // Always extract userId from URL
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
      
              // ❌ If resume value doesn't match the current template, show error
              if (userProfile.resume !== templateName) {
                setData({ error: "Resume not found" })
                return
              }
      
              // ✅ Set profile data
              setData({
                education: userProfile.education || [],
                hobbies: userProfile.hobbies || [],
                certifications: userProfile.certifications || [],
                skills: userProfile.skills || [],
                experience: userProfile.experience || [],
                projects: userProfile.projects || [],
              })
      
              // Optionally get token for isOwner logic
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
      
              // ✅ Set main data
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
            resume: "", // Clear the resume
          })
      
          if (response.data.success) {
            window.location.reload() // 🔄 Refresh the page
          }
        } catch (err) {
          console.error("Error removing template:", err)
          alert("Failed to remove template")
        }
      }
      
      
    
      // Loading state or error state
      if (!data) {
        return <div className="text-center p-10 text-gray-600">Loading profile...</div>
      }
    
      if (data.error) {
        return <div className="text-center p-10 text-red-600">{data.error}</div>
      }

    const {
        name,
        designation,
        imageSrc,
        description,
        skills = [],
        experience = [],
        education = [],
        certifications = [],
        hobbies = [],
    } = data;

    const hasCertifications = certifications.length > 0;
    const showHobbies = !hasCertifications && hobbies.length > 0;

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
        <div className="max-w-3xl mx-auto p-6 bg-[#f8f3eb] min-h-screen relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-16 bg-[#f0e6d9] z-0"></div>
            <div className="absolute left-0 top-80 w-32 h-3/4 bg-[#f0e6d9] z-0"></div>


            <div className="relative pt-16 px-6 z-10">
                {/* Header section with name and photo */}
                <div className="flex justify-between items-center mb-8">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-serif font-normal leading-tight">
                            Hello I&apos;m
                            <br />
                            {name}
                        </h1>
                        <div className="flex items-center mt-2">
                            <h2 className="text-lg font-medium mr-2">{designation}</h2>
                            <div className="h-[1px] bg-black w-[20px] flex-grow"></div>
                        </div>
                    </div>

                    {imageSrc && (
                        <div className="w-[180px] h-[200px] rounded-full overflow-hidden border-4 border-[#f0e6d9] -mt-4">
                            <img
                                src={imageSrc}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Main content */}
                <div className="relative z-10 ml-24">
                    {/* Profile section */}
                    {description && (
                        <section className="mb-8">
                            <h3 className="text-xl font-serif border-b border-black pb-1 mb-3">ABOUT</h3>
                            <p className="text-sm leading-relaxed">{description}</p>
                        </section>
                    )}

                    {/* Skills section */}
                    {skills.length > 0 && (
                        <section className="mb-8">
                            <h3 className="text-xl font-serif border-b border-black pb-1 mb-3">SKILLS</h3>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                                {skills.map((skill, idx) => (
                                    <li key={idx}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Experience section */}
                    {experience.length > 0 && (
                        <section className="mb-8">
                            <h3 className="text-xl font-serif border-b border-black pb-1 mb-3">EXPERIENCE</h3>
                            {experience.map((exp, idx) => (
                                <div key={idx} className="mb-4">
                                    <div className="font-medium">{exp.title} - {exp.company}</div>
                                    <div className="text-sm mb-2">{exp.fromYear} - {exp.toYear}</div>
                                    <ul className="text-sm list-disc pl-5 space-y-1">
                                        {Array.isArray(exp.responsibilities)
                                            ? exp.responsibilities.map((line, i) => <li key={i}>{line}</li>)
                                            : exp.description?.split(". ").map((line, i) => <li key={i}>{line}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Education section */}
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-xl font-serif border-b border-black pb-1 mb-3">EDUCATION</h3>
                            {education.map((edu, idx) => (
                                <div key={idx} className="mb-2">
                                    <div className="font-medium">{edu.degree}</div>
                                    <p className="text-sm leading-relaxed">
                                        {edu.institution} | {edu.fromYear} - {edu.toYear} | CGPA: {edu.cgpa}
                                    </p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Certifications section */}
                    {hasCertifications && (
                        <section className="mt-8">
                            <h3 className="text-xl font-serif border-b border-black pb-1 mb-3">CERTIFICATIONS</h3>
                            {certifications.map((cert, idx) => (
                                <div key={idx} className="mb-2 text-sm">
                                    <div className="font-medium">{cert.name}</div>
                                    <div className="italic">Issued by: {cert.issuer}</div>
                                    {cert.credentialId && <div>Credential ID: {cert.credentialId}</div>}
                                    {cert.date && <div>Issued: {cert.date}</div>}
                                    {cert.expiryDate && <div>Valid Until: {cert.expiryDate}</div>}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Hobbies section if no certifications */}
                    {showHobbies && (
                        <section className="mt-8">
                            <h3 className="text-xl font-serif border-b border-black pb-1 mb-3">HOBBIES</h3>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                                {hobbies.map((hobby, idx) => (
                                    <li key={idx}>{hobby}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
