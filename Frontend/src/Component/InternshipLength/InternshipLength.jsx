import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/api"; // Import the axiosInstance
import "./InternshipLength.css";

const InternshipLength = ({ formData, setFormData, onBack, onContinue }) => {
  const [selectedOption, setSelectedOption] = useState(formData.internshipLength || "6 Weeks");
  const [courses, setCourses] = useState(formData.courses || []);
  const options = ["6 Weeks", "2 Months", "3 Months", "4 Months", "5 Months", "6 Months"];

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    try {
      const response = await axiosInstance.get(`/course/courses?category=${option}`); // Using axiosInstance with no full URL
      setCourses(response.data); // Update courses based on selection
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    handleOptionClick(selectedOption);
  }, []); // Only run on component mount

  const handleContinue = () => {
    // Save the selected internship length and courses to formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      internshipLength: selectedOption,
      courses: courses,
    }));
    onContinue(); // Navigate to the next step
  };

  return (
    <div className="internship-length-container">
      <div className="back-button" onClick={onBack}>
        ← Back
      </div>
      <h2 className="title">Internship Length</h2>
      <p className="subtitle">Choose your preferred internship length</p>

      <div className="options-container">
        {options.map((option) => (
          <div
            key={option}
            className={`length-option-container ${selectedOption === option ? "selected" : ""}`}
            onClick={() => handleOptionClick(option)}
          >
            <button className="length-option-button">{option}</button>
          </div>
        ))}
      </div>

      <div className="professional-courses-section">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="professional-course-card">
              <div className="professional-card-image-container">
                <img
                  src={course.img}
                  alt={course.courseName}
                  className="professional-card-image"
                />
              </div>
              <div className="professional-card-content">
                <h3 className="professional-course-title">{course.courseName}</h3>
                <p className="professional-course-details">{course.details}</p>
                <p className="professional-course-pricing">Pricing: {course.pricing}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-courses-message">No courses available for this selection.</p>
        )}
      </div>

      <button
        className="continue-button"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default InternshipLength;
