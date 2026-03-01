const express = require('express');
const router = express.Router();
const { submitApplication, getAllApplications } = require('../controllers/applicationController');

router.post('/', submitApplication);
router.get('/',  getAllApplications);

module.exports = router;