const mongoose = require('mongoose');

const SystemDesignQuizSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignTopic',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  passingScore: {
    type: Number,
    default: 70
  },
  questions: [{
    questionText: String,
    options: [String],
    correctAnswerIndex: Number
  }]
}, { timestamps: true });

const SystemDesignQuiz = mongoose.model('SystemDesignQuiz', SystemDesignQuizSchema);
module.exports = SystemDesignQuiz;
