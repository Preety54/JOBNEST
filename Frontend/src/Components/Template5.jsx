// import { Mail, MapPin, Phone, User } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// export default function ResumeTemplate() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             // Always extract userId from URL
//             const pathSegments = window.location.pathname.split("/")
//             const templateName = pathSegments[1]
//             const pathUserId = pathSegments[pathSegments.length - 1]

//             if (!pathUserId) {
//                 console.error("No userId found in URL")
//                 return
//             }

//             try {
//                 const res = await axios.get(`http://localhost:3001/api/profile/user/${pathUserId}`)
//                 if (res.data.success && res.data.profile) {
//                     const userProfile = res.data.profile

//                     // ❌ If resume value doesn't match the current template, show error
//                     if (userProfile.resume !== templateName) {
//                         setData({ error: "Resume not found" })
//                         return
//                     }

//                     // ✅ Set profile data
//                     setData({
//                         education: userProfile.education || [],
//                         hobbies: userProfile.hobbies || [],
//                         certifications: userProfile.certifications || [],
//                         skills: userProfile.skills || [],
//                         experience: userProfile.experience || [],
//                         projects: userProfile.projects || [],
//                     })

//                     // Optionally get token for isOwner logic
//                     const token = localStorage.getItem("authToken")
//                     let isOwner = false
//                     if (token) {
//                         try {
//                             const decoded = jwtDecode(token)
//                             const tokenUserId = decoded?.user?.id
//                             isOwner = tokenUserId === pathUserId
//                         } catch (err) {
//                             console.error("Error decoding token:", err)
//                         }
//                     }

//                     // ✅ Set main data
//                     setData({
//                         ...userProfile,
//                         isOwner,
//                     })
//                 }
//             } catch (err) {
//                 console.error("Error fetching profile:", err)
//             }
//         }

//         fetchProfile()
//     }, [])

//     const removeDefaultTemplate = async () => {
//         const pathSegments = window.location.pathname.split("/")
//         const pathUserId = pathSegments[pathSegments.length - 1]

//         if (!pathUserId) return

//         try {
//             const response = await axios.put(`http://localhost:3001/api/profile/update/${pathUserId}`, {
//                 ...data,
//                 resume: "", // Clear the resume
//             })

//             if (response.data.success) {
//                 window.location.reload() // 🔄 Refresh the page
//             }
//         } catch (err) {
//             console.error("Error removing template:", err)
//             alert("Failed to remove template")
//         }
//     }



//     // Loading state or error state
//     if (!data) {
//         return <div className="text-center p-10 text-gray-600">Loading profile...</div>
//     }

//     if (data.error) {
//         return <div className="text-center p-10 text-red-600">{data.error}</div>
//     }

//     const {
//         name,
//         email,
//         phone,
//         address,
//         imageSrc,
//         designation,
//         description,
//         skills = [],
//         experience = [],
//         education = [],
//         certifications = [],
//         hobbies = [],
//     } = data;

//     return (
//         <>
//             {data?.isOwner && (
//                 <div className="w-full bg-gray-100 p-4 text-center">
//                     <button
//                         onClick={removeDefaultTemplate}
//                         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Remove this template as default
//                     </button>
//                 </div>
//             )}
//             <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white shadow-lg">
//                 {/* Left Column */}
//                 <div className="w-full md:w-1/3 bg-[#1e3a47] text-white">
//                     <div className="relative p-6 flex justify-center">
//                         <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white z-10">
//                             <img
//                                 src={imageSrc || "/placeholder.svg?height=160&width=160"}
//                                 alt="Profile"
//                                 className="object-cover w-full h-full"
//                             />
//                         </div>
//                         <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#5b8a9a] opacity-50"></div>
//                     </div>

