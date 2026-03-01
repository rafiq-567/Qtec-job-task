const Application = require('../models/Application');
const Job = require('../models/Job');

// POST /api/applications
const submitApplication = async (req, res) => {
  const { jobId, name, email, resumeLink, coverNote } = req.body;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  const existing = await Application.findOne({ job: jobId, email });
  if (existing) return res.status(400).json({ success: false, message: 'You already applied for this job' });
  const application = await Application.create({ job: jobId, name, email, resumeLink, coverNote });
  res.status(201).json({ success: true, message: 'Application submitted!', data: application });
};

// GET /api/applications
const getAllApplications = async (req, res) => {
  const applications = await Application.find().populate('job', 'title company').sort({ createdAt: -1 });
  res.json({ success: true, count: applications.length, data: applications });
};

module.exports = { submitApplication, getAllApplications };