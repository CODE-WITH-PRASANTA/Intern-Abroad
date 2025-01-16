import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/Api';
import './TeamMember.css';

const TeamMember = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    facebook: '',
    twitter: '',
    linkedin: '',
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axiosInstance.get('/team');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };
    fetchTeamMembers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axiosInstance.put(`/team/${editing}`, formData);
        setEditing(null);
      } else {
        await axiosInstance.post('/team', formData);
      }
      setFormData({
        name: '',
        position: '',
        facebook: '',
        twitter: '',
        linkedin: '',
      });
      const response = await axiosInstance.get('/team');
      setTeamMembers(response.data);
    } catch (error) {
      console.error(`Error ${editing ? 'updating' : 'adding'} member:`, error);
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      position: member.position,
      facebook: member.facebook,
      twitter: member.twitter,
      linkedin: member.linkedin,
    });
    setEditing(member._id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/team/${id}`);
      const response = await axiosInstance.get('/team');
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="manage-team">
      <h2>Manage Team Members</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="facebook"
            placeholder="Facebook URL"
            value={formData.facebook}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            value={formData.twitter}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{editing ? 'Update' : 'Add'} Member</button>
      </form>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div key={member._id} className="team-card">
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <div className="team-card-actions">
              <button onClick={() => handleEdit(member)}>Edit</button>
              <button onClick={() => handleDelete(member._id)}>Delete</button>
            </div>
            <div className="social-links-admin">
              <a href={member.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
