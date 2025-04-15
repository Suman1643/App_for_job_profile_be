const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume'); // assuming you created a Mongoose model

// Save resume
router.post('/save', async (req, res) => {
  try {
    const { userId, name, email, phone, summary, education, experience, skills, projects, certifications } = req.body;
    const existing = await Resume.findOne({ userId });

    if (existing) {
      await Resume.updateOne({ userId }, { ...req.body });
      return res.status(200).json({ message: 'Resume updated successfully' });
    }

    await Resume.create(req.body);
    res.status(201).json({ message: 'Resume saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Fetch resume
router.get('/:userId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching resume' });
  }
});

module.exports = router;
