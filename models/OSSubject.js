const mongoose = require('mongoose');

const OSSubjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' }
}, { timestamps: true });

module.exports = mongoose.model('OSSubject', OSSubjectSchema);
