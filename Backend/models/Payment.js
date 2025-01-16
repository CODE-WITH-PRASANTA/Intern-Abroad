const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  phone: String,
  nationality: String,
  programEmail: String,
  startDate: String,
  selectedIndustry: String,
  selectedDuration: String,
  utrNo: String,
  paymentMethod: String,
});

module.exports = mongoose.model('Payment', PaymentSchema);
