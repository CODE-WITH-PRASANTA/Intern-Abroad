const mongoose = require('mongoose');

const InternshipApplicationSchema = new mongoose.Schema({
  day: { type: String },
  month: { type: String },
  year: { type: String },
  gender: { type: String },
  phone: { type: String },
  email: { type: String },
  name: { type: String },
  nationality: { type: String },
  address: { type: String },
  internshipType: { type: String },
  selectedIndustries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Industry" }],
  location: { type: String }, // Added location field
  internshipLength: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  internshipStartDate: { type: Date },
  internshipDetails: { type: String },
  utrNo: { type: Number },
  paymentMethod: { type: String },
});

const InternshipApplication = mongoose.model('InternshipApplication', InternshipApplicationSchema);
module.exports = InternshipApplication;
