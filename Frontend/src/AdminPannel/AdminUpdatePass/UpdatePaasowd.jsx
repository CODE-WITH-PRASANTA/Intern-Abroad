import React, { useState } from 'react';
import axiosInstance from '../../Utils/Api'; // Import the configured axios instance
import './UpdatePassword.css';
import UpdatePassLeft from '../../assets/Password-Admin.svg';

const UpdatePassword = () => {
  const [isCreateAdmin, setIsCreateAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    setIsCreateAdmin((prev) => !prev);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isCreateAdmin ? '/create' : '/update-password';
    const payload = isCreateAdmin ? { email, password } : { email, newPassword: password };

    try {
      const response = await axiosInstance.post(`/admin${endpoint}`, payload); // Use axiosInstance
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="update-password-container">
      <div className="update-password-box">
        <div className="update-password-left">
          <img src={UpdatePassLeft} alt="Illustration" />
        </div>
        <div className="update-password-right">
          <h2>{isCreateAdmin ? 'Create Admin' : 'Update Admin Password'}</h2>
          <p>
            {isCreateAdmin
              ? 'Enter details to create a new admin account.'
              : 'Enter your details to update the admin password securely.'}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder={isCreateAdmin ? 'Enter Password' : 'Enter New Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="update-btn">
              {isCreateAdmin ? 'Confirm' : 'Update Password'}
            </button>
          </form>
          <div className="admin-options">
            <button className="create-admin-btn" onClick={handleToggle}>
              {isCreateAdmin ? 'Go to Update Password' : 'Create a New Admin'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
