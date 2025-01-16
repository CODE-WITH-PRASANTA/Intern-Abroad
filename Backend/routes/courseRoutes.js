// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const Course = require('../models/Course');
const upload = require('../config/multer-config');

router.post('/upload', upload.single('img'), async (req, res) => {
  try {
    const { courseName, pricing, details, likeCount, userCount, category } = req.body; // Include category
    const result = await cloudinary.uploader.upload(req.file.path);
    const imgUrl = result.secure_url;

    const newCourse = new Course({
      img: imgUrl,
      courseName,
      pricing,
      details,
      likeCount,
      userCount,
      category, // Save category
    });

    await newCourse.save();
    res.status(200).json({ message: 'Course uploaded successfully', data: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading course', error: error.message });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const { category } = req.query; // Read category filter from query params
    const filter = category ? { category } : {}; // If category is provided, filter by it
    const courses = await Course.find(filter); // Fetch filtered or all courses
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});


router.put('/:id', upload.single('img'), async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, pricing, details, likeCount, userCount, category } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      course.img = result.secure_url;
    }

    course.courseName = courseName;
    course.pricing = pricing;
    course.details = details;
    course.likeCount = likeCount;
    course.userCount = userCount;
    course.category = category; // Update category

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the course by ID
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Optional: Delete the image from Cloudinary if needed
    // Assuming the image URL is stored in the `img` field
    const publicId = course.img.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    // Delete the course
    await Course.findByIdAndDelete(id);

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

module.exports = router;
