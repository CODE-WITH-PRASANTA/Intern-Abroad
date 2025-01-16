const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer-config');
const Country = require('../models/Country');

// Create a new country
router.post('/upload', upload.single('flag'), async (req, res) => {
  try {
    const { countryName } = req.body;

    if (!countryName || !req.file) {
      return res.status(400).json({ error: 'Country name and flag are required.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newCountry = new Country({
      name: countryName,
      flagUrl: result.secure_url,
    });
    await newCountry.save();

    res.status(201).json({
      message: 'Country added successfully',
      country: newCountry,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a country
router.put('/:id', upload.single('flag'), async (req, res) => {
  try {
    const { id } = req.params;
    const { countryName } = req.body;

    let updateData = { name: countryName };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.flagUrl = result.secure_url;
    }

    const updatedCountry = await Country.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCountry) {
      return res.status(404).json({ error: 'Country not found.' });
    }

    res.status(200).json({ message: 'Country updated successfully', country: updatedCountry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a country
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCountry = await Country.findByIdAndDelete(id);

    if (!deletedCountry) {
      return res.status(404).json({ error: 'Country not found.' });
    }

    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
