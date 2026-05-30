const mongoose = require('mongoose');

const OSProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OSTopic' }],
  quizScores: [{
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSQuiz' },
    score: Number,
    passed: Boolean,
    date: { type: Date, default: Date.now }
  }],
  mockInterviewScores: [{
    score: Number,
    feedback: String,
    date: { type: Date, default: Date.now }
  }],
  bookmarkedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OSQuestion' }],
  bookmarkedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OSTopic' }]
}, { timestamps: true });

module.exports = mongoose.model('OSProgress', OSProgressSchema);
