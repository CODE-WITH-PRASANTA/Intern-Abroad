const express = require('express');
const { createApplication } = require('../controllers/internshipController');
const router = express.Router();
const InternshipApplication = require('../models/InternshipApplication');

router.post('/apply', createApplication);

// Route to fetch all internship applications
router.get('/', async (req, res) => {
    try {
      const applications = await InternshipApplication.find()
        .populate('selectedIndustries')
        .populate('courses');
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

module.exports = router;
