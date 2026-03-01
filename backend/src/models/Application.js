const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job:        { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name:       { type: String, required: true },
  email:      { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  resumeLink: { type: String, required: true },
  coverNote:  { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);