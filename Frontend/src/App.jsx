import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";

// Main App Pages
import Home from "./Pages/Home/Home";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AboutUs from "./Pages/AboutUs/AboutUs";
import StudyZone from "./Pages/StudyZone/StudyZone";

// Admin Panel Components
import Signup from "./Component/SignUp/Signup";
import PersonalInfo from "./Component/PersonalDashBoard/PersonalDashboard";
import OurService from "./Pages/OurServices/OurService";
import Blog from "./Pages/Blog/Blog";
import BookOnline from "./Pages/BookOnline/BookOnline";
import Univercity from "./Pages/ForUnivercity/Univercity";
import Employee from "./Pages/For Employee/Employee";
import InternshipForm from "./Component/InternshipForm/InternshipForm";
import Payment from "./Component/Payment/Payment";
import AdminLogin from "./AdminPannel/AdminLogin/AdminLogin";
import FloatingCallButton from "./Component/FloatingCallButton/FloatingCallButton"; // Import Call Button


// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
  }, [pathname]);

  return null;
};

const App = () => {
  
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Simulate an authentication check (replace with real logic)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location]);


  const isHiddenRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/internform") ||
    location.pathname.startsWith("/payment") ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/onboarding");

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {!isHiddenRoute && <Navbar />}
      {!isHiddenRoute && <FloatingCallButton />} {/* Add Call Button Here */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}
        >
          <GridLoader color="#e93333" size={15} />
        </div>
      )}

<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/studyzone" element={<StudyZone />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={isAuthenticated ? <PersonalInfo /> : <Navigate to="/signup" />} />
        <Route path="/service" element={<OurService />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/bookonline" element={<BookOnline />} />
        <Route path="/collaboration/university" element={<Univercity />} />
        <Route path="/collaboration/employee" element={<Employee />} />
        <Route path="/internform" element={<InternshipForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>

      {!isHiddenRoute && <Footer />}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
};

export default AppWrapper;
