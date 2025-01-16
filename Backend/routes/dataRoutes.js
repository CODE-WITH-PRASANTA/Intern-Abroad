const express = require('express');
const router = express.Router();
const Data = require('../models/data');

router.post('/save', async (req, res) => {
    try {
      // Log request body to ensure data is received correctly
      console.log("Received data:", req.body);
  
      // Assuming you have a User model to save the data
      const userData = req.body;
      
      // Perform database save (Example)
      const newUser = new User(userData);
      await newUser.save();
  
      // Respond with success message
      res.status(201).json({ message: 'User data saved successfully!' });
  
    } catch (error) {
      console.error("Error occurred in /save endpoint:", error); // Log the detailed error
      res.status(500).json({ message: 'Server error occurred while saving data', error: error.message });
    }
  });
  
// Route to get all users (optional)
router.get('/data', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
