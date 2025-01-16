import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/Api';

const WorkingMember = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get('/working-members');
        setMembers(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="work-team-section">
        <h2 className="section-title">Meet Our Working Members</h2>
        <div className="work-team-container">
          {members.map((member) => (
            <div key={member._id} className="working-member">
              <img src={member.profileImageUrl} alt={member.name} className="member-photo" />
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.position}</p>
              <p className="member-description">{member.careerDetails}</p>
              <p className="contact-info">
                Email: <a href={`mailto:${member.email}`}>{member.email}</a>
                {member.phone && (
                  <>
                    <br />
                    Phone: <a href={`tel:${member.phone}`}>{member.phone}</a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkingMember;
