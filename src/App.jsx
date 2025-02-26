import React from "react";
import Navbar from "./Components/Navbar"; // ✅ Correct Path
import Home from "./Components/Home";
import AboutUs from "./Components/AboutUs";
import Third from "./Components/Third";
import JobsCategory from "./Components/JobsCategory";
import Jobs from "./Components/Jobs";
import Review from "./Components/Review";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import AdminLogin from "./Components/AdminLogin";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <AboutUs />
      <Third />
      <JobsCategory  />
      <Jobs />
      <Review />
      <Footer />
      <Login />
      <AdminLogin/>

    </>
  );
}

export default App;



