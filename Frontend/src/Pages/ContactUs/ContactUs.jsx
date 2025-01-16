import React from 'react';
import './ContactUs.css';

// Assets of the Contact Us Page
import ContactUsRightImg from '../../assets/contactus-support-img.png';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const ContactUs = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Replace with your Web3Forms access key
    formData.append("access_key", "2c834a6b-7db3-478f-b16d-e6589f2f88f9");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await res.json();
      if (result.success) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <>
      <div className="contact-us-container">
        <div className="full-contactus-container">
          <div className="contact-us-content">
            <h1>Contact Us</h1>
            <p>
              We at 'InternFly Abroad' promise to deliver customized
              and optimized cost-effective Software Services to our clients. Our
              team assures efficiency, quality, and speed for any type of project.
              We have a team of skilled Web Designers to manage your business needs.
            </p>
          </div>
          <div className="contact-us-image">
            <img src={ContactUsRightImg} alt="Contact Support" />
          </div>
        </div>
      </div>

      <div className="contact-us-page">
        <div className="contact-us-container-2">
          <div className="Full-contact-form-section">
            <div className="contact-info">
              <h2>Contact us</h2>
              <ul>
                <li>
                  <FaMapMarkerAlt className="icon" />
                  Address:
                  <span>
                    Tikuji- ni - wadi , Sun green Apartment 9th floor ,Thane, Maharashtra, India 400607.
                  </span>
                </li>
                <li>
                  <FaPhoneAlt className="icon" />
                  Phone: <span>+91 98277-98677</span>
                </li>
                <li>
                  <FaEnvelope className="icon" />
                  Email: <span>Internsflyabroadgovt@gmail.com</span>
                </li>
                <li>
                  <FaGlobe className="icon" />
                  Website: <span>www.internsflyabroadgovt.com</span>
                </li>
              </ul>
            </div>

            <div className="contact-form">
              <h2>Get in touch</h2>
              <p>We will catch you as early as we receive the message</p>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input type="text" name="name" placeholder="Enter name" required />
                  <input type="email" name="email" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                  <input type="text" name="contact_number" placeholder="Enter contact number" required />
                </div>
                <textarea name="message" placeholder="Enter your message" required></textarea>
                <div className="form-footer">
                  <label className="terms-container">
                    <input type="checkbox" name="terms" required />
                    <span className="terms-text">
                      I agree to the <a href="#terms">Terms & Conditions</a>.
                    </span>
                  </label>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="insights-section">
        <div className="full-subscribe-content">
          <div className="insights-content">
            <h2>Get New Insights Weekly</h2>
            <p>
              Contact us today to kick-start your project and experience the power of
              transformative digital solutions.
            </p>
          </div>
          <div className="insights-form">
            <input
              type="email"
              placeholder="Email Your Address"
              className="email-input"
            />
            <button className="subscribe-button">Subscribe➤</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
