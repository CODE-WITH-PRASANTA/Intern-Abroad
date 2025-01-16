// models/WorkingMember.js
const mongoose = require('mongoose');

const WorkingMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  careerDetails: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profileImageUrl: { type: String, required: true }, // URL from Cloudinary
});

module.exports = mongoose.model('WorkingMember', WorkingMemberSchema);
