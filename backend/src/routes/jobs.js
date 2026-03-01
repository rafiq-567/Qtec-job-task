const express = require('express');
const router = express.Router();
const { getAllJobs, getFeaturedJobs, getJobById, createJob, deleteJob } = require('../controllers/jobController');

router.get('/featured', getFeaturedJobs); // must be before /:id
router.get('/',         getAllJobs);
router.get('/:id',      getJobById);
router.post('/',        createJob);
router.delete('/:id',   deleteJob);

module.exports = router;