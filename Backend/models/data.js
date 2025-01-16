const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  personalInfo: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    gender: { type: String, required: true },
  },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
  },
  internshipDetails: {
    type: { type: String, required: true }, // e.g., "Remote" or "In-Person"
    length: { type: String, required: true }, // e.g., "3 months"
    startDate: { type: String, required: true },
    paymentOption: { type: String, required: true },
  },
  paymentDetails: {
    utrNumber: { type: String, required: true }, // UTR/Transaction ID
    paymentMethod: { type: String, required: true }, // Selected payment method
  },
});

module.exports = mongoose.model('Data', dataSchema);
