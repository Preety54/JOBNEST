// import React from "react";
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import contactImage from "../assets/contact.jpg"; // Add your image path

// const ContactUs = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="max-w-5xl w-full bg-blue-100 shadow-lg rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center">
//         {/* Image Section */}
//         <div className="w-full md:w-1/2">
//           <img 
//             src={contactImage} 
//             alt="Contact Us" 
//             className="w-full h-auto rounded-lg"
//           />
//         </div>

//         {/* Contact Details & Form Section */}
//         <div className="w-full md:w-1/2 p-6">
//           <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Contact Us</h2>
          
//           <div className="space-y-6 mb-6">
//             <div className="flex items-center space-x-4">
//               <FaMapMarkerAlt className="text-blue-500 text-2xl" />
//               <p className="text-gray-700">123, Tech Park, Jobnest HQ, India</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <FaPhoneAlt className="text-blue-500 text-2xl" />
//               <p className="text-gray-700">+91 98765 43210</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <FaEnvelope className="text-blue-500 text-2xl" />
//               <p className="text-gray-700">support@jobnest.com</p>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <textarea
//               placeholder="Your Message"
//               rows="4"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             ></textarea>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactImage from "../assets/contact.jpg"; // Add your image path

const ContactUs = () => {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-6 mt-12">
      <div className="max-w-5xl w-full bg-blue-100 shadow-lg rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center h-[80vh]">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img 
            src={contactImage} 
            alt="Contact Us" 
            className="w-full h-[480px] rounded-lg"
          />
        </div>

        {/* Contact Details & Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Contact Us</h2>
          
          <div className="space-y-6 mb-6">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-2xl" />
              <p className="text-gray-700">123, Tech Park, Jobnest HQ, India</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-blue-500 text-2xl" />
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-2xl" />
              <p className="text-gray-700">support@jobnest.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;


