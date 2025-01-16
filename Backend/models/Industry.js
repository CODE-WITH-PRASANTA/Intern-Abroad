const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true }, // URL to Cloudinary image
});

const Industry = mongoose.model('Industry', industrySchema);

module.exports = Industry;
