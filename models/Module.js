const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  isLocked: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);
