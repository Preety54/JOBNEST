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

  // Fetch profile from token
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded?.user?.id;
        if (!userId) return;

        const res = await axios.get(`http://localhost:3001/api/profile/user/${userId}`);
        if (res.data.success && res.data.profile) {
          const userProfile = res.data.profile;

          // Set profile data
          setProfile({
            education: userProfile.education || [],
            hobbies: userProfile.hobbies || [],
            certifications: userProfile.certifications || [],
            skills: userProfile.skills || [],
            experience: userProfile.experience || [],
            projects: userProfile.projects || [],
          });

          setData(userProfile);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // Loading state
  if (!data) {
    return <div className="text-center p-10 text-gray-600">Loading profile...</div>;
  }

  // Count values for each array
  const certificationsCount = Array.isArray(data.certifications) ? data.certifications.length : 0;
  const hobbiesCount = Array.isArray(data.hobbies) ? data.hobbies.length : 0;
  const skillsCount = Array.isArray(data.skills) ? data.skills.length : 0;
  const educationCount = Array.isArray(data.education) ? data.education.length : 0;
  const experienceCount = Array.isArray(data.experience) ? data.experience.length : 0;
  const projectsCount = Array.isArray(data.projects) ? data.projects.length : 0;

  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-gray-50 shadow-lg">
      {/* Header Section */}
      <header className="bg-gray-100 py-6 px-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">{`${data.name}`}</h1>
        <p className="text-gray-500 uppercase tracking-wider text-sm mt-1">{data.designation}</p>
        <div className="text-gray-600 text-sm mt-2">
          {data.phone} | {data.location} | {data.email}
        </div>
      </header>

      {/* Summary Section */}
      <section className="bg-gray-300 py-4 px-8">
        <h2 className="text-gray-700 font-medium mb-2 text-center">ABOUT</h2>
        <p className="text-gray-700 text-sm text-center">{data.description}</p>
      </section>

      {/* Main Content */}
      <main className="bg-white px-8 py-6">
        {/* Education Section */}
        {educationCount > 0 && (
          <section className="mb-6">
            <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">EDUCATION</h2>
            {Array.isArray(data.education) &&
              data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-medium">{edu.degree} | {edu.institution}</h3>
                  <p className="text-sm text-gray-600">{edu.fromYear} - {edu.toYear}</p>
                  <p className="text-sm">{edu.cgpa}</p>
                </div>
              ))}
          </section>
        )}

        {/* Experience Section */}
        {experienceCount > 0 && (
          <section className="mb-6">
            <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">EXPERIENCE</h2>
            {Array.isArray(data.experience) &&
              data.experience.map((exp, idx) => (
                <div key={idx}>
                  <h3 className="font-medium">{exp.company}</h3>
                  <p className="text-sm text-gray-600">{exp.title} | {exp.fromYear} - {exp.toYear}</p>
                  <ul className="mt-2 space-y-1">
                    {Array.isArray(exp.responsibilities) &&
                      exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm text-gray-600">- {resp}</li>
                      ))}
                  </ul>
                </div>
              ))}
          </section>
        )}

        {/* Skills Section - Always present */}
        {skillsCount > 0 && (
          <section className="mb-6">
            <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">SKILLS</h2>
            <div className="grid grid-cols-4 gap-y-1">
              {Array.isArray(data.skills) &&
                data.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
            </div>
          </section>
        )}

       {/* Projects - Styled like Education & Experience with Company, Duration, Description */} 
{Array.isArray(data.projects) && data.projects.length > 0 && (
  <div className="mb-8">
    <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
      <h2 className="font-bold">PROJECTS</h2>
    </div>
    <div className="pl-4 space-y-4">
      {data.projects.map((project, index) => (
        <div key={index}>
          {/* Project Name */}
          <h3 className="font-bold text-gray-700 text-lg">{project.name}</h3>

          {/* Company and Duration */}
          {(project.companyName || project.startDate || project.endDate) && (
            <p className="text-sm italic text-gray-600">
              {project.companyName || "Company Not Specified"}{" "}
              {project.startDate && `| ${project.startDate}`}{" "}
              {project.endDate && `– ${project.endDate}`}
            </p>
          )}

          {/* Description */}
          {project.description && (
            <p className="text-sm text-gray-700 mt-1">{project.description}</p>
          )}
        </div>
      ))}
    </div>
  </div>
)}


        {/* Hobbies Section - Conditionally rendered */}
        {(experienceCount === 0 && certificationsCount === 0) || certificationsCount === 0 ? (
          <section>
            <h2 className="text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">HOBBIES</h2>
            <ul className="space-y-1">
              {Array.isArray(data.hobbies) &&
                data.hobbies.map((hobby, idx) => (
                  <li key={idx} className="text-sm">{hobby}</li>
                ))}
            </ul>
          </section>
        ) : null}
      </main>

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
    </div>
  );
};

export default Template3;
