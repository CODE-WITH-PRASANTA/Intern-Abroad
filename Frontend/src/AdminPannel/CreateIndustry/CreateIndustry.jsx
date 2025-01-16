import React, { useState, useEffect } from 'react';
import './CreateIndustry.css';
import axiosInstance from '../../Utils/Api'; // Import the axios instance

const CreateIndustry = () => {
  const [industryName, setIndustryName] = useState('');
  const [industryLogo, setIndustryLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [industries, setIndustries] = useState([]); // State to hold the list of industries
  const [editIndustry, setEditIndustry] = useState(null); // State to handle edit mode

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await axiosInstance.get('/industries'); // Using axiosInstance
      setIndustries(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch industries.');
    }
  };

  // Handle industry logo change
  const handleLogoChange = (e) => {
    setIndustryLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!industryName || !industryLogo) {
      setErrorMessage('Both industry name and logo are required.');
      return;
    }
  
    setLoading(true);
    const formData = new FormData();
    formData.append('name', industryName);
  
    // Check if logo is selected
    if (industryLogo) {
      formData.append('logo', industryLogo);  // Send logo as a file
    }
  
    try {
      const response = await axiosInstance.post('/industries/create', formData); // Using axiosInstance
      const data = response.data;
  
      if (response.status === 200) {
        setSuccessMessage('Industry created successfully!');
        fetchIndustries();  // Refresh the industry list
        setIndustryName('');
        setIndustryLogo(null);
      } else {
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle edit industry
  const handleEdit = (industry) => {
    setIndustryName(industry.name);
    setIndustryLogo(industry.logo); // Assuming logo URL is passed correctly
    setEditIndustry(industry);
  };

  // Handle updating the industry
  const handleUpdateIndustry = async (e) => {
    e.preventDefault();
    if (!industryName || !industryLogo) {
      setErrorMessage('Both industry name and logo are required.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', industryName);
    formData.append('logo', industryLogo);

    try {
      const response = await axiosInstance.put(`/industries/update/${editIndustry._id}`, formData); // Using axiosInstance
      const data = response.data;

      if (response.status === 200) {
        setSuccessMessage('Industry updated successfully!');
        setIndustries(industries.map(industry => industry._id === editIndustry._id ? data.industry : industry));
        setIndustryName('');
        setIndustryLogo(null);
        setEditIndustry(null);
      } else {
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-industry-container">
    <h2>{editIndustry ? 'Edit Industry' : 'Create New Industry'}</h2>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    {successMessage && <p className="success-message">{successMessage}</p>}
    
    <div className="form-and-industries">
      <div className="create-form-container">
        <form onSubmit={editIndustry ? handleUpdateIndustry : handleSubmit} className="create-industry-form">
          <div className="form-group">
            <label htmlFor="name">Industry Name</label>
            <input
              type="text"
              id="name"
              value={industryName}
              onChange={(e) => setIndustryName(e.target.value)}
              required
              placeholder="Enter industry name"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="logo">Industry Logo</label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoChange}
              required
            />
          </div>
  
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : editIndustry ? 'Update Industry' : 'Submit'}
          </button>
        </form>
      </div>
  
      <div className="created-industries-container">
        <h3>Created Industries</h3>
        <ul className="created-industries-list">
          {industries.map((industry) => (
            <li key={industry._id} className="created-industry-item">
              <div className='created-industry-data'>
                <img src={industry.logo} alt={industry.name} />
                <span>{industry.name}</span>
              </div>
              <button
                className="edit-button"
                onClick={() => handleEdit(industry)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  
  );
};

export default CreateIndustry;
