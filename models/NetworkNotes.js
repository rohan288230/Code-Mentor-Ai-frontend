const mongoose = require('mongoose');

const networkNotesSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'NetworkTopic', required: true },
  content: { type: String, required: true }, // Store markdown content directly or as an array of sections
  sections: [{
    title: { type: String },
    content: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('NetworkNotes', networkNotesSchema);
