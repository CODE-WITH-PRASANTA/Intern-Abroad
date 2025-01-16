const InternshipApplication = require('../models/InternshipApplication');


exports.createApplication = async (req, res) => {
  try {
    const applicationData = {};

    // Loop through the request body and only add non-empty fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        applicationData[key] = req.body[key];
      }
    });

    const application = new InternshipApplication(applicationData);
    await application.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(400).json({ error: error.message });
  }
};

