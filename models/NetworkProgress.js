const mongoose = require('mongoose');

const networkProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  completedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NetworkTopic' }],
  quizScores: {
    type: Map,
    of: Number,
    default: {}
  },
  bookmarkedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NetworkQuestion' }],
  bookmarkedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NetworkNotes' }],
  mockInterviewScores: [{
    score: Number,
    date: { type: Date, default: Date.now },
    difficulty: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('NetworkProgress', networkProgressSchema);
