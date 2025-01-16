import React, { useState, useEffect } from 'react';
import './AdminWorkingMember.css';
import axiosInstance from '../../Utils/Api'; // Import axiosInstance

const AdminWorkingMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    careerDetails: '',
    email: '',
    phone: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [members, setMembers] = useState([]);

  // Fetch existing members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axiosInstance.get('/working-members');
      setMembers(response.data);
    } catch (err) {
      setError('An error occurred while fetching members.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!profileImage) {
      setError('Profile image is required.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('position', formData.position);
      data.append('careerDetails', formData.careerDetails);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('profileImage', profileImage);

      const response = await axiosInstance.post('/working-members', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Working member added successfully.');
      setFormData({
        name: '',
        position: '',
        careerDetails: '',
        email: '',
        phone: '',
      });
      setProfileImage(null);
      fetchMembers(); // Refresh the list of members
    } catch (err) {
      setError('An error occurred while adding the working member.');
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setError('Invalid member ID.');
      return;
    }

    try {
      const response = await axiosInstance.delete(`/working-members/${id}`);
      setSuccess('Working member deleted successfully.');
      fetchMembers(); // Refresh the list of members
    } catch (err) {
      setError('An error occurred while deleting the working member.');
    }
  };

  return (
    <div className="admin-working-member">
      <h1 className="form-title">Add Working Member</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="working-member-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Upload Profile*</label>
            <input type="file" onChange={handleFileChange} required />
          </div>
          <div className="form-group">
            <label>Add Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Add Position*</label>
            <input
              type="text"
              name="position"
              placeholder="Enter position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Add Career Details*</label>
            <textarea
              name="careerDetails"
              placeholder="Add career details"
              rows="4"
              value={formData.careerDetails}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Add Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Add Phone Number*</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>

      <ul className="member-list">
        {members.map((member) => (
          <li key={member.id} className="member-item">
            <div className="member-details">
              <p>Name: {member.name}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(member._id)} // Use _id if MongoDB is used
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminWorkingMember;
