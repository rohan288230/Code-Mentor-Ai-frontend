const mongoose = require('mongoose');

const networkTopicSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'NetworkSubject', required: true },
  title: { type: String, required: true },
  description: { type: String },
  estimatedDuration: { type: String },
  difficulty: { type: String },
  learningObjectives: [{ type: String }],
  order: { type: Number, default: 0 },
  notes: { type: mongoose.Schema.Types.ObjectId, ref: 'NetworkNotes' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'NetworkQuiz' }
}, { timestamps: true });

module.exports = mongoose.model('NetworkTopic', networkTopicSchema);
