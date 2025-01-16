import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaUpload, FaPlusCircle } from "react-icons/fa";
import axiosInstance from '../../Utils/Api'; // Import the configured axios instance
import "./UpdateInformation.css";

const UpdateContactForm = () => {
  const [formData, setFormData] = useState({
    singaporeLocation: "",
    indiaLocation: "",
    northRegionLocation: "",
    email: "",
    phone1: "",
    phone2: "",
    logo: null,
    logoPreview: null,
  });

  const [additionalLocations, setAdditionalLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewLocationChange = (e) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address) {
      setAdditionalLocations([...additionalLocations, newLocation]);
      setNewLocation({ name: "", address: "" });
    } else {
      alert("Please fill in both the location name and address.");
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, logo: file, logoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("singaporeLocation", formData.singaporeLocation);
    formDataToSend.append("indiaLocation", formData.indiaLocation);
    formDataToSend.append("northRegionLocation", formData.northRegionLocation);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone1", formData.phone1);
    formDataToSend.append("phone2", formData.phone2);
    formDataToSend.append("additionalLocations", JSON.stringify(additionalLocations));
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    try {
      const response = await axiosInstance.post("/contact/update", formDataToSend); // Using axiosInstance

      const data = response.data;
      if (response.status === 200) {
        alert("Contact information updated successfully!");
      } else {
        alert(data.message || "Error updating contact information.");
      }
    } catch (error) {
      alert("Error submitting form. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="update-contact-form">
      <h1 className="form-title">Update Get In Touch Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group-update singapore-office-group">
            <label htmlFor="singaporeLocation" className="singapore-label">
              <FaMapMarkerAlt className="form-icon" /> Singapore Office Location
            </label>
            <textarea
              id="singaporeLocation"
              name="singaporeLocation"
              value={formData.singaporeLocation}
              onChange={handleInputChange}
              className="singapore-textarea"
            ></textarea>
          </div>
          <div className="form-group-update india-office-group">
            <label htmlFor="indiaLocation" className="india-label">
              <FaMapMarkerAlt className="form-icon" /> India Office Location
            </label>
            <textarea
              id="indiaLocation"
              name="indiaLocation"
              value={formData.indiaLocation}
              onChange={handleInputChange}
              className="india-textarea"
            ></textarea>
          </div>
          <div className="form-group-update north-region-office-group">
            <label htmlFor="northRegionLocation" className="north-region-label">
              <FaMapMarkerAlt className="form-icon" /> North Region Location
            </label>
            <textarea
              id="northRegionLocation"
              name="northRegionLocation"
              value={formData.northRegionLocation}
              onChange={handleInputChange}
              className="north-region-textarea"
            ></textarea>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group-update email-group">
            <label htmlFor="email" className="email-label">
              <FaEnvelope className="form-icon" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="email-input"
            />
          </div>
          <div className="form-group-update phone1-group">
            <label htmlFor="phone1" className="phone1-label">
              <FaPhoneAlt className="form-icon" /> Phone Number 1
            </label>
            <input
              type="text"
              id="phone1"
              name="phone1"
              value={formData.phone1}
              onChange={handleInputChange}
              className="phone1-input"
            />
          </div>
          <div className="form-group-update phone2-group">
            <label htmlFor="phone2" className="phone2-label">
              <FaPhoneAlt className="form-icon" /> Phone Number 2
            </label>
            <input
              type="text"
              id="phone2"
              name="phone2"
              value={formData.phone2}
              onChange={handleInputChange}
              className="phone2-input"
            />
          </div>
          <div className="form-group-update logo-upload-group">
            <label htmlFor="logo" className="logo-label">
              <FaUpload className="form-icon" /> Upload Logo
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoUpload}
              className="logo-input"
            />
            {formData.logoPreview && (
              <div className="logo-preview">
                <img src={formData.logoPreview} alt="Logo Preview" className="logo-preview-img" />
              </div>
            )}
          </div>
        </div>

        <div className="new-location">
          <h3 className="new-location-title">
            <FaPlusCircle className="form-icon" /> Add Additional Locations
          </h3>
          <div className="form-group-update new-location-name-group">
            <label htmlFor="newLocationName" className="new-location-name-label">Location Name</label>
            <input
              type="text"
              id="newLocationName"
              name="name"
              value={newLocation.name}
              onChange={handleNewLocationChange}
              className="new-location-name-input"
            />
          </div>
          <div className="form-group-update new-location-address-group">
            <label htmlFor="newLocationAddress" className="new-location-address-label">Location Address</label>
            <textarea
              id="newLocationAddress"
              name="address"
              value={newLocation.address}
              onChange={handleNewLocationChange}
              className="new-location-address-textarea"
            ></textarea>
          </div>
          <button type="button" className="add-btn new-location-add-btn" onClick={handleAddLocation}>
            Add Location
          </button>
        </div>

        {additionalLocations.length > 0 && (
          <div className="additional-locations">
            <h3 className="additional-locations-title">Additional Locations</h3>
            <ul className="additional-locations-list">
              {additionalLocations.map((loc, index) => (
                <li key={index} className="additional-locations-item">
                  <strong>{loc.name}:</strong> {loc.address}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="submit-btn">
          Update Data
        </button>
      </form>
    </div>
  );
};

export default UpdateContactForm;
