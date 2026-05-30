const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
