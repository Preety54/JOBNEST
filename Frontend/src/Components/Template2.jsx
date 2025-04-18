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
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded?.user?.id;
        if (!userId) return;

        const res = await axios.get(`http://localhost:3001/api/profile/user/${userId}`);
        if (res.data.success && res.data.profile) {
          setData(res.data.profile);

          // Set counts for different sections
          setCounts({
            educationCount: res.data.profile.education?.length || 0,
            skillsCount: res.data.profile.skills?.length || 0,
            projectsCount: res.data.profile.projects?.length || 0,
            experienceCount: res.data.profile.experience?.length || 0,
            certificationsCount: res.data.profile.certifications?.length || 0,
            hobbiesCount: res.data.profile.hobbies?.length || 0,
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!data) {
    return <div className="text-center p-10 text-gray-600">Loading profile...</div>;
  }

  // Show hobbies if there's no experience or no certifications
  const showHobbies = counts.experienceCount === 0 || counts.certificationsCount === 0;

  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white p-6 shadow-lg">
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

      {counts.experienceCount > 0 ? (
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
      ) : null}

      {counts.certificationsCount > 0 ? (
        <div className="mt-4">
          <h2 className="text-lg font-bold bg-orange-100 text-orange-800 px-2 py-1 mb-2">CERTIFICATIONS</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {data.certifications.slice(0, 2).map((cert, idx) => (
              <li key={idx}>
                <div className="font-semibold">{cert.name}</div>
                <div className="text-xs italic">Issued by: {cert.issuer}</div>
                {cert.credentialId && (
                  <div className="text-xs">Credential ID: {cert.credentialId}</div>
                )}
                {cert.date && <div className="text-xs">Issued: {cert.date}</div>}
                {cert.expiryDate && (
                  <div className="text-xs">Valid until: {cert.expiryDate}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Only show hobbies if there is no experience or no certifications */}
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
          <div className="grid grid-cols-6 gap-x-4 gap-y-2">
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
