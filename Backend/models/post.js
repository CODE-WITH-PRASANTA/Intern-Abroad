const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title: String,
  slug: String,
  summary: String,
  keywords: String,
  tags: [String], // Changed to an array of strings (tags can be multiple)
  optionalUrl: String,
  content: String,  // Store HTML content as string
  headContent: String,
  imageUrl: String,
  imagePublicId: String,
  company: { type: String, default: 'Intern Abroad' }, // Add company field
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
