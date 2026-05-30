const mongoose = require('mongoose');

const OSTopicSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSSubject', required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  estimatedDuration: { type: String, default: '60 Minutes' },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' }
}, { timestamps: true });

module.exports = mongoose.model('OSTopic', OSTopicSchema);
