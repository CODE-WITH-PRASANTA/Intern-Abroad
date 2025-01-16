import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./InternshipStartDate.css";

const InternshipStartDate = ({ formData, setFormData, onBack, onContinue }) => {
  const [startDate, setStartDate] = useState(
    formData.internshipStartDate ? new Date(formData.internshipStartDate) : null
  );

  const handleDateChange = (date) => {
    setStartDate(date);
    // Update the formData with the selected date
    setFormData((prevFormData) => ({
      ...prevFormData,
      internshipStartDate: date.toISOString(), // Store date as ISO string
    }));
  };

  const handleContinue = () => {
    onContinue(); // Navigate to the next step
  };

  return (
    <div className="internship-start-date-section">
      <button className="back-arrow" onClick={onBack}>
        ← Back
      </button>
      <div className="internship-start-date-container">
        <h2 className="title">Internship Start Date</h2>
        <p className="subtitle">
          Tell us when you're ready to kick off your professional journey
        </p>

        <label className="label" htmlFor="start-date">
          Select your preferred starting date
        </label>
        <DatePicker
          id="start-date"
          className="date-picker"
          selected={startDate}
          onChange={handleDateChange}
          placeholderText="Select a date"
          dateFormat="dd-MM-yyyy"
          minDate={new Date()} // Prevent selecting past dates
          showPopperArrow={false}
        />

        <button
          className="continue-button"
          onClick={handleContinue}
          disabled={!startDate} // Disable the button until a date is selected
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InternshipStartDate;
