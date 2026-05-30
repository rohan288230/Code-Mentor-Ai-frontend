const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
