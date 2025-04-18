import { Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ResumeTemplate() {
    const [data, setData] = useState(null);

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
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, []);

    if (!data) return <div className="text-center p-10 text-gray-600">Loading profile...</div>;

    const {
        name,
        email,
        phone,
        address,
        imageSrc,
        designation,
        description,
        skills = [],
        experience = [],
        education = [],
        certifications = [],
        hobbies = [],
    } = data;

    return (
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white shadow-lg">
            {/* Left Column */}
            <div className="w-full md:w-1/3 bg-[#1e3a47] text-white">
                <div className="relative p-6 flex justify-center">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white z-10">
                        <img
                            src={imageSrc || "/placeholder.svg?height=160&width=160"}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#5b8a9a] opacity-50"></div>
                </div>

                {/* Contact */}
                <div className="p-6">
                    <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">CONTACT</div>
                    <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-3">
                            <User size={18} />
                            <span className="text-sm text-gray-300">{name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={18} />
                            <span className="text-sm text-gray-300">{phone || "Not provided"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} />
                            <span className="text-sm text-gray-300">{email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={18} />
                            <span className="text-sm text-gray-300">{address || "Not provided"}</span>
                        </div>
                    </div>
                </div>

                {/* Certifications */}
                {certifications.length > 0 && (
                    <div className="p-6">
                        <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">CERTIFICATIONS</div>
                        <div className="space-y-3 mt-4 text-sm">
                            {certifications.map((cert, index) => (
                                <div key={index}>
                                    <p className="font-semibold">{cert.name}</p>
                                    <p className="italic">Issued by: {cert.issuer}</p>
                                    {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                                    {cert.date && <p>Issued: {cert.date}</p>}
                                    {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="p-6">
                        <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">SKILLS</div>
                        <div className="space-y-3 mt-4">
                            {skills.map((skill, index) => (
                                <div key={index}>
                                    <span>{skill}</span>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="h-2 w-1/5 bg-[#5b8a9a]"></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hobbies (only shown if no certifications) */}
                {certifications.length === 0 && hobbies.length > 0 && (
                    <div className="p-6">
                        <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">HOBBIES</div>
                        <div className="flex justify-center gap-4 mt-4">
                            {hobbies.map((hobby, index) => (
                                <div key={index} className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                    <span>{hobby[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column */}
            <div className="w-full md:w-2/3 bg-white p-6">
                {/* Header */}
                <div className="bg-[#5b8a9a] text-white p-6 rounded-r-full mb-8">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-lg text-gray-200">{designation}</p>
                </div>

                {/* About */}
                {description && (
                    <div className="mb-8">
                        <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
                            {/* <User size={18} /> */}
                            <h2 className="font-bold">ABOUT</h2>
                        </div>
                        <p className="text-gray-600 pl-4">{description}</p>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div className="mb-8">
                        <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
                            <h2 className="font-bold">EDUCATION</h2>
                        </div>
                        <div className="pl-4 space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-gray-700">{edu.degree}</h3>
                                    <p className="text-gray-600">
                                        {edu.institution} | {edu.fromYear} - {edu.toYear} | CGPA: {edu.cgpa}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div className="mb-8">
                        <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
                            <h2 className="font-bold">EXPERIENCE</h2>
                        </div>
                        <div className="pl-4 space-y-4">
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-gray-700">{exp.title} - {exp.company}</h3>
                                    <p className="text-gray-600">{exp.fromYear} - {exp.toYear}</p>
                                    <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                                        {Array.isArray(exp.responsibilities)
                                            ? exp.responsibilities.map((line, i) => <li key={i}>{line}</li>)
                                            : exp.description?.split(". ").map((line, i) => <li key={i}>{line}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
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




            </div>
        </div>
    );
}