//                     {/* Contact */}
//                     <div className="p-6">
//                         <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">CONTACT</div>
//                         <div className="space-y-3 mt-4">
//                             <div className="flex items-center gap-3">
//                                 <User size={18} />
//                                 <span className="text-sm text-gray-300">{name}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Phone size={18} />
//                                 <span className="text-sm text-gray-300">{phone || "Not provided"}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Mail size={18} />
//                                 <span className="text-sm text-gray-300">{email}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <MapPin size={18} />
//                                 <span className="text-sm text-gray-300">{address || "Not provided"}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Certifications */}
//                     {certifications.length > 0 && (
//                         <div className="p-6">
//                             <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">CERTIFICATIONS</div>
//                             <div className="space-y-3 mt-4 text-sm">
//                                 {certifications.map((cert, index) => (
//                                     <div key={index}>
//                                         <p className="font-semibold">{cert.name}</p>
//                                         <p className="italic">Issued by: {cert.issuer}</p>
//                                         {cert.credentialId && <p>ID: {cert.credentialId}</p>}
//                                         {cert.date && <p>Issued: {cert.date}</p>}
//                                         {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Skills */}
//                     {skills.length > 0 && (
//                         <div className="p-6">
//                             <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">SKILLS</div>
//                             <div className="space-y-3 mt-4">
//                                 {skills.map((skill, index) => (
//                                     <div key={index}>
//                                         <span>{skill}</span>
//                                         <div className="flex gap-1 mt-1">
//                                             {[...Array(5)].map((_, i) => (
//                                                 <div key={i} className="h-2 w-1/5 bg-[#5b8a9a]"></div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Hobbies (only shown if no certifications) */}
//                     {/* HOBBIES in LEFT column if NO certifications */}
//                     {certifications.length === 0 && hobbies.length > 0 && (
//                         <div className="p-6">
//                             <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">HOBBIES</div>
//                             <div className="flex justify-center gap-4 mt-4 flex-wrap">
//                                 {hobbies.map((hobby, index) => (
//                                     <div key={index} className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
//                                         <span>{hobby[0]}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                 </div>

//                 {/* Right Column */}
//                 <div className="w-full md:w-2/3 bg-white p-6">
//                     {/* Header */}
//                     <div className="bg-[#5b8a9a] text-white p-6 rounded-r-full mb-8">
//                         <h1 className="text-3xl font-bold">{name}</h1>
//                         <p className="text-lg text-gray-200">{designation}</p>
//                     </div>

//                     {/* About */}
//                     {description && (
//                         <div className="mb-8">
//                             <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
//                                 {/* <User size={18} /> */}
//                                 <h2 className="font-bold">ABOUT</h2>
//                             </div>
//                             <p className="text-gray-600 pl-4">{description}</p>
//                         </div>
//                     )}

//                     {/* Education */}
//                     {education.length > 0 && (
//                         <div className="mb-8">
//                             <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
//                                 <h2 className="font-bold">EDUCATION</h2>
//                             </div>
//                             <div className="pl-4 space-y-4">
//                                 {education.map((edu, index) => (
//                                     <div key={index}>
//                                         <h3 className="font-bold text-gray-700">{edu.degree}</h3>
//                                         <p className="text-gray-600">
//                                             {edu.institution} | {edu.fromYear} - {edu.toYear} | CGPA: {edu.cgpa}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Experience */}
//                     {/* Experience */}
//                     <div className="mb-8">
//                         <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
//                             <h2 className="font-bold">EXPERIENCE</h2>
//                         </div>
//                         <div className="pl-4 space-y-4">
//                             {experience.length > 0 ? (
//                                 experience.map((exp, index) => (
//                                     <div key={index}>
//                                         <h3 className="font-bold text-gray-700">{exp.title} - {exp.company}</h3>
//                                         <p className="text-gray-600">{exp.fromYear} - {exp.toYear}</p>
//                                         <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
//                                             {Array.isArray(exp.responsibilities)
//                                                 ? exp.responsibilities.map((line, i) => <li key={i}>{line}</li>)
//                                                 : exp.description?.split(". ").map((line, i) => <li key={i}>{line}</li>)
//                                             }
//                                         </ul>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500 italic">No experience added yet.</p>
//                             )}
//                         </div>
//                     </div>


