const mongoose = require('mongoose');

const dbmsQuizSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'DBMSTopic', required: true },
  title: { type: String, required: true, default: 'DBMS Topic Quiz' },
  passingScore: { type: Number, default: 70 },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('DBMSQuiz', dbmsQuizSchema);
