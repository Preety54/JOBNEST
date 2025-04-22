import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Template3 = () => {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState({
    education: [],
    hobbies: [],
    certifications: [],
    skills: [],
    experience: [],
    projects: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const pathSegments = window.location.pathname.split("/");
      const templateName = pathSegments[1];
      const pathUserId = pathSegments[pathSegments.length - 1];

      if (!pathUserId) return;

      try {
        const res = await axios.get(
          `http://localhost:3001/api/profile/user/${pathUserId}`
        );
        if (res.data.success && res.data.profile) {
          const userProfile = res.data.profile;

          if (userProfile.resume !== templateName) {
            setData({ error: "Resume not found" });
            return;
          }

          setProfile({
            education: userProfile.education || [],
            hobbies: userProfile.hobbies || [],
            certifications: userProfile.certifications || [],
            skills: userProfile.skills || [],
            experience: userProfile.experience || [],
            projects: userProfile.projects || [],
          });

          const token = localStorage.getItem("authToken");
          let isOwner = false;
          if (token) {
            try {
              const decoded = jwtDecode(token);
              const tokenUserId = decoded?.user?.id;
              isOwner = tokenUserId === pathUserId;
            } catch (err) {
              console.error("Error decoding token:", err);
            }
          }

          setData({
            ...userProfile,
            isOwner,
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const removeDefaultTemplate = async () => {
    const pathSegments = window.location.pathname.split("/");
    const pathUserId = pathSegments[pathSegments.length - 1];
    if (!pathUserId) return;

    try {
      const response = await axios.put(
        `http://localhost:3001/api/profile/update/${pathUserId}`,
        {
          ...data,
          resume: "",
        }
      );
      if (response.data.success) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error removing template:", err);
      alert("Failed to remove template");
    }
  };

  if (!data) return <div className="text-center p-10 text-gray-600">Loading profile...</div>;
  if (data.error) return <div className="text-center p-10 text-red-600">{data.error}</div>;

  const certificationsCount = data.certifications?.length || 0;
  const hobbiesCount = data.hobbies?.length || 0;
  const skillsCount = data.skills?.length || 0;
  const educationCount = data.education?.length || 0;
  const experienceCount = data.experience?.length || 0;
  const projectsCount = data.projects?.length || 0;

  return (
    <>
      {/* Remove Button on top center */}
      {data?.isOwner && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={removeDefaultTemplate}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow"
          >
            Remove this template as default
          </button>
        </div>
      )}

      <div className="w-[210mm] h-[297mm] mx-auto bg-gray-50 shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-gray-100 py-6 px-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">{data.name}</h1>
          <p className="text-gray-500 uppercase tracking-wider text-sm mt-1">{data.designation}</p>
          <div className="text-gray-600 text-sm mt-2">
            {data.phone} | {data.location} | {data.email}
          </div>
        </header>

        {/* About */}
        <section className="bg-gray-300 py-4 px-8">
          <h2 className="text-gray-700 font-medium mb-2 text-2xl text-center">ABOUT</h2>
          <p className="text-gray-700 text-sm text-center">{data.description}</p>
        </section>

        {/* Main Content */}
        <main className="bg-white px-8 py-6">
          {/* Education */}
          {educationCount > 0 && (
            <section className="mb-6">
              <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">EDUCATION</h2>
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-medium">{edu.degree} | {edu.institution}</h3>
                  <p className="text-sm text-gray-600">{edu.fromYear} - {edu.toYear}</p>
                  <p className="text-sm">{edu.cgpa}</p>
                </div>
              ))}
            </section>
          )}

          {/* Experience */}
          {experienceCount > 0 && data.experience.length > 0 ? (
            <section className="mb-6">
              <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">EXPERIENCE</h2>
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <h3 className="font-medium">{exp.company}</h3>
                  <p className="text-sm text-gray-600">{exp.title} | {exp.fromYear} - {exp.toYear}</p>
                  <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </section>
          ) : (
            <p className="text-gray-600">No experience data available.</p>
          )}



          {/* Skills */}
          {skillsCount > 0 && (
            <section className="mb-6">
              <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">SKILLS</h2>
              <div className="grid grid-cols-4 gap-y-1">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projectsCount > 0 && (
            <div className="mb-8">
              <div className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">
                <h2 className="font-bold">PROJECTS</h2>
              </div>
              <div className="pl-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="mb-5">
                    <h3 className="font-bold text-gray-700 text-lg">{project.name}</h3>
                    {(project.companyName || project.startDate || project.endDate) && (
                      <p className="text-sm italic text-gray-600">
                        {project.companyName || "Company Not Specified"}{" "}
                        {project.startDate && `| ${project.startDate}`}{" "}
                        {project.endDate && `– ${project.endDate}`}
                      </p>
                    )}
                    {project.description && (
                      <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies (conditionally shown based on logic) */}
          {((experienceCount === 1 && projectsCount === 1) || (experienceCount === 0 && projectsCount === 2)) && hobbiesCount > 0 && (
            <section>
              <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">HOBBIES</h2>
              <ul className="space-y-1">
                {data.hobbies.map((hobby, idx) => (
                  <li key={idx} className="text-sm">{hobby}</li>
                ))}
              </ul>
            </section>
          )}

        </main>
      </div>

      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .w-[210mm] {
            width: 210mm;
          }
          .h-[297mm] {
            height: 297mm;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Template3;

