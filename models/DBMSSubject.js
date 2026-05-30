const mongoose = require('mongoose');

const dbmsSubjectSchema = new mongoose.Schema({
  title: { type: String, required: true, default: 'Database Management System (DBMS)' },
  description: { type: String, required: true },
  difficulty: { type: String, default: 'Beginner to Advanced' },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DBMSTopic' }]
}, { timestamps: true });

module.exports = mongoose.model('DBMSSubject', dbmsSubjectSchema);
