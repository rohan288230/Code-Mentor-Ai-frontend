const mongoose = require('mongoose');

const dbmsTopicSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'DBMSSubject', required: true },
  title: { type: String, required: true },
  description: { type: String },
  estimatedDuration: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  order: { type: Number, default: 0 },
  notes: { type: mongoose.Schema.Types.ObjectId, ref: 'DBMSNotes' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'DBMSQuiz' }
}, { timestamps: true });

module.exports = mongoose.model('DBMSTopic', dbmsTopicSchema);
