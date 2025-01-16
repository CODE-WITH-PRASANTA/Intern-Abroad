const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.post('/submit', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(200).json({ message: 'Payment saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save payment' });
  }
});

// Get All Payments
router.get('/', async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  });

module.exports = router;
