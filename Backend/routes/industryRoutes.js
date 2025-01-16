const express = require('express');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer-config');
const Industry = require('../models/Industry');

const router = express.Router();

// Create new industry with logo upload
router.post('/create', upload.single('logo'), async (req, res) => {
  try {
    // Upload the logo to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto', // Automatically detect the file type
    });

    // Create a new industry
    const newIndustry = new Industry({
      name: req.body.name,
      logo: result.secure_url, // Save Cloudinary URL
    });

    await newIndustry.save();
    res.status(201).json({ message: 'Industry created successfully!', industry: newIndustry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the industry.' });
  }
});

// Get all industries
router.get('/', async (req, res) => {
  try {
    const industries = await Industry.find();
    res.status(200).json(industries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching industries.' });
  }
});

// Update industry
router.put('/update/:id', upload.single('logo'), async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({ error: 'Industry not found.' });
    }

    let logoUrl = industry.logo;
    if (req.file) {
      // Upload the new logo to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
      });
      logoUrl = result.secure_url; // Update the logo URL
    }

    // Update the industry data
    industry.name = req.body.name || industry.name;
    industry.logo = logoUrl;

    await industry.save();
    res.status(200).json({ message: 'Industry updated successfully!', industry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the industry.' });
  }
});

// Delete industry
router.delete('/delete/:id', async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({ error: 'Industry not found.' });
    }

    await industry.remove();
    res.status(200).json({ message: 'Industry deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the industry.' });
  }
});

module.exports = router;
