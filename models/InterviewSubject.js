const mongoose = require('mongoose');

const interviewSubjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g. "dsa", "system-design"
  description: { type: String, required: true },
  icon: { type: String }, // optional icon class
  topics: [{
    title: { type: String, required: true },
    content: { type: String } // Markdown notes
  }],
}, { timestamps: true });

module.exports = mongoose.model('InterviewSubject', interviewSubjectSchema);
