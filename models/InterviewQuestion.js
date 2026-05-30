const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewSubject', required: true },
  type: { type: String, enum: ['MCQ', 'Technical', 'HR'], required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  questionText: { type: String, required: true },
  // For MCQs
  options: [String],
  correctOptionIndex: { type: Number },
  // For Technical/HR
  expectedAnswer: { type: String },
  aiExplanation: { type: String },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);
