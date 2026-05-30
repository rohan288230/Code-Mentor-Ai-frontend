const mongoose = require('mongoose');

const OSQuestionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSTopic', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced', 'Scenario', 'Numerical'], default: 'Medium' },
  companyTags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('OSQuestion', OSQuestionSchema);
