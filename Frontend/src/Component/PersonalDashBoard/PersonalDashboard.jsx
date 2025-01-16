import React, { useState } from "react";
import "./PersonalDashboard.css";

// Assets of the remote internship
import RemoteInternshipIcon from '../../assets/Remote-internship-icon.svg';
// Assets of the in-person internship
import InPersonInternship from '../../assets/In-person-internship.svg';
import IndustryInternship from "../IndustryInternship/IndustryInternship";
import InternshipLocation from "../Internship Location/InternshipLocation";
import InternshipLength from "../InternshipLength/InternshipLength";
import InternshipDetails from "../InternshipDetails/InternshipDetails";
import InternshipStartDate from "../InternshipStartDate/InternshipStartDate";
import VirtualPayment from "../VirtualPayment/VirtualPayment";


const PersonalDashboard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
    gender: "",
    phone: "",
    email: "",
    name: "",
    nationality: "",
    address: "",
    internshipType: "",
    selectedIndustries: [],
    location: "",
    internshipLength: "",
    courses: [],
    internshipStartDate: "",
    internshipDetails: "",
    utrNo: "",
    paymentMethod: "",
  });


  const [selectedInternship, setSelectedInternship] = useState(""); // Track selected internship type

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isStep1Valid = () => {
    return formData.day && formData.month && formData.year && formData.gender;
  };

  const isStep2Valid = () => {
    return formData.phone && formData.email && formData.nationality && formData.address;
  };

  const handleInternshipSelection = (type) => {
    setSelectedInternship(type);
    setStep(4); // Move to step 4
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1 && !isStep1Valid()) {
      alert("Please complete all fields.");
    } else if (step === 2 && !isStep2Valid()) {
      alert("Please complete all fields.");
    } else if (step === 2) {
      setStep(3); // Move to step 3
    }
  };

  return (
    <div className="full-personal-info-section">
      <div className="personal-info-container">
        {step === 1 && (
          <div className="Tell-about">
            <h1 className="heading">Personal Info</h1>
            <p className="subheading">Tell us a bit about yourself.</p>
            <form className="personal-info-form" onSubmit={() => setStep(2)}>
              <label className="label">What is your date of birth? *</label>
              <div className="dob-container">
                <input
                  type="text"
                  name="day"
                  placeholder="DD"
                  maxLength={2}
                  value={formData.day}
                  onChange={handleChange}
                  className="dob-input"
                />
                <input
                  type="text"
                  name="month"
                  placeholder="MM"
                  maxLength={2}
                  value={formData.month}
                  onChange={handleChange}
                  className="dob-input"
                />
                <input
                  type="text"
                  name="year"
                  placeholder="YYYY"
                  maxLength={4}
                  value={formData.year}
                  onChange={handleChange}
                  className="dob-input"
                />
              </div>
              <p className="info-text">
                Please note: In-person internships require a minimum age of 18 years.
              </p>
              <label className="label">Gender *</label>
              <div className="gender-container">
                {["Male", "Female", "Other"].map((option) => (
                  <label
                    key={option}
                    className={`gender-option ${
                      formData.gender === option ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button
                type="button"
                className={`continue-button ${isStep1Valid() ? "active" : ""}`}
                disabled={!isStep1Valid()}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="Contact-info-dashboard">
            <button className="back-button" onClick={() => setStep(1)}>
              ← Back
            </button>
            <h1 className="personal-heading">Contact Info</h1>
            <p className="subheading">Let us know how to reach you.</p>
            <form className="personal-info-form" onSubmit={handleSubmit}>
              <div className="contact-row">
                <div>
                  <label className="label">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="label">Enter Full Name *</label>
                  <input
                    type="name"
                    name="name"
                    placeholder="Enter your Full-Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="label">Nationality *</label>
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Enter your nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="address-container">
                <label className="label">Address *</label>
                <textarea
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input textarea"
                />
              </div>
              <div className="submit-container">
                <button
                  type="submit"
                  className={`continue-button ${isStep2Valid() ? "active" : ""}`}
                  disabled={!isStep2Valid()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

{step === 3 && (
  <div>
    <button className="back-button" onClick={() => setStep(2)}>
      ← Back
    </button>
    <h1 className="heading">Internship Details</h1>
    <p className="subheading">Let us know how you're most comfortable working.</p>
    <div className="internship-options">
      <div
        className="internship-option"
        onClick={() => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            internshipType: "Remote Internship", // Set internshipType to "Remote Internship"
          }));
          setStep(4); // Navigate to IndustryInternship for Remote Internship
        }}
      >
        <img src={RemoteInternshipIcon} alt="Remote Internship" />
        <p>Remote Internship</p>
      </div>
      <div
        className="internship-option"
        onClick={() => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            internshipType: "In-person Internship", // Set internshipType to "In-person Internship"
          }));
          setStep(5); // Navigate to InternshipLocation for In-person Internship
        }}
      >
        <img src={InPersonInternship} alt="In-person Internship" />
        <p>In-person Internship</p>
      </div>
    </div>
  </div>
)}

        {step === 4 && (
          <IndustryInternship formData={formData} setFormData={setFormData} onBack={() => setStep(3)} setStep={setStep} />
        )}

        {step === 5 && (
          <InternshipLocation
           formData={formData}
           setFormData={setFormData}
            onBack={() => setStep(3)}
            setStep={setStep} // Pass the setStep function
          />
        )}

          {step === 6 && (
            <InternshipLength
            formData={formData}
            setFormData={setFormData}
              onBack={() => setStep(4)} // Navigate back to Step 4
              onContinue={() => setStep(7)} // Navigate forward to Step 7
            />
          )}
      {step === 7 && (
        <InternshipDetails
        formData={formData}
        setFormData={setFormData}
          onBack={() => setStep(6)} // Go back to step 6 (InternshipLength)
          onContinue={() => setStep(8)} // Move forward to step 8 (InternshipStartDate)
        />
      )}

      {step === 8 && (
        <InternshipStartDate
        formData={formData}
        setFormData={setFormData}
          onBack={() => setStep(7)} // Go back to step 7 (InternshipDetails)
          onContinue={() => setStep(9)} // Move forward to step 8 (InternshipStartDate)
        />
      )}
      </div>
      {step === 9 && (
        <VirtualPayment
        formData={formData}
        setFormData={setFormData}
          onBack={() => setStep(8)} // Go back to step 7 (InternshipDetails)
        />
      )}

    </div>
  );
};

export default PersonalDashboard;
