const PhoneNumber = require('../models/PhoneNumber');

// Get the saved phone number (only 1 allowed)
exports.getPhoneNumber = async (req, res) => {
  try {
    const phone = await PhoneNumber.findOne();
    if (!phone) return res.status(404).json({ message: 'No phone number found' });
    res.json(phone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new phone number (only one allowed)
exports.addPhoneNumber = async (req, res) => {
  try {
    const existingPhone = await PhoneNumber.findOne();
    if (existingPhone) return res.status(400).json({ message: 'Only one phone number allowed' });

    const phone = new PhoneNumber({ number: req.body.number });
    await phone.save();
    res.status(201).json({ message: 'Phone number added successfully', phone });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update phone number
exports.updatePhoneNumber = async (req, res) => {
  try {
    const phone = await PhoneNumber.findOne();
    if (!phone) return res.status(404).json({ message: 'No phone number found' });

    phone.number = req.body.number;
    await phone.save();
    res.json({ message: 'Phone number updated successfully', phone });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete phone number
exports.deletePhoneNumber = async (req, res) => {
  try {
    const phone = await PhoneNumber.findOne();
    if (!phone) return res.status(404).json({ message: 'No phone number found' });

    await PhoneNumber.deleteOne();
    res.json({ message: 'Phone number deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
