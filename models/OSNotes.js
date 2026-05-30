const mongoose = require('mongoose');

const OSNotesSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'OSTopic', required: true },
  content: { type: String, required: true },
  sections: [{
    title: String,
    content: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('OSNotes', OSNotesSchema);
