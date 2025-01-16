import React, { useState } from 'react';
import axiosInstance from '../../Utils/Api'; // Importing axiosInstance
import './ExplorePrice.css';

const ExplorePrice = () => {
  const [formData, setFormData] = useState({
    img: null,
    courseName: '',
    pricing: '',
    details: '',
    likeCount: '',
    userCount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('img', formData.img);
    formDataToSend.append('courseName', formData.courseName);
    formDataToSend.append('pricing', formData.pricing);
    formDataToSend.append('details', formData.details);
    formDataToSend.append('likeCount', formData.likeCount);
    formDataToSend.append('userCount', formData.userCount);

    try {
      const response = await axiosInstance.post('/course/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Course uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading course:', error);
    }
  };

  return (
    <div className="course-upload-panel">
      <h2 className="course-upload-heading">Upload Course Details</h2>
      <form onSubmit={handleSubmit} className="course-upload-form">
        <div className="course-upload-row">
          <div className="course-upload-field">
            <label className="course-upload-label">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="course-upload-input"
            />
          </div>
          <div className="course-upload-field">
            <label className="course-upload-label">Course Name:</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              className="course-upload-input"
              required
            />
          </div>
        </div>
        <div className="course-upload-row">
          <div className="course-upload-field">
            <label className="course-upload-label">Pricing ($):</label>
            <input
              type="number"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              placeholder="Enter price"
              className="course-upload-input"
              required
            />
          </div>
          <div className="course-upload-field">
            <label className="course-upload-label">Details:</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter course details"
              rows="2"
              className="course-upload-textarea"
              required
            />
          </div>
        </div>
        <div className="course-upload-row">
          <div className="course-upload-field">
            <label className="course-upload-label">Like Count:</label>
            <input
              type="number"
              name="likeCount"
              value={formData.likeCount}
              onChange={handleChange}
              placeholder="Enter like count"
              className="course-upload-input"
              required
            />
          </div>
          <div className="course-upload-field">
            <label className="course-upload-label">User Count:</label>
            <input
              type="number"
              name="userCount"
              value={formData.userCount}
              onChange={handleChange}
              placeholder="Enter user count"
              className="course-upload-input"
              required
            />
          </div>
        </div>
        <button type="submit" className="course-upload-submit-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default ExplorePrice;
