import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/Api'; // Import the configured axios instance
import './CreateInternshipLoc.css';

const CreateInternshipLoc = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');
  const [countryFlag, setCountryFlag] = useState(null);
  const [previewFlag, setPreviewFlag] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await axiosInstance.get('/countries'); // Use axiosInstance
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleFlagChange = (e) => {
    const file = e.target.files[0];
    setCountryFlag(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewFlag(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!countryName || !countryFlag) {
      alert('Please fill in all fields!');
      return;
    }

    const formData = new FormData();
    formData.append('countryName', countryName);
    if (countryFlag) {
      formData.append('flag', countryFlag);
    }

    try {
      const url = editId
        ? `/countries/${editId}` // Use axiosInstance for the URL
        : '/countries/upload';

      const method = editId ? 'put' : 'post';
      const response = await axiosInstance[method](url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);
      setCountryName('');
      setCountryFlag(null);
      setPreviewFlag(null);
      setEditId(null);
      fetchCountries();
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  const handleEdit = (country) => {
    setCountryName(country.name);
    setEditId(country._id);
    setPreviewFlag(country.flagUrl);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this country?')) return;

    try {
      await axiosInstance.delete(`/countries/${id}`); // Use axiosInstance for delete
      fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error.response?.data || error.message);
    }
  };

  return (
    <div className="create-internship-loc">
      <h1 className="header">Create Internship Location</h1>
      <div className="main-container">
        <div className="admin-form-container">
          <form className="location-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="countryName">Country Name</label>
              <input
                type="text"
                id="countryName"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Enter country name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="countryFlag">Country Flag</label>
              <input
                type="file"
                id="countryFlag"
                accept="image/*"
                onChange={handleFlagChange}
              />
              {previewFlag && (
                <div className="flag-preview">
                  <img src={previewFlag} alt="Flag Preview" />
                </div>
              )}
            </div>
            <button type="submit" className="submit-btn">
              {editId ? 'Update Country' : 'Add Country'}
            </button>
          </form>
        </div>

        <div className="countries-container">
          <h2 className="countries-header">Countries</h2>
          <div className="countries-list">
            {countries.map((country) => (
              <div key={country._id} className="country-item">
                <div className="country-details">
                  <img src={country.flagUrl} alt={country.name} className="country-flag" />
                  <h3 className="country-name">{country.name}</h3>
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(country)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(country._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInternshipLoc;
