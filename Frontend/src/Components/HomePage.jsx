import React from "react";
// import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Third from "./Third";
import JobsCategory from "./JobsCategory";
import Jobs from "./Jobs";
import Review from "./Review";
import ContactUs from "./ContactUs";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
    <Navbar />
      <Home />
      <AboutUs />
      <Third />
      <Jobs />
      <JobsCategory />
      <Review />
      <ContactUs />
      <Footer />
    </>
  );
};

export default HomePage;
