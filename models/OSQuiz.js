const mongoose = require('mongoose');

const OSQuizSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSTopic', required: true },
  title: { type: String, required: true },
  passingScore: { type: Number, default: 70 },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true },
    explanation: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('OSQuiz', OSQuizSchema);
