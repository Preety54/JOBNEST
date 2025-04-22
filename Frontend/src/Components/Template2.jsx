import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ResumeTemplate = () => {
  const [data, setData] = useState(null);
  const [counts, setCounts] = useState({
    educationCount: 0,
    skillsCount: 0,
    projectsCount: 0,
    experienceCount: 0,
    certificationsCount: 0,
    hobbiesCount: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const pathSegments = window.location.pathname.split("/");
      const templateName = pathSegments[1];
      const pathUserId = pathSegments[pathSegments.length - 1];

      if (!pathUserId) {
        console.error("No userId found in URL");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3001/api/profile/user/${pathUserId}`);
        if (res.data.success && res.data.profile) {
          const userProfile = res.data.profile;

          if (userProfile.resume !== templateName) {
            setData({ error: "Resume not found" });
            return;
          }

          // Set section counts
          setCounts({
            educationCount: userProfile.education?.length || 0,
            skillsCount: userProfile.skills?.length || 0,
            projectsCount: userProfile.projects?.length || 0,
            experienceCount: userProfile.experience?.length || 0,
            certificationsCount: userProfile.certifications?.length || 0,
            hobbiesCount: userProfile.hobbies?.length || 0,
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
      const response = await axios.put(`http://localhost:3001/api/profile/update/${pathUserId}`, {
        ...data,
        resume: "",
      });

      if (response.data.success) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error removing template:", err);
      alert("Failed to remove template");
    }
  };

  if (!data) {
    return <div className="text-center p-10 text-gray-600">Loading profile...</div>;
  }

  if (data.error) {
    return <div className="text-center p-10 text-red-600">{data.error}</div>;
  }

  const showHobbies = counts.experienceCount === 0 || counts.certificationsCount === 0;

  return (
    <div className="relative w-[210mm] h-[297mm] mx-auto bg-white p-6 shadow-lg">
      {data.isOwner && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mb-4">
          <button
            onClick={removeDefaultTemplate}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Remove This Template
          </button>
        </div>
      )}

      <header className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
          <p className="text-orange-500 font-medium">{data.designation || "RESUME"}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end">
            <span className="text-gray-700">{data.phone}</span>
            <span className="text-orange-500 ml-2 font-medium">PHONE •</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-gray-700">{data.location}</span>
            <span className="text-orange-500 ml-2 font-medium">ADDRESS •</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-gray-700">{data.email}</span>
            <span className="text-orange-500 ml-2 font-medium">EMAIL •</span>
          </div>
        </div>
      </header>

      <hr className="border-orange-300 mb-2" />

      <section>
        <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-1 py-1">ABOUT</h2>
        <p className="text-gray-700">{data.description}</p>
      </section>

      {counts.educationCount > 0 && (
        <section className="mt-4">
          <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-1 py-1 mb-2">EDUCATION</h2>
          {data.education.slice(0, 2).map((edu, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-orange-600">{edu.degree}</h3>
              <p className="text-gray-700">{`${edu.fromYear} - ${edu.toYear} | ${edu.institution}`}</p>
              <p className="text-gray-700">
                <span className="font-bold">CGPA:</span> {edu.cgpa}
              </p>
            </div>
          ))}
        </section>
      )}

      {counts.projectsCount > 0 && (
        <section className="mt-4">
          <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-2 py-1 mb-2">PROJECTS</h2>
          {data.projects.slice(0, 1).map((project, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-lg text-orange-600">{project.name}</h3>
              <p className="text-sm italic text-gray-600">
                {project.companyName} | {project.startDate} – {project.endDate}
              </p>
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {counts.experienceCount > 0 && (
        <section className="mt-4">
          <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-2 py-1 mb-2">EXPERIENCE</h2>
          {data.experience.slice(0, 1).map((exp, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-orange-600">{exp.title}</h3>
              <p className="text-gray-700">{`${exp.fromYear} - ${exp.toYear} | ${exp.company}`}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

{counts.certificationsCount > 0 && (
  <div className="mt-4">
    <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-2 py-1 mb-2">CERTIFICATIONS</h2>
    <div className="flex flex-wrap gap-4">
      {data.certifications.slice(0, 2).map((cert, idx) => (
        <div
          key={idx}
          className="flex-1 min-w-[45%] space-y-1 text-sm"
        >
          <div className="font-semibold">{cert.name}</div>
          <div className="text-xs italic">Issued by: {cert.issuer}</div>
          {cert.credentialId && <div className="text-xs">Credential ID: {cert.credentialId}</div>}
          {cert.date && <div className="text-xs">Issued: {cert.date}</div>}
          {cert.expiryDate && <div className="text-xs">Valid until: {cert.expiryDate}</div>}
        </div>
      ))}
    </div>
  </div>
)}



      {showHobbies && counts.hobbiesCount > 0 && (
        <section className="mt-4">
          <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-2 py-1 mb-2">HOBBIES</h2>
          <ul className="list-none">
            {data.hobbies.slice(0, 5).map((hobby, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span className="text-gray-700">{hobby}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {counts.skillsCount > 0 && (
        <section className="mt-4">
          <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-2 py-1 mb-2">SKILLS</h2>
          <div className="grid grid-cols-4 gap-x-4 gap-y-2">
            {data.skills.slice(0, 8).map((skill, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumeTemplate;
