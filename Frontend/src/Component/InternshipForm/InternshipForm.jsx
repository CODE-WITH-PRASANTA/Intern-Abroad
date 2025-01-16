import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/Api';
import './InternshipForm.css';

const InternshipForm = () => {
  const navigate = useNavigate();
  const [pricingData, setPricingData] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    nationality: '',
    programEmail: '',
    startDate: '',
  });

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axiosInstance.get('/pricing');
        setPricingData(response.data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };
    fetchPricingData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const dataToStore = {
      ...formData,
      selectedIndustry,
      selectedDuration,
    };
    // Save form data to localStorage
    localStorage.setItem('internshipFormData', JSON.stringify(dataToStore));
    navigate('/payment'); // Navigate to Payment page
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Almost there In Intern Abroad!</h1>
        <p className="form-subtitle">Let's just confirm everything so far</p>

        <div className="form-section">
          <div className="form-group phone-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group nationality-group">
            <label>Nationality *</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            >
              <option value="">Select Nationality</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>
        </div>

        <div className="intern-form-section">
          <div className="form-group internship-type-group">
            <label>Type of Internship</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">Select an Industry</option>
              {pricingData.map((plan) => (
                <option key={plan._id} value={plan.title}>
                  {plan.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group duration-group">
            <label>How long</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="">Select a Duration</option>
              {pricingData.map((plan) => (
                <option key={plan._id} value={plan.validTime}>
                  {plan.validTime}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group program-group">
            <label>Program Email</label>
            <input
              type="email"
              name="programEmail"
              value={formData.programEmail}
              onChange={handleChange}
              placeholder="Enter Mail"
            />
          </div>

          <div className="form-group start-date-group">
            <label>Starting date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          Submit Internship Application Form & Pay
        </button>
      </div>
    </div>
  );
};

export default InternshipForm;
