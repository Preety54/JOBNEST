// // import React from "react";
// // import { Link } from "react-router-dom";
// // import bg1 from "../assets/bg1.jpg"; // ✅ Importing the image

// // const Login = () => {
// //   return (
// //     <div
// //       className="w-full h-screen bg-cover bg-center flex items-center justify-center px-4"
// //       style={{ backgroundImage: `url(${bg1})` }} // ✅ Fixed background image
// //     >
// //       {/* Login Form Container */}
// //       <div className="bg-black p-6 sm:p-8 rounded-lg w-full max-w-md sm:w-[400px] md:w-[450px] lg:w-[500px] h-auto flex flex-col items-center shadow-lg">
        
// //         {/* Login Heading Inside the Container */}
// //         <h2 className="text-white text-2xl font-bold mb-6 sm:mb-4">Login</h2>

// //         {/* Input Fields */}
// //         <input
// //           type="text"
// //           placeholder="Enter your text"
// //           className="w-full h-12 sm:h-10 p-3 mb-4 rounded-3xl bg-white text-black"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Enter your password here"
// //           className="w-full h-12 sm:h-10 p-3 mb-4 rounded-3xl bg-white text-black"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Confirm password"
// //           className="w-full h-12 sm:h-10 p-3 mb-4 rounded-3xl bg-white text-black"
// //         />

// //         {/* Login Button */}
// //         <div className="w-full flex justify-center">
// //           <button className="bg-blue-400 text-white px-6 py-2 rounded-3xl hover:bg-blue-500 w-1/2 sm:w-[40%] text-center">
// //             Login
// //           </button>
// //         </div>

// //         {/* Admin Navigation */}
// //         <p className="text-sm text-white mt-4">
// //           Are you an admin?{" "}
// //           <Link to="/admin-login" className="text-blue-400 font-semibold">
// //             Admin Login
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import React from "react";
// import { Link } from "react-router-dom";
// import bg1 from "../assets/bg1.jpg"; // ✅ Importing the background image

// const Login = () => {
//   return (
//     <div
//       className="w-full h-screen flex items-center justify-center px-4 bg-cover bg-center"
//       style={{ backgroundImage: `url(${bg1})` }} // ✅ Background image applied
//     >
//       {/* Login Form Container */}
//       <div className="bg-black p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col items-center shadow-lg">
        
//         {/* Login Heading */}
//         <h2 className="text-white text-3xl font-bold mb-6">Login</h2>

//         {/* Input Fields */}
//         <input
//           type="text"
//           placeholder="Enter your username"
//           className="w-full h-12 p-3 mb-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="password"
//           placeholder="Enter your password"
//           className="w-full h-12 p-3 mb-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="password"
//           placeholder="Confirm password"
//           className="w-full h-12 p-3 mb-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         {/* Login Button */}
//         <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all w-2/3 sm:w-1/2 text-lg font-semibold">
//           Login
//         </button>

//         {/* Admin Navigation */}
//         <p className="text-sm text-white mt-4">
//           Are you an admin?{" "}
//           <Link to="/admin-login" className="text-blue-400 font-semibold hover:underline">
//             Admin Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React from "react";
import { Link } from "react-router-dom";
import bg1 from "../assets/bg1.jpg"; // ✅ Import background image

const Login = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg1})` }} // ✅ Background image applied
    >
      {/* ✅ Standardized Form Container */}
      <div className="bg-black p-6 sm:p-8 rounded-lg w-full max-w-md sm:max-w-lg h-auto min-h-[400px] flex flex-col items-center shadow-lg">
        
        {/* Login Heading */}
        <h2 className="text-white text-3xl font-bold mb-6">Login</h2>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Enter your Email"
          className="w-full h-12 p-3 mb-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          className="w-full h-12 p-3 mb-4 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Login Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all w-2/3 sm:w-1/2 text-lg font-semibold">
          Login
        </button>

        {/* Admin Navigation */}
        <p className="text-sm text-white mt-4">
          Are you an admin?{" "}
          <Link to="/admin-login" className="text-blue-400 font-semibold">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
