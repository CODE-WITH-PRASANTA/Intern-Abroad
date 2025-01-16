const express = require('express');
const cloudinary = require('../config/cloudinary'); // Cloudinary config
const PaymentDetails = require('../models/PaymentDetails'); // MongoDB model for PaymentDetails
const upload = require('../config/multer-config'); // Multer configuration for image uploads

const router = express.Router();

// Route to upload payment details
router.post('/upload', upload.single('qrCode'), async (req, res) => {
  console.log('Received file:', req.file); // Log the file to check if it's received correctly
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'payment_qrcodes',
    });

    const { accountName, accountNumber, ifscCode, bankName, upiId } = req.body;
    const newPaymentDetails = new PaymentDetails({
      accountName,
      accountNumber,
      ifscCode,
      bankName,
      upiId,
      qrCodeUrl: result.secure_url, // Store the Cloudinary URL for the QR code
    });

    const savedPaymentDetails = await newPaymentDetails.save();
    res.status(200).json(savedPaymentDetails);
  } catch (error) {
    console.error('Error uploading QR code or saving payment details:', error);
    res.status(500).json({ message: 'Error uploading QR code or saving payment details', error });
  }
});

// Route to get existing payment details
router.get('/payment-details', async (req, res) => {
  try {
    const paymentDetails = await PaymentDetails.findOne(); // Retrieve the payment details (use pagination if needed)
    res.status(200).json(paymentDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment details', error });
  }
});

// Route to update existing payment details
router.put('/update', upload.single('qrCode'), async (req, res) => {
  try {
    const { accountName, accountNumber, ifscCode, bankName, upiId } = req.body;

    let qrCodeUrl = null;
    if (req.file) {
      // If a new QR code is uploaded, upload it to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'payment_qrcodes',
      });
      qrCodeUrl = result.secure_url;
    }

    const updatedPaymentDetails = await PaymentDetails.findOneAndUpdate(
      { _id: req.body.id }, // Update by ID
      {
        accountName,
        accountNumber,
        ifscCode,
        bankName,
        upiId,
        qrCodeUrl,
      },
      { new: true }
    );

    res.status(200).json(updatedPaymentDetails); // Respond with updated payment details
  } catch (error) {
    console.error('Error updating payment details:', error);
    res.status(500).json({ message: 'Error updating payment details', error });
  }
});

module.exports = router;
