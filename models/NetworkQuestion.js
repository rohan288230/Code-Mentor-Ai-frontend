const mongoose = require('mongoose');

const networkQuestionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'NetworkTopic', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced', 'Scenario'] },
  companyTags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('NetworkQuestion', networkQuestionSchema);
