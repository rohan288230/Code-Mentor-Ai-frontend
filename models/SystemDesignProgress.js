const mongoose = require('mongoose');

const SystemDesignProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedTopics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignTopic'
  }],
  quizScores: {
    type: Map,
    of: Number,
    default: {}
  },
  bookmarkedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignQuestion'
  }],
  mockInterviewScores: [{
    score: Number,
    difficulty: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const SystemDesignProgress = mongoose.model('SystemDesignProgress', SystemDesignProgressSchema);
module.exports = SystemDesignProgress;
