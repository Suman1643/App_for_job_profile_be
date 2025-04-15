const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  phone: String,
  summary: String,
  education: String,
  experience: String,
  skills: String,
  projects: String,
  certifications: String,
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
