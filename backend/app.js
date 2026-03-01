const express = require('express');
const cors = require('cors');

const authRoutes        = require('./src/routes/auth');
const jobRoutes         = require('./src/routes/jobs');
const applicationRoutes = require('./src/routes/applications');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',         authRoutes);
app.use('/api/jobs',         jobRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => res.json({ message: 'QuickHire API ✅' }));

module.exports = app;