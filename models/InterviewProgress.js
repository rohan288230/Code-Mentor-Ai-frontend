const mongoose = require('mongoose');

const interviewProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookmarkedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InterviewQuestion' }],
  completedTopics: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewSubject' },
    topicId: { type: mongoose.Schema.Types.ObjectId }
  }],
  mockInterviewScores: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewSubject' },
    score: Number,
    feedback: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('InterviewProgress', interviewProgressSchema);
