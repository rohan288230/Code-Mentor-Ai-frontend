const mongoose = require('mongoose');

const SystemDesignTopicSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignSubject',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  order: {
    type: Number,
    required: true
  },
  estimatedDuration: {
    type: String,
    default: '60 Minutes'
  },
  difficulty: {
    type: String,
    default: 'Intermediate'
  },
  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignNotes'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignQuiz'
  }
}, { timestamps: true });

const SystemDesignTopic = mongoose.model('SystemDesignTopic', SystemDesignTopicSchema);
module.exports = SystemDesignTopic;
