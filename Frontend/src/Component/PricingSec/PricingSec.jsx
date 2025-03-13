import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaUserAlt, FaUsers } from 'react-icons/fa';
import axiosInstance from '../../Utils/Api'; // Import axiosInstance
import './PricingSec.css';

const PricingSec = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    console.log('Navigating to /internform'); // Debugging
    navigate('/signup');
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course/courses'); // Use axiosInstance
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="price-course-section">
      <h1>Explore Our Courses</h1>
      <div className="price-courses">
        {courses.map((course, index) => (
          <div className="price-course-card" key={index}>
            <img src={course.img} alt={course.courseName} className="course-image" />
            <div className="price-course-details">
              <div className="price-course-price">₹ {course.pricing}.00/-</div>
              <h3 className="price-course-title">{course.courseName}</h3>
              <div className="course-meta">
                <div className="author">
                  <FaUserAlt /> <span>Internfly Abroad</span>
                </div>
                <button
                  className="price-buy-now-btn"
                  onClick={handleBuyNow} // Navigation function
                >
                  Buy
                </button>
              </div>
              <p className="course-description">{course.details}</p>
              <div className="course-footer">
                <div className="stats">
                  <FaUsers /> {course.userCount}
                  <FaThumbsUp /> {course.likeCount}
                </div>
                <div className="rating">
                  {'★'.repeat(5)} {/* Always show 5 stars */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSec;
