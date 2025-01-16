
// routes/contactRoutes.js
const express = require('express');
const Contact = require('../models/Contact');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer-config');
const router = express.Router();

// Create or Update Contact Information
router.post('/update', upload.single('logo'), async (req, res) => {
  try {
    const {
      singaporeLocation,
      indiaLocation,
      northRegionLocation,
      email,
      phone1,
      phone2,
      additionalLocations,
    } = req.body;

    let logoUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      logoUrl = result.secure_url;
    }

    const contact = await Contact.findOneAndUpdate(
      {},
      {
        singaporeLocation,
        indiaLocation,
        northRegionLocation,
        email,
        phone1,
        phone2,
        logo: logoUrl,
        additionalLocations: JSON.parse(additionalLocations),
      },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ message: 'Contact information updated successfully!', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact information', error });
  }
});

// Get Contact Information
router.get('/', async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact information', error });
  }
});

// Delete Contact Information
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact information deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact information', error });
  }
});

module.exports = router;