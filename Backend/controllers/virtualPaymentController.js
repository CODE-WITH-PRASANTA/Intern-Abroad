// controllers/virtualPaymentController.js
const cloudinary = require('../config/cloudinary');
const VirtualPayment = require('../models/VirtualPayment');

const uploadQRCode = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
  }
};

const createVirtualPayment = async (req, res) => {
  const { qrCode, upiId, accountName, accountNo, ifscCode, bankName } = req.body;

  try {
    const virtualPayment = new VirtualPayment({
      qrCode,
      upiId,
      accountName,
      accountNo,
      ifscCode,
      bankName
    });

    await virtualPayment.save();
    res.status(201).json({ message: 'Payment data created successfully', data: virtualPayment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save payment data' });
  }
};

const getVirtualPaymentData = async (req, res) => {
  try {
    const paymentData = await VirtualPayment.findOne();
    if (!paymentData) {
      return res.status(404).json({ message: 'No payment data found' });
    }
    res.status(200).json(paymentData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payment data' });
  }
};

module.exports = {
  uploadQRCode,
  createVirtualPayment,
  getVirtualPaymentData
};
