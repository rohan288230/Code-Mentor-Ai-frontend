const mongoose = require('mongoose');

const dbmsQuestionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'DBMSTopic', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced', 'Scenario', 'SQL'], default: 'Medium' },
  companyTags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('DBMSQuestion', dbmsQuestionSchema);
