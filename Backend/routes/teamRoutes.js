const express = require('express');
const TeamMember = require('../models/TeamMember');

const router = express.Router();

// Fetch all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new team member
router.post('/', async (req, res) => {
  const { name, position, facebook, twitter, linkedin } = req.body;

  try {
    const newMember = new TeamMember({
      name,
      position,
      facebook,
      twitter,
      linkedin,
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a team member's data
router.put('/:id', async (req, res) => {
  const { name, position, facebook, twitter, linkedin } = req.body;

  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { name, position, facebook, twitter, linkedin },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a team member
router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
