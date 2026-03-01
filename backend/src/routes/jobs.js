const express = require('express');
const router = express.Router();
const { getAllJobs, getFeaturedJobs, getJobById, createJob, deleteJob } = require('../controllers/jobController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/featured', getFeaturedJobs);
router.get('/',         getAllJobs);
router.get('/:id',      getJobById);
router.post('/',        protect, adminOnly, createJob);
router.delete('/:id',   protect, adminOnly, deleteJob);

module.exports = router;