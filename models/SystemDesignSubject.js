const mongoose = require('mongoose');

const SystemDesignSubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    default: 'Beginner to Advanced'
  },
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignTopic'
  }]
}, { timestamps: true });

const SystemDesignSubject = mongoose.model('SystemDesignSubject', SystemDesignSubjectSchema);
module.exports = SystemDesignSubject;
