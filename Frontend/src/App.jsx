import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import AdminLogin from "./Components/AdminLogin";
import AboutUs from "./Components/AboutUs";
import Jobs from "./Components/Jobs";
import Review from "./Components/Review";
import ContactUs from "./Components/ContactUs";
import Register from "./Components/Register";
import Apply from "./Components/Apply";
import Resume from "./Components/Resume";
import Template from "./Components/Template";
import Template1 from "./Components/Template1";
import Template2 from "./Components/Template2";
import Template3 from "./Components/Template3";
import Template4 from "./Components/Template4";
import Template5 from "./Components/Template5";
import Preview from "./Components/Preview";
import AdminHome from "./Components/AdminHome";
import Adminhero from "./Components/Adminhero";
import ApplyJob from "./Components/ApplyJob";
import UserProfile from "./Components/UserProfile";
import FilterJob from "./Components/Filterjob";
import EditJob from "./Components/EditJob";
import AddJob from "./Components/AddJob";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminhero" element={<Adminhero/>} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/filteredjobs" element={<FilterJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Previously Protected Routes - Now Open to All */}
        <Route path="/apply" element={<Apply />} />
        <Route path="/applyjob" element={<ApplyJob />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/template" element={<Template />} />
        <Route path="/template1" element={<Template1/>} />
        <Route path="/template2" element={<Template2 />} />
        <Route path="/template3" element={<Template3 />} />
        <Route path="/template4" element={<Template4 />} />
        <Route path="/template5" element={<Template5 />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/editjob/:jobId" element={<EditJob />} />
        <Route path="/addjob" element={<AddJob />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
