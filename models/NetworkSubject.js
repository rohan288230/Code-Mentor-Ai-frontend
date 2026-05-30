const mongoose = require('mongoose');

const networkSubjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NetworkTopic' }]
}, { timestamps: true });

module.exports = mongoose.model('NetworkSubject', networkSubjectSchema);
