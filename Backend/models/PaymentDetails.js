const mongoose = require('mongoose');

const paymentDetailsSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankName: { type: String, required: true },
  upiId: { type: String, required: true },
  qrCodeUrl: { type: String, required: true }, // Cloudinary URL for the QR code
});

const PaymentDetails = mongoose.model('PaymentDetails', paymentDetailsSchema);

module.exports = PaymentDetails;
