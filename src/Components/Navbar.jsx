// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 w-full z-50">
//       <div className="text-2xl font-bold">Jobnest</div>
      
//       {/* Sections - Moved More to the Right using ml-36 */}
//       <ul className="flex space-x-12 ml-36"> 
//         <li><Link to="/" className="text-lg font-bold hover:text-blue-500">Home</Link></li>
//         <li><Link to="/about" className="text-lg font-bold hover:text-blue-500">About Us</Link></li>
//         <li><Link to="/jobs" className="text-lg font-bold hover:text-blue-500">Jobs</Link></li>
//         <li><Link to="/Reviews" className="text-lg font-bold hover:text-blue-500">Review</Link></li>
//         <li><Link to="/contact" className="text-lg font-bold hover:text-blue-500">Contact Us</Link></li>
//       </ul>

//       {/* Search & Login Button */}
//       <div className="flex items-center space-x-6">
//         <input 
//           type="text" 
//           placeholder="Search" 
//           className="border rounded-md px-3 py-2 focus:outline-none"
//         />
//         <button className="bg-black text-white px-5 py-2 rounded-3xl text-lg font-bold">
//           Login
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        
        {/* Logo */}
        <div className="text-2xl font-bold">Jobnest</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 lg:space-x-12">
          <li><Link to="/" className="text-lg font-bold hover:text-blue-500">Home</Link></li>
          <li><Link to="/about" className="text-lg font-bold hover:text-blue-500">About Us</Link></li>
          <li><Link to="/jobs" className="text-lg font-bold hover:text-blue-500">Jobs</Link></li>
          <li><Link to="/Reviews" className="text-lg font-bold hover:text-blue-500">Review</Link></li>
          <li><Link to="/contact" className="text-lg font-bold hover:text-blue-500">Contact Us</Link></li>
        </ul>

        {/* Search & Login Button - Hidden on Small Screens */}
        <div className="hidden md:flex items-center space-x-6">
          <input 
            type="text" 
            placeholder="Search" 
            className="border rounded-md px-3 py-2 focus:outline-none"
          />
          <button className="bg-black text-white px-5 py-2 rounded-3xl text-lg font-bold">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full absolute top-full left-0 shadow-lg">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            <li><Link to="/" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/about" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>About Us</Link></li>
            <li><Link to="/jobs" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Jobs</Link></li>
            <li><Link to="/Reviews" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Review</Link></li>
            <li><Link to="/contact" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
          </ul>

          {/* Search & Login for Mobile */}
          <div className="flex flex-col items-center py-4 px-6">
            <input 
              type="text" 
              placeholder="Search" 
              className="border rounded-md px-3 py-2 w-full mb-3 focus:outline-none"
            />
            <button className="bg-black text-white px-5 py-2 rounded-3xl text-lg font-bold w-full">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
