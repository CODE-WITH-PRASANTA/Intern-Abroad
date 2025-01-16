import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/Api';
import './HomeTeam.css';

// Import your logo images
import FaceBookLogo from '../../assets/Facebook-logo-png.png';
import TwitterLogo from '../../assets/Twitter-logo.png';
import LinkedinLogo from '../../assets/linkedin-logo.png';

// Import photos for the team members
import Member1Photo from '../../assets/Maria Cecilia.webp'; // Replace with actual paths
import Member2Photo from '../../assets/Nezzarraine Bernardo.jpg';
import Member3Photo from '../../assets/Sheevendra Kumar.png';
import Member4Photo from '../../assets/Prashant Kumar.png';

const HomeTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axiosInstance.get('/team'); // Using axiosInstance
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  // Limit to 4 members (either from API or manually set the limit)
  const limitedTeamMembers = teamMembers.slice(0, 4);

  // Add photos for the members
  const teamPhotos = [Member1Photo, Member2Photo, Member3Photo, Member4Photo];

  return (
    <div>
      <h2 className="Home-Team-heading">Meet The Whole Team</h2>
      <div className="Home-Team-container">
        {limitedTeamMembers.map((member, index) => (
          <div key={member._id} className="Home-Team-member">
            {/* Display team member photo */}
            <img src={teamPhotos[index]} alt={member.name} className="Home-Team-photo" />
            <h3 className="Home-Team-name">{member.name}</h3>
            <p className="Home-Team-role">{member.position}</p>
            <div className="Home-social-links">
              <a href={member.facebook}>
                <img src={FaceBookLogo} alt="Facebook" />
              </a>
              <a href={member.twitter}>
                <img src={TwitterLogo} alt="Twitter" />
              </a>
              <a href={member.linkedin}>
                <img src={LinkedinLogo} alt="LinkedIn" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTeam;
