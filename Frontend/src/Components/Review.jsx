// import React from "react";
// import person1 from "../assets/sid.png"; // Replace with actual images
// import person2 from "../assets/Sradha.png";
// import person3 from "../assets/Sam.webp";

// const reviews = [
//   {
//     image: person1,
//     name: "Amit Sharma",
//     designation: "Software Engineer, Google",
//     review:
//       "JobNest helped me land my dream job effortlessly! The process was smooth and efficient.",
//   },
//   {
//     image: person2,
//     name: "Priya Verma",
//     designation: "Marketing Manager, Amazon",
//     review:
//       "A great platform for job seekers! I found the perfect role within days of registering.",
//   },
//   {
//     image: person3,
//     name: "Ragini Mehta",
//     designation: "Data Analyst, Microsoft",
//     review:
//       "Highly recommended! JobNest connects you with top recruiters and amazing opportunities.",
//   },
// ];

// const Review = () => {
//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
//       {/* 🔹 Headings */}
//       <p className="text-blue-600 text-2xl text-center font-semibold">Client Testimonials</p>
//       <h2 className="text-4xl font-bold text-center mb-10 mt-2">
//         What Job Holders Say About Us
//       </h2>

//       {/* 🔹 Review Cards Section */}
//       <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
//         {reviews.map((review, index) => (
//           <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col w-full h-64">
            
//             {/* 🔹 Job Holder Info (Image + Name + Designation) */}
//             <div className="flex items-center gap-4 mb-4">
//               {/* 🔹 Profile Image */}
//               <img
//                 src={review.image}
//                 alt={review.name}
//                 className="w-14 h-16 rounded-full object-cover"
//               />
              
//               {/* 🔹 Name & Designation (Flex Column) */}
//               <div className="flex flex-col">
//                 <h3 className="text-xl font-bold">{review.name}</h3>
//                 <span className="text-gray-500 text-sm">{review.designation}</span>
//               </div>
//             </div>

//             {/* 🔹 Testimonial Text */}
//             <p className="text-gray-600 text-2xl  italic font-semibold">{review.review}</p>

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Review;

import React from "react";
import person1 from "../assets/sid.png"; // Replace with actual images
import person2 from "../assets/Sradha.png";
import person3 from "../assets/Sam.webp";

const reviews = [
  {
    image: person1,
    name: "Amit Sharma",
    designation: "Software Engineer, Google",
    review:
      "JobNest helped me land my dream job effortlessly! The process was smooth and efficient.",
  },
  {
    image: person2,
    name: "Priya Verma",
    designation: "Marketing Manager, Amazon",
    review:
      "A great platform for job seekers! I found the perfect role within days of registering.",
  },
  {
    image: person3,
    name: "Ragini Mehta",
    designation: "Data Analyst, Microsoft",
    review:
      "Highly recommended! JobNest connects you with top recruiters and amazing opportunities.",
  },
];

const Review = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      
      {/* 🔹 Headings */}
      <p className="text-blue-600 text-lg sm:text-xl md:text-2xl text-center font-semibold">
        Client Testimonials
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 mt-2">
        What Job Holders Say About Us
      </h2>

      {/* 🔹 Responsive Grid for Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col w-full h-auto">
            
            {/* 🔹 Job Holder Info (Image + Name + Designation) */}
            <div className="flex items-center gap-4 mb-4">
              {/* 🔹 Profile Image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              
              {/* 🔹 Name & Designation (Flex Column) */}
              <div className="flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold">{review.name}</h3>
                <span className="text-gray-500 text-sm sm:text-base">{review.designation}</span>
              </div>
            </div>

            {/* 🔹 Testimonial Text */}
            <p className="text-gray-600 text-sm sm:text-lg italic font-semibold">
              {review.review}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Review;
