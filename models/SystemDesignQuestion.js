const mongoose = require('mongoose');

const SystemDesignQuestionSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignTopic',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Advanced', 'Scenario', 'Architecture'],
    default: 'Medium'
  },
  companyTags: [{
    type: String
  }]
}, { timestamps: true });

const SystemDesignQuestion = mongoose.model('SystemDesignQuestion', SystemDesignQuestionSchema);
module.exports = SystemDesignQuestion;
