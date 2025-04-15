const express = require('express');
const {
  createOrUpdateProfile,
  getProfile,
  applyToJob,
  getAppliedJobs,
  saveProfile
} = require('../controllers/studentController');

const router = express.Router();
router.post('/resume', saveProfile)
router.post('/profile', createOrUpdateProfile);
router.get('/profile/:email', getProfile);
router.post('/apply', applyToJob);
router.get('/applied/:email', getAppliedJobs);

module.exports = router;
