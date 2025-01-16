// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  singaporeLocation: { type: String, required: false },
  indiaLocation: { type: String, required: false },
  northRegionLocation: { type: String, required: false },
  email: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: { type: String, required: false },
  logo: { type: String, required: false }, // URL for the uploaded logo
  additionalLocations: [
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Contact', ContactSchema);
