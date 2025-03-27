const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
  }
});

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);
module.exports = PhoneNumber;
