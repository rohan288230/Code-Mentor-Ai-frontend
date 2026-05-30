const mongoose = require('mongoose');

const dbmsProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DBMSTopic' }],
  quizScores: {
    type: Map,
    of: Number, // topicId -> score
    default: {}
  },
  bookmarkedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DBMSQuestion' }],
  mockInterviewScores: [{
    score: Number,
    difficulty: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('DBMSProgress', dbmsProgressSchema);
