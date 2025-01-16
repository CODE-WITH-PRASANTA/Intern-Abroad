import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/Api"; // Import axiosInstance
import "./Signup.css";

// Assets
import RightsideImg from "../../assets/Login-Right-Img.jpg";
import companylogo from "../../assets/Intern-Abroad-logo.png";

const Signup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePopup = () => setShowPopup(!showPopup);
  const toggleForm = () => setShowLogin(!showLogin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Reset error on input change
  };

  // Frontend handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = showLogin
        ? "/auth/login"
        : "/auth/signup"; // No need to specify full URL since baseURL is set in axiosInstance

      const response = await axiosInstance.post(url, formData); // Use axiosInstance
      const { token, message } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
        alert(message);
        navigate("/onboarding");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      {/* Company Logo */}
      <a href="/" className="signup-logo-link">
        <img src={companylogo} alt="Company Logo" className="signup-logo" />
      </a>

      {/* Left Section */}
      <div className="signup-left">
        <h1 className="signup-title">
          {showLogin ? "Log In to Your Account" : "Apply for an Internship"}
        </h1>
        <p className="signup-subtitle">
          {showLogin ? "Welcome back! Please log in." : "Please enter your personal information"}
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          {!showLogin && (
            <div className="signup-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                className="signup-input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                className="signup-input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          {!showLogin && <p className="signup-hint">Minimum of 8 characters</p>}
          {error && <p className="signup-error">{error}</p>}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Processing..." : showLogin ? "Log In" : "Let's Get Started"}
          </button>
        </form>
        <p className="signup-footer">
          <a href="#" className="signup-link" onClick={togglePopup}>
            Application Guidelines and Requirements
          </a>
        </p>
        <p className="signup-footer">
          {showLogin ? (
            <>
              Don't have an account?{" "}
              <a href="#" className="signup-link" onClick={toggleForm}>
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already applied?{" "}
              <a href="#" className="signup-link" onClick={toggleForm}>
                Log In
              </a>
            </>
          )}
        </p>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <img src={RightsideImg} alt="Right Side Content" className="signup-right-img" />
      </div>

      {/* Popup Component */}
      {showPopup && (
        <div className="popup-backdrop">
          <div className="popup-modal">
            <button className="popup-close" onClick={togglePopup}>
              &times;
            </button>
            <h2 className="popup-title">
              We are absolutely thrilled that you're interested in joining us!
            </h2>
            <ul className="popup-content">
              <li>
                If you're applying for an in-person internship, please be aware that the minimum age
                requirement is 18 years old.
              </li>
              <li>
                Speaking the local language is NOT mandatory to apply for our internships. We
                welcome applicants from diverse backgrounds and linguistic abilities.
              </li>
              <li>
                No worries if you don't have a degree or prior experience. We believe in providing
                opportunities to individuals from all educational backgrounds and levels of
                experience.
              </li>
              <li>
                Please ensure you have a valid passport as it is necessary to participate in our
                program.
              </li>
            </ul>
            <p className="popup-footer">
              Thank you for considering our program. We eagerly look forward to reviewing your
              application and helping you embark on an enriching journey with us. If you have any
              questions, feel free to reach out. We're here to support you throughout the process.
              Good luck!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
