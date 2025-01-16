const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  img: String,
  courseName: String,
  pricing: String,
  details: String,
  likeCount: Number,
  userCount: Number,
  category: String, // Add category field
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
