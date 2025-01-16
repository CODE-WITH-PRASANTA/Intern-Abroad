import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/Api'; // Import the configured axios instance
import './AdminLogin.css';
import BoyGraphic from '../../assets/boy-playing-1.svg';
import HatGraphic from '../../assets/Hat-Image.svg';
import CompanyLogo from '../../assets/Intern-Abroad-logo.png';
import AdminNav from "../../AdminPannel/AdminBar/AdminBar"; // Import AdminNav
import Swal from 'sweetalert2'; // Import SweetAlert2

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/admin/login', {
        email,
        password
      });

      // Assuming the login is successful, set authentication state
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Store authentication in localStorage

      // Show success alert using SweetAlert2
      Swal.fire({
        title: "Login Successful",
        text: "Welcome to the Admin Panel!",
        icon: "success",
        draggable: true,
        confirmButtonText: "Proceed to Dashboard"
      })

    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (isAuthenticated) {
    // Render AdminNav component after successful login
    return <AdminNav />;
  }

  return (
    <div className="login-page-container">
      <div className="login-graphics-section">
        <img src={BoyGraphic} alt="Boy graphic" className="login-boy-graphic" />
        <img src={HatGraphic} alt="Hat graphic" className="login-hat-graphic" />
      </div>
      <div className="login-form-section">
        <div className="login-form-container">
          <img src={CompanyLogo} alt="Company Logo" className="login-company-logo" />
          <h1 className="Admin--Pannel">Admin Pannel</h1>
          <h1 className="login-heading">Get more things done with our platform</h1>
          <p className="login-description">
            Access to the most powerful tool in the entire design and web industry.
          </p>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail Address"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="login-buttons-wrapper">
              <button type="submit" className="login-button">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
