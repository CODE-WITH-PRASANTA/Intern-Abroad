import React, { useState, useEffect } from 'react';
import './IndustryInternship.css';
import { FaArrowLeft } from 'react-icons/fa';
import axiosInstance from '../../Utils/Api'; // Import the axiosInstance

const IndustryInternship = ({ formData, setFormData, onBack, setStep }) => {
  const [selectedItems, setSelectedItems] = useState(formData.selectedIndustries || []);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axiosInstance.get('/industries');
        setIndustries(response.data);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);

  const handleSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    );
  };

  const handleContinue = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedIndustries: selectedItems,
    }));
    setStep(6); // Navigate to Internship Length
  };

  return (
    <div className="industry-container">
      <div className="back-arrow" onClick={onBack}>
        <FaArrowLeft /> Back
      </div>
      <h2 className="industry-heading">Internship Industry</h2>
      <p className="industry-subheading">Tell us the field you're passionate about</p>
      <div className="industry-grid">
        {industries.map((industry) => (
          <div
            key={industry._id}
            className={`industry-item ${selectedItems.includes(industry._id) ? 'selected' : ''}`}
            onClick={() => handleSelect(industry._id)}
          >
            <img src={industry.logo} alt={industry.name} />
            <span>{industry.name}</span>
          </div>
        ))}
      </div>
      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={selectedItems.length === 0}
      >
        Continue
      </button>
    </div>
  );
};

export default IndustryInternship;


