const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');

const topicContent = `const mongoose = require('mongoose');

const OSTopicSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSSubject', required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  estimatedDuration: { type: String, default: '60 Minutes' },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' }
}, { timestamps: true });

module.exports = mongoose.model('OSTopic', OSTopicSchema);
`;

const notesContent = `const mongoose = require('mongoose');

const OSNotesSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSTopic', required: true },
  content: { type: String, required: true },
  sections: [{
    title: String,
    content: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('OSNotes', OSNotesSchema);
`;

const questionContent = `const mongoose = require('mongoose');

const OSQuestionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSTopic', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced', 'Scenario', 'Numerical'], default: 'Medium' },
  companyTags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('OSQuestion', OSQuestionSchema);
`;

const quizContent = `const mongoose = require('mongoose');

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
`;

const progressContent = `const mongoose = require('mongoose');

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
`;

fs.writeFileSync(path.join(modelsDir, 'OSTopic.js'), topicContent);
fs.writeFileSync(path.join(modelsDir, 'OSNotes.js'), notesContent);
fs.writeFileSync(path.join(modelsDir, 'OSQuestion.js'), questionContent);
fs.writeFileSync(path.join(modelsDir, 'OSQuiz.js'), quizContent);
fs.writeFileSync(path.join(modelsDir, 'OSProgress.js'), progressContent);
console.log('Models created successfully.');
