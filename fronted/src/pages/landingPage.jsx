import React from "react";
// Sections
import TopNavbar from "../landingpageSections/Nav/TopNavbar";
import Header from "../landingpageSections/Sections/Header";
import Services from "../landingpageSections/Sections/Services";
import Projects from "../landingpageSections/Sections/Projects";
import Blog from "../landingpageSections/Sections/Blog";
import Pricing from "../landingpageSections/Sections/Pricing";
import Contact from "../landingpageSections/Sections/Contact";
import Footer from "../landingpageSections/Sections/Footer"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/flexboxgrid.min.css";
import '../style/index.css';

export function LandingPage() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}


