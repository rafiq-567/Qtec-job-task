const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  company:     { type: String, required: true },
  location:    { type: String, required: true },
  category:    { type: String, required: true, enum: ['Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource'] },
  jobType:     { type: String, required: true, enum: ['Full-Time','Part-Time','Contract','Remote'], default: 'Full-Time' },
  description: { type: String, required: true },
  requirements:{ type: String, default: '' },
  salary:      { type: String, default: '' },
  isFeatured:  { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);