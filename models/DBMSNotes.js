const mongoose = require('mongoose');

const dbmsNotesSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'DBMSTopic', required: true },
  content: { type: String, required: true },
  sections: [{
    title: String,
    content: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('DBMSNotes', dbmsNotesSchema);
