import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/Api'; // Assuming this is your axios instance
import Swal from 'sweetalert2';
import './UpdatePrice.css';

const categories = ['6 Weeks', '2 Months', '3 Months', '4 Months', '5 Months', '6 Months'];

const UpdatePrice = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    img: null,
    courseName: '',
    pricing: '',
    details: '',
    likeCount: '',
    userCount: '',
    category: '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course/courses');
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize with all courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredCourses(courses.filter((course) => course.category === category));
    } else {
      setFilteredCourses(courses);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormData({
      img: null,
      courseName: course.courseName,
      pricing: course.pricing,
      details: course.details,
      likeCount: course.likeCount,
      userCount: course.userCount,
      category: course.category,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const confirmResult = await Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    });

    if (confirmResult.isConfirmed) {
      const formDataToSend = new FormData();
      if (formData.img) formDataToSend.append('img', formData.img);
      formDataToSend.append('courseName', formData.courseName);
      formDataToSend.append('pricing', formData.pricing);
      formDataToSend.append('details', formData.details);
      formDataToSend.append('likeCount', formData.likeCount);
      formDataToSend.append('userCount', formData.userCount);
      formDataToSend.append('category', formData.category);

      try {
        const response = await axiosInstance.put(
          `/course/${selectedCourse._id}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        Swal.fire('Saved!', 'Course updated successfully!', 'success');
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === selectedCourse._id ? response.data : course
          )
        );
        setFilteredCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === selectedCourse._id ? response.data : course
          )
        );
        setSelectedCourse(null);
      } catch (error) {
        console.error('Error updating course:', error);
        Swal.fire('Failed!', 'Failed to update course.', 'error');
      }
    } else if (confirmResult.isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await axiosInstance.delete(`/course/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
      setFilteredCourses(filteredCourses.filter((course) => course._id !== courseId));
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course.');
    }
  };

  return (
    <div className="update-price-panel">
      <h2 className="update-price-heading">Manage Courses</h2>

      <div className="filter-panel">
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="course-list">
        {filteredCourses.map((course) => (
          <div key={course._id} className="update-course-card">
            <img src={course.img} alt={course.courseName} className="update-course-image" />
            <h3>{course.courseName}</h3>
            <p>Category: {course.category}</p>
            <p>Price: ${course.pricing}</p>
            <p>{course.details}</p>
            <p>Likes: {course.likeCount}</p>
            <p>Users: {course.userCount}</p>
            <button onClick={() => handleEdit(course)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => handleDelete(course._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="edit-panel">
          <h2>Edit Course</h2>
          <form onSubmit={handleUpdate} className="edit-form">
            <label>
              Upload New Image:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
            <label>
              Course Name:
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Pricing ($):
              <input
                type="number"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Details:
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Like Count:
              <input
                type="number"
                name="likeCount"
                value={formData.likeCount}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              User Count:
              <input
                type="number"
                name="userCount"
                value={formData.userCount}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Category:
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setSelectedCourse(null)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePrice;
