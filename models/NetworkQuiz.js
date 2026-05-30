const mongoose = require('mongoose');

const networkQuizSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'NetworkTopic', required: true },
  title: { type: String },
  passingScore: { type: Number, default: 70 },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true },
    explanation: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('NetworkQuiz', networkQuizSchema);
