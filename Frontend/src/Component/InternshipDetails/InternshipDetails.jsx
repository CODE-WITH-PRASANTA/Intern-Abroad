import React, { useState } from "react";
import "./InternshipDetails.css";

const InternshipDetails = ({ formData, setFormData, onBack, onContinue }) => {
  const [details, setDetails] = useState(formData.internshipDetails || "");

  const handleInputChange = (e) => {
    setDetails(e.target.value);
  };

  const handleContinue = () => {
    // Update formData with internship details
    setFormData((prevFormData) => ({
      ...prevFormData,
      internshipDetails: details,
    }));
    onContinue(); // Navigate to the next step
  };

  return (
    <div className="internship-details-section">
      <button className="back-arrow" onClick={onBack}>
        ← Back
      </button>
      <div className="internship-details-container">
        <h2 className="internship-details-title">Internship Details</h2>
        <p className="internship-details-subtitle">
          Tell us a bit about what you are looking for?
        </p>

        <label className="internship-details-label" htmlFor="details">
          Could you provide more details about the type of internship you're seeking?
        </label>
        <textarea
          id="details"
          className="internship-details-textarea"
          placeholder="Type your message..."
          value={details}
          onChange={handleInputChange}
        ></textarea>

        <button
          className="internship-details-continue-button"
          onClick={handleContinue} // Navigate to Step 8
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InternshipDetails;
