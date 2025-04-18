import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="text-2xl font-bold">Jobnest</div>

        <ul className="hidden md:flex space-x-8 lg:space-x-12">
          <li>
            <Link to="/adminhome" className="text-lg font-bold hover:text-blue-500">Home</Link>
          </li>
          {/* <li>
            <Link to="/managejobs" className="text-lg font-bold hover:text-blue-500">Jobs</Link>
          </li> */}
          <li>
            <Link to="/addjob" className="text-lg font-bold hover:text-blue-500">Add New Job</Link>
          </li>

          {/* <li>
            <Link to="/addjob" className="text-lg font-bold hover:text-blue-500"></Link>
          </li> */}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-3xl text-sm font-semibold">
            Admin
          </button>
          <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2 rounded-3xl text-lg font-bold">
            Logout
          </button>
        </div>

        <button className="md:hidden text-black focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full absolute top-full left-0 shadow-lg">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            <li><Link to="/adminhome" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</Link></li>
            {/* <li><Link to="/managejobs" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Jobs</Link></li> */}
            <li><Link to="/addnewjob" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Add New Job</Link></li>
          </ul>

          <div className="flex flex-col items-center py-4 px-6 space-y-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-3xl text-sm font-semibold w-full">
              Admin
            </button>
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="bg-red-600 text-white px-5 py-2 rounded-3xl text-lg font-bold w-full">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
