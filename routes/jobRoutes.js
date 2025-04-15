const express = require('express');
const { postJob, getAllJobs } = require('../controllers/jobController');
const router = express.Router();

router.post('/post', postJob);
router.get('/all', getAllJobs);

module.exports = router;
