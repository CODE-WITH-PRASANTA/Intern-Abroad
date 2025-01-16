const mongoose = require('mongoose');

// Team Member Schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
});

const TeamMember = mongoose.model('TeamMember', teamSchema);

module.exports = TeamMember;
