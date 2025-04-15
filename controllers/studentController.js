const Student = require('../models/Student');
const Job = require('../models/Job');

exports.saveProfile = async (req, res) => {
  try {
    const { studentId, name, email, resumeUrl, skills } = req.body;

    // Check if student already exists
    let student = await Student.findById(studentId);

    if (student) {
      // Update existing student
      student.name = name;
      student.email = email;
      student.resumeUrl = resumeUrl;
      student.skills = skills;

      await student.save();
      return res.status(200).json({ message: 'Profile updated', student });
    } else {
      // Create new student
      student = await Student.create({
        _id: studentId, // optional: only if you're using custom IDs
        name,
        email,
        resumeUrl,
        skills,
      });
      return res.status(201).json({ message: 'Profile saved', student });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to save profile' });
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOneAndUpdate({ email }, req.body, { new: true, upsert: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    res.json(student);
  } catch (err) {
    res.status(404).json({ error: 'Student not found' });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const { email, jobId } = req.body;
    const student = await Student.findOne({ email });
    if (!student.appliedJobs.includes(jobId)) {
      student.appliedJobs.push(jobId);
      await student.save();
    }
    res.json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email }).populate('appliedJobs');
    res.json(student.appliedJobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
