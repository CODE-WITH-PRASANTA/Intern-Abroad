import React, { useState, useEffect } from 'react';
import './InternshipLocation.css';
import axiosInstance from '../../Utils/Api'; // Import the centralized axios instance

const InternshipLocation = ({ formData, setFormData, onBack, setStep }) => {
  const [selectedCountry, setSelectedCountry] = useState(formData.location || ""); // Initialize with formData

  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get('/countries'); // Using axiosInstance
        setCountriesData(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleContinue = () => {
    if (!selectedCountry) {
      alert("Please select a country to continue.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      location: selectedCountry, // Update formData with selected country
    }));

    setStep(4); // Navigate to the next step
  };

  return (
    <div className="internship-location">
      <button className="location-back-btn" onClick={onBack}>
        ← Back
      </button>
      <h1>Internship Location</h1>
      <p>Let us know where you'd like to make an impact.</p>

      <div className="locations-container">
        <div className="region">
          <h2>ASIA</h2>
          <div className="countries">
            {countriesData.map((country) => (
              <button
                key={country._id}
                className={`country-button ${
                  selectedCountry === country.name ? "selected" : ""
                }`}
                onClick={() => handleCountrySelect(country.name)}
              >
                <img src={country.flagUrl} alt={country.name} />
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer">
        <button
          className={`continue-btn ${selectedCountry ? "active" : ""}`}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InternshipLocation;
