// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-200 py-10 px-6">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
//         {/* 🔹 Left Section - About */}
//         <div className="w-full md:w-1/3">
//           <h2 className="text-xl font-bold text-gray-800 mb-3">About JobNest</h2>
//           <p className="text-gray-600">
//             JobNest is your gateway to thousands of job opportunities across various industries. Connect with top recruiters and build your dream career with us.
//           </p>
//         </div>

//         {/* 🔹 Right Section - Links */}
//         <div className="w-full md:w-2/3 grid grid-cols-3 gap-6">
          
//           {/* 🔹 Useful Links */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-800 mb-3">Useful Links</h3>
//             <ul className="space-y-2">
//               <li className="text-blue-600 cursor-pointer hover:underline">Find a Job</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">About Us</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Companies</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Post a Job</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Testimonials</li>
//             </ul>
//           </div>

//           {/* 🔹 Categories */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-800 mb-3">Categories</h3>
//             <ul className="space-y-2">
//               <li className="text-blue-600 cursor-pointer hover:underline">UI Developer</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">UX Developer</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Graphic Designer</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Web Developer</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">More..</li>
//             </ul>
//           </div>

//           {/* 🔹 Follow Us */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-800 mb-3">Follow Us</h3>
//             <ul className="space-y-2">
//               <li className="text-blue-600 cursor-pointer hover:underline">LinkedIn</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Twitter</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Facebook</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Instagram</li>
//               <li className="text-blue-600 cursor-pointer hover:underline">Dribbble</li>
//             </ul>
//           </div>

//         </div>

//       </div>

//       {/* 🔹 Divider Line */}
//       <hr className="border-t border-gray-600 my-6" />

//       {/* 🔹 Copyright Text */}
//       <p className="text-center text-gray-600 text-sm">
//         © Copyright 2025 by COMPLIT. All Rights Reserved.
//       </p>

//     </footer>
//   );
// };

// export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        {/* 🔹 Left Section - About */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-3">About JobNest</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            JobNest is your gateway to thousands of job opportunities across various industries. 
            Connect with top recruiters and build your dream career with us.
          </p>
        </div>

        {/* 🔹 Right Section - Links */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* 🔹 Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Useful Links</h3>
            <ul className="space-y-2">
              <li className="text-blue-600 cursor-pointer hover:underline">Find a Job</li>
              <li className="text-blue-600 cursor-pointer hover:underline">About Us</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Companies</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Post a Job</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Testimonials</li>
            </ul>
          </div>

          {/* 🔹 Categories */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Categories</h3>
            <ul className="space-y-2">
              <li className="text-blue-600 cursor-pointer hover:underline">UI Developer</li>
              <li className="text-blue-600 cursor-pointer hover:underline">UX Developer</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Graphic Designer</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Web Developer</li>
              <li className="text-blue-600 cursor-pointer hover:underline">More..</li>
            </ul>
          </div>

          {/* 🔹 Follow Us */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Follow Us</h3>
            <ul className="space-y-2">
              <li className="text-blue-600 cursor-pointer hover:underline">LinkedIn</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Twitter</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Facebook</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Instagram</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Dribbble</li>
            </ul>
          </div>

        </div>

      </div>

      {/* 🔹 Divider Line */}
      <hr className="border-t border-gray-400 my-6 mx-auto w-11/12" />

      {/* 🔹 Copyright Text */}
      <p className="text-center text-gray-600 text-sm">
        © 2025 JobNest. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;
