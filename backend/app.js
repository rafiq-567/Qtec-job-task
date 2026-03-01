const express = require('express');
const cors = require('cors');

const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => res.json({ message: 'QuickHire API is running' }));

module.exports = app;