// import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./shared/navBar/NavBar";
import Header from "./shared/header/Header";
import Classifier from "./classifier/pages/Classifier";
import About from "./about/About";
import PrivacyPolicy from "./shared/privacyPolicy/PrivacyPolicy";
import HowToUse from "./shared/howToUse/HowToUse";
import Footer from "./shared/footer/Footer";

import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Classifier />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/how-to-use" element={<HowToUse />} />

        {/* Catch-all route for invalid URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
