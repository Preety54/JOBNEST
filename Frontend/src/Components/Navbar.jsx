import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react"; // Import the User icon
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // ✅ Fix: Read authToken correctly on mount
  const getAuthStatus = () => !!localStorage.getItem("authToken");
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus);

  // ✅ Fix: Update state whenever localStorage changes
  useEffect(() => {
    const updateAuth = () => setIsAuthenticated(getAuthStatus());
    window.addEventListener("storage", updateAuth);
    return () => window.removeEventListener("storage", updateAuth);
  }, []);

  // ✅ Fix: Login function
  const handleLogin = () => {
    navigate("/login");
    window.location.reload(); // ✅ Refresh page after logout
  };

  // ✅ Fix: Logout function (Instant state update)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
    window.location.reload(); // ✅ Refresh page after logout
  };

  // Navigate to user profile page
  const navigateToProfile = () => {
    navigate("/userProfile");
  };

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
          <li><Link to="/reviews" className="text-lg font-bold hover:text-blue-500">Review</Link></li>
          <li><Link to="/contact" className="text-lg font-bold hover:text-blue-500">Contact Us</Link></li>
        </ul>

        {/* Login/Logout Button */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {/* Profile Icon */}
              <button onClick={navigateToProfile} className="text-gray-600 hover:text-blue-600">
                <User size={24} />
              </button>
              {/* Logout Button */}
              <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2 rounded-3xl text-lg font-bold">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className="bg-black text-white px-5 py-2 rounded-3xl text-lg font-bold">
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
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
            <li><Link to="/reviews" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Review</Link></li>
            <li><Link to="/contact" className="text-lg font-bold hover:text-blue-500" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
          </ul>

          {/* Mobile Login/Logout */}
          <div className="flex flex-col items-center py-4 px-6">
            {isAuthenticated ? (
              <>
                <button onClick={() => { navigateToProfile(); setIsOpen(false); }} className="text-gray-600 hover:text-blue-600 w-full py-2">
                  <User size={24} />
                </button>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="bg-red-600 text-white px-5 py-2 rounded-3xl text-lg font-bold w-full">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => { handleLogin(); setIsOpen(false); }} className="bg-black text-white px-5 py-2 rounded-3xl text-lg font-bold w-full text-center">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