//                     {/* Projects - Styled like Education & Experience with Company, Duration, Description */}
//                     {Array.isArray(data.projects) && data.projects.length > 0 && (
//                         <div className="mb-8">
//                             <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
//                                 <h2 className="font-bold">PROJECTS</h2>
//                             </div>
//                             <div className="pl-4 space-y-4">
//                                 {data.projects.map((project, index) => (
//                                     <div key={index}>
//                                         {/* Project Name */}
//                                         <h3 className="font-bold text-gray-700 text-lg">{project.name}</h3>

//                                         {/* Company and Duration */}
//                                         {(project.companyName || project.startDate || project.endDate) && (
//                                             <p className="text-sm italic text-gray-600">
//                                                 {project.companyName || "Company Not Specified"}{" "}
//                                                 {project.startDate && `| ${project.startDate}`}{" "}
//                                                 {project.endDate && `– ${project.endDate}`}
//                                             </p>
//                                         )}

//                                         {/* Description */}
//                                         {project.description && (
//                                             <p className="text-sm text-gray-700 mt-1">{project.description}</p>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* HOBBIES in RIGHT column if certifications exist */}
//                     {certifications.length > 0 && hobbies.length > 0 && (
//                         <div className="mb-8">
//                             <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2 flex items-center gap-2">
//                                 <h2 className="font-bold">HOBBIES</h2>
//                             </div>
//                             <div className="list-disc list-inside pl-4 text-sm text-gray-700">
//                                 {hobbies.map((hobby, index) => (
//                                     <div key={index} className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
//                                         <span>{hobby[0]}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                 </div>
//             </div>
//         </>
//     );
// }


import { Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ResumeTemplate() {
    const [data, setData] = useState(null);

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

                    {/* Hobbies in Left Column (if no certifications) */}
                    {certifications.length === 0 && hobbies.length > 0 && (
                        <div className="p-6">
                            <div className="bg-[#5b8a9a] py-2 px-4 rounded-md mb-4 text-center font-bold text-lg">HOBBIES</div>
                            <ul className="list-disc list-inside text-sm text-gray-300">
                                {hobbies.map((hobby, index) => (
                                    <li key={index}>{hobby}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="w-full md:w-2/3 bg-white p-6">
                    <div className="bg-[#5b8a9a] text-white p-6 rounded-r-full mb-8">
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <p className="text-lg text-gray-200">{designation}</p>
                    </div>

                    {description && (
                        <div className="mb-8">
                            <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2">
                                <h2 className="font-bold">ABOUT</h2>
                            </div>
                            <p className="text-gray-600 pl-4">{description}</p>
                        </div>
                    )}

                    {education.length > 0 && (
                        <div className="mb-8">
                            <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2">
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

                    <div className="mb-8">
                        <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2">
                            <h2 className="font-bold">EXPERIENCE</h2>
                        </div>
                        <div className="pl-4 space-y-4">
                            {experience.length > 0 ? (
                                experience.map((exp, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-700">{exp.title} - {exp.company}</h3>
                                        <p className="text-gray-600">{exp.fromYear} - {exp.toYear}</p>
                                        <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                                            {Array.isArray(exp.responsibilities)
                                                ? exp.responsibilities.map((line, i) => <li key={i}>{line}</li>)
                                                : exp.description?.split(". ").map((line, i) => <li key={i}>{line}</li>)
                                            }
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No experience added yet.</p>
                            )}
                        </div>
                    </div>

                    {Array.isArray(data.projects) && data.projects.length > 0 && (
                        <div className="mb-8">
                            <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2">
                                <h2 className="font-bold">PROJECTS</h2>
                            </div>
                            <div className="pl-4 space-y-4">
                                {data.projects.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-700 text-lg">{project.name}</h3>
                                        {(project.companyName || project.startDate || project.endDate) && (
                                            <p className="text-sm font-semibold text-gray-700">
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


                    {/* Hobbies in Right Column (if certifications exist) */}
                    {certifications.length > 0 && hobbies.length > 0 && (
                        <div className="mb-8">
                            <div className="bg-[#5b8a9a] text-white py-2 px-6 rounded-r-full inline-block mb-2">
                                <h2 className="font-bold">HOBBIES</h2>
                            </div>
                            <ul className="list-disc list-inside pl-4 text-sm text-gray-700">
                                {hobbies.map((hobby, index) => (
                                    <li key={index}>{hobby}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
