import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';
import CompanyLogo from '../../assets/Company-logo.png';
import MenuIcon from '../../assets/Menu-button.png';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollaborationDropdownOpen, setIsCollaborationDropdownOpen] = useState(false); // Desktop dropdown state
  const [isCollaborationDropdownOpenMobile, setIsCollaborationDropdownOpenMobile] = useState(false); // Mobile dropdown state
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollaborationDropdownMobile = () => {
    setIsCollaborationDropdownOpenMobile(!isCollaborationDropdownOpenMobile);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the desired route
    setIsSidebarOpen(false); // Close the sidebar on navigation
    setIsCollaborationDropdownOpenMobile(false); // Close mobile dropdown on navigation
  };

  return (
    <div className="navbar-container">
      {/* Main Navbar */}
      <div className="navbar">
        <img src={CompanyLogo} alt="Company Logo" className="company-logo" onClick={() => handleNavigation('/')} />
        <div className="desktop-links">
          <a onClick={() => handleNavigation('/')}>Home</a>
          <a onClick={() => handleNavigation('/about')}>About</a>
          <a onClick={() => handleNavigation('/blog')}>Blog</a>
          <a onClick={() => handleNavigation('/service')}>Plan & Pricing</a>
          <a onClick={() => handleNavigation('/bookonline')}>Book Online</a>
          <a onClick={() => handleNavigation('/studyzone')}>StudyZone</a>
          <div
            className="collaboration-menu"
            onMouseEnter={() => setIsCollaborationDropdownOpen(true)}
            onMouseLeave={() => setIsCollaborationDropdownOpen(false)}
          >
            <a className="collaboration-link">Collaboration</a>
            {isCollaborationDropdownOpen && (
              <div className="dropdown">
                <a onClick={() => handleNavigation('/collaboration/university')}>For University</a>
                <a onClick={() => handleNavigation('/collaboration/employee')}>For Employee</a>
              </div>
            )}
          </div>
          <a onClick={() => handleNavigation('/signup')} className="login">Login</a>
          <button className="contact-button" onClick={() => handleNavigation('/contact')}>Contact Us</button>
        </div>
        <button className="menu-button" onClick={toggleSidebar}>
          <img src={MenuIcon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>
          &times;
        </button>
        <a onClick={() => handleNavigation('/')}>Home</a>
        <a onClick={() => handleNavigation('/about')}>About</a>
        <a onClick={() => handleNavigation('/blog')}>Blog</a>
        <a onClick={() => handleNavigation('/service')}>Plan & Pricing</a>
        <a onClick={() => handleNavigation('/bookonline')}>Book Online</a>
        <a onClick={() => handleNavigation('/studyzone')}>StudyZone</a>

        {/* Collaboration Dropdown for Mobile */}
        <div
          className={`collaboration-menu-mobile ${isCollaborationDropdownOpenMobile ? 'open' : ''}`}
        >
          <div
            className="collaboration-link-mobile"
            onClick={toggleCollaborationDropdownMobile}
          >
            Collaboration
          </div>
          {isCollaborationDropdownOpenMobile && (
            <div className="dropdown-mobile">
              <a onClick={() => handleNavigation('/collaboration/university')}>For University</a>
              <a onClick={() => handleNavigation('/collaboration/employee')}>For Employee</a>
            </div>
          )}
        </div>

        <a onClick={() => handleNavigation('/signup')} className="login">Login</a>
        <button className="contact-button" onClick={() => handleNavigation('/contact')}>Contact Us</button>
      </div>
    </div>
  );
};

export default Navbar;
