const mongoose = require('mongoose');

const SystemDesignNotesSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemDesignTopic',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sections: [{
    title: String,
    content: String
  }]
}, { timestamps: true });

const SystemDesignNotes = mongoose.model('SystemDesignNotes', SystemDesignNotesSchema);
module.exports = SystemDesignNotes;
