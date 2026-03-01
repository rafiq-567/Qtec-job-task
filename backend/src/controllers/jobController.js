const Job = require('../models/Job');

// GET /api/jobs  — supports ?search= ?category= ?location= ?jobType=
const getAllJobs = async (req, res) => {
  const { search, category, location, jobType } = req.query;
  const filter = {};
  if (search)   filter.$or = [{ title: { $regex: search, $options: 'i' } }, { company: { $regex: search, $options: 'i' } }];
  if (category) filter.category = category;
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (jobType)  filter.jobType  = jobType;
  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: jobs.length, data: jobs });
};

// GET /api/jobs/featured
const getFeaturedJobs = async (req, res) => {
  const jobs = await Job.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(8);
  res.json({ success: true, data: jobs });
};

// GET /api/jobs/:id
const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, data: job });
};

// POST /api/jobs
const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, data: job });
};

// DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, message: 'Job deleted' });
};

module.exports = { getAllJobs, getFeaturedJobs, getJobById, createJob, deleteJob };