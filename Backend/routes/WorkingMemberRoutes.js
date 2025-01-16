// routes/workingMember.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer-config');
const WorkingMember = require('../models/WorkingMember');

// Get all working members
router.get('/', async (req, res) => {
  try {
    const members = await WorkingMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', upload.single('profileImage'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'File not uploaded.' });
    }
  
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const newMember = new WorkingMember({
        name: req.body.name,
        position: req.body.position,
        careerDetails: req.body.careerDetails,
        email: req.body.email,
        phone: req.body.phone,
        profileImageUrl: result.secure_url,
      });
  
      const savedMember = await newMember.save();
      res.status(201).json(savedMember);
    } catch (err) {
      console.error("Error creating member:", err);
      res.status(500).json({ error: err.message });
    }
  });
  

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Invalid ID.' });
    }
  
    try {
      console.log("Deleting member with ID:", id); // Debug
      const deletedMember = await WorkingMember.findByIdAndDelete(id);
      if (!deletedMember) {
        return res.status(404).json({ message: 'Member not found.' });
      }
      res.json({ message: 'Member deleted successfully.' });
    } catch (err) {
      console.error(err); // Log the error
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
