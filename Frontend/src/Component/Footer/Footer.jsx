import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/Api"; // Importing the Axios instance
import "./Footer.css";

// Assets fallback
import IITDelhiLogo from "../../assets/IIT-Delihi-Logo.png";
import VersaLogo from "../../assets/Versa-logo.png";
import ThaparUniversityLogo from "../../assets/Thapar-University-logo.png";
import AbroadCom from "../../assets/Abroad-Logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/contact");
  };

  const handleabout = () => {
    navigate("/about");
  };
  const handelstudy = () => {
    navigate("/studyzone");
  };
  const handelservice = () => {
    navigate("/service");
  };
  const handelonlinebook = () => {
    navigate("/bookonline");
  };
  const handelblog = () => {
    navigate("/blog");
  };
  const handelhome = () => {
    navigate("/");
  };

  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axiosInstance.get("/contact"); // Using Axios instance for API call
        setContactData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch contact information");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <footer>
      {/* Top "Ready to get started?" Section */}
      <div className="footer-cta">
        <div className="footer-cta-box">
          <h2>Ready to get started?</h2>
          <p>Trusted by 100+ Interns globally, with 25% increasing Growth Monthly!</p>
          <button className="contact-button" onClick={handleContact}>
            Contact Us
          </button>
        </div>
      </div>

      {/* Footer Main Section */}
      <div className="footer-main">
        <div className="footer-column about">
          <h3>About us</h3>
          <p>
            InternsflyAbroard Founded in 2019. (Internsflyabroad.govt) is a not-for-profit provider
            with 147+ study abroad and internship programs around the world for college/university
            students and professionals Students from the worlds.
          </p>
          <div className="footer-logo">
            <img
              src={contactData?.logo || "default-logo.png"} // Use fallback logo if not available
              alt="Company Logo"
              className="footer-company-logo"
            />
          </div>
        </div>

        <div className="footer-column links">
          <h3>Important Links</h3>
          <ul>
            <li onClick={handelhome}>Live Demo</li>
            <li onClick={handleabout}>About Us</li>
            <li onClick={handelonlinebook}>Online Booking</li>
            <li onClick={handelstudy}>Our Study System</li>
            <li onClick={handelservice}>Plans & Prices</li>
            <li onClick={handelblog}>Blog Analysis</li>
            <li onClick={handleContact}>Contact Us</li>
          </ul>
        </div>

        <div className="footer-column contact">
          <h3>Interns FlyAbroad</h3>
          <p>
            <strong>TRADE COUNSIL CERTIFICATE NUMBER:</strong> 1984901377
            <br />
            <strong>GST:</strong> 20GDTPS1053R1ZU
          </p>
          <h4>Get In Touch</h4>
          <p>📍 Singapore office Location: {contactData?.singaporeLocation || "Not Available"}</p>
          <p>📍 India office Location: {contactData?.indiaLocation || "Not Available"}</p>
          <p>📍 North Region Location: {contactData?.northRegionLocation || "Not Available"}</p>
          <p>📧 {contactData?.email || "Not Available"}</p>
          <p>📞 {contactData?.phone1 || "Not Available"}</p>
          <p>📞 {contactData?.phone2 || "Not Available"}</p>
        </div>
      </div>

      {/* Footer Bottom Certificates */}
      <div className="footer-bottom">
        <div className="certificate">
          <img src={IITDelhiLogo} alt="ISO Certified" />
        </div>
        <div className="certificate">
          <img src={VersaLogo} alt="IATA Certificate" />
        </div>
        <div className="certificate">
          <img src={ThaparUniversityLogo} alt="IATA Certificate" />
        </div>
        <div className="certificate">
          <img src={AbroadCom} alt="IATA Certificate" />
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
  <p>
    Copyright © All Rights Reserved © 2025. Powered by Interns FlyAbroad | Powered by ♡
    <span className="designer-name">
      <a 
        href="https://prwebstock.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        PR Webstock
      </a>
    </span>
  </p>
</div>
    </footer>
  );
};

export default Footer;
