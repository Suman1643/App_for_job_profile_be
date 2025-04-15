const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String, // ✅ Added
  type: String,    // ✅ Added
  description: String,
  roleType: { type: String, enum: ['Remote', 'Onsite'], default: 'Remote' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
