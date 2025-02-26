// import React from "react";
// import company1 from "../assets/google.png"; // Example company logos
// import company2 from "../assets/Amazon.png";

// const Jobs = () => {
//   const jobsData = [
//     {
//       logo: company1,
//       position: "Software Engineer",
//       qualification: "B.Tech / MCA",
//       stipend: "₹40,000/month",
//       location: "Bangalore, India",
//       city: "Bangalore",
//       posted: "1 day ago",
//       jobType: "Full-time",
//     },
//     {
//       logo: company2,
//       position: "Marketing Specialist",
//       qualification: "MBA",
//       stipend: "₹35,000/month",
//       location: "Mumbai, India",
//       city: "Mumbai",
//       posted: "2 days ago",
//       jobType: "Part-time",
//     },
//     {
//       logo: company1,
//       position: "Graphic Designer",
//       qualification: "B.Des",
//       stipend: "₹25,000/month",
//       location: "Delhi, India",
//       city: "Delhi",
//       posted: "3 days ago",
//       jobType: "Full-time",
//     },
//     {
//       logo: company2,
//       position: "Data Analyst",
//       qualification: "B.Sc / M.Sc",
//       stipend: "₹45,000/month",
//       location: "Hyderabad, India",
//       city: "Hyderabad",
//       posted: "5 days ago",
//       jobType: "Full-time",
//     },
//     {
//       logo: company1,
//       position: "Content Writer",
//       qualification: "BA English / Journalism",
//       stipend: "₹20,000/month",
//       location: "Chennai, India",
//       city: "Chennai",
//       posted: "6 days ago",
//       jobType: "Part-time",
//     },
//     {
//       logo: company2,
//       position: "HR Executive",
//       qualification: "MBA HR",
//       stipend: "₹30,000/month",
//       location: "Pune, India",
//       city: "Pune",
//       posted: "1 week ago",
//       jobType: "Full-time",
//     },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
//       {/* 🔹 Headings */}
//       <p className="text-blue-600 text-2xl text-center">Latest Job Openings</p>
//       <h2 className="text-4xl font-bold text-center mb-10 mt-2">Find The Perfect Job You Deserve</h2>

//       {/* 🔹 Job Cards Section (Two Rows of Three Cards) */}
//       <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
        
//         {jobsData.map((job, index) => (
//           <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full h-56">
            
//             {/* 🔹 Top Section */}
//             <div className="flex justify-between items-start">
              
//               {/* 🔹 Company Logo */}
//               <div className="w-14 h-14 rounded-full overflow-hidden">
//                 <img src={job.logo} alt="Company Logo" className="w-full h-full object-cover" />
//               </div>

//              {/* 🔹 Job Details (Right Side) */}
// <div className="flex flex-row items-center gap-4">
//   <span className="text-gray-500 text-sm">{job.posted}</span>
//   <span className="text-blue-600 text-sm font-semibold">{job.jobType}</span>
// </div>

//             </div>

//             {/* 🔹 Job Information */}
//             <h3 className="text-xl font-bold mt-4">{job.position}</h3>
//             <p className="text-sm text-gray-600">Qualification: {job.qualification}</p>
//             <p className="text-sm text-gray-600">Stipend: {job.stipend}</p>
//             <p className="text-sm text-gray-600">Location: {job.location}</p>
//             <p className="text-sm text-gray-600">City: {job.city}</p>
            

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// };

// export default Jobs;


import React from "react";
import company1 from "../assets/google.png"; // Example company logos
import company2 from "../assets/Amazon.png";

const Jobs = () => {
  const jobsData = [
    {
      logo: company1,
      position: "Software Engineer",
      qualification: "B.Tech / MCA",
      stipend: "₹40,000/month",
      location: "Bangalore, India",
      city: "Bangalore",
      posted: "1 day ago",
      jobType: "Full-time",
    },
    {
      logo: company2,
      position: "Marketing Specialist",
      qualification: "MBA",
      stipend: "₹35,000/month",
      location: "Mumbai, India",
      city: "Mumbai",
      posted: "2 days ago",
      jobType: "Part-time",
    },
    {
      logo: company1,
      position: "Graphic Designer",
      qualification: "B.Des",
      stipend: "₹25,000/month",
      location: "Delhi, India",
      city: "Delhi",
      posted: "3 days ago",
      jobType: "Full-time",
    },
    {
      logo: company2,
      position: "Data Analyst",
      qualification: "B.Sc / M.Sc",
      stipend: "₹45,000/month",
      location: "Hyderabad, India",
      city: "Hyderabad",
      posted: "5 days ago",
      jobType: "Full-time",
    },
    {
      logo: company1,
      position: "Content Writer",
      qualification: "BA English / Journalism",
      stipend: "₹20,000/month",
      location: "Chennai, India",
      city: "Chennai",
      posted: "6 days ago",
      jobType: "Part-time",
    },
    {
      logo: company2,
      position: "HR Executive",
      qualification: "MBA HR",
      stipend: "₹30,000/month",
      location: "Pune, India",
      city: "Pune",
      posted: "1 week ago",
      jobType: "Full-time",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
      {/* 🔹 Headings */}
      <p className="text-blue-600 text-lg sm:text-xl md:text-2xl text-center">
        Latest Job Openings
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 mt-2">
        Find The Perfect Job You Deserve
      </h2>

      {/* 🔹 Responsive Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {jobsData.map((job, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full h-auto">
            
            {/* 🔹 Top Section */}
            <div className="flex justify-between items-start">
              
              {/* 🔹 Company Logo */}
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src={job.logo} alt="Company Logo" className="w-full h-full object-cover" />
              </div>

              {/* 🔹 Job Details (Right Side) */}
              <div className="flex flex-row items-center gap-4">
                <span className="text-gray-500 text-sm">{job.posted}</span>
                <span className="text-blue-600 text-sm font-semibold">{job.jobType}</span>
              </div>
            </div>

            {/* 🔹 Job Information */}
            <h3 className="text-lg sm:text-xl font-bold mt-4">{job.position}</h3>
            <p className="text-sm sm:text-base text-gray-600">Qualification: {job.qualification}</p>
            <p className="text-sm sm:text-base text-gray-600">Stipend: {job.stipend}</p>
            <p className="text-sm sm:text-base text-gray-600">Location: {job.location}</p>
            <p className="text-sm sm:text-base text-gray-600">City: {job.city}</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Jobs;
