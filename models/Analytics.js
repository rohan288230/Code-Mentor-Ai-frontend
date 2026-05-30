const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  problemsSolved: { type: Number, default: 0 },
  lessonsCompleted: { type: Number, default: 0 },
  timeSpentMinutes: { type: Number, default: 0 }
}, { timestamps: true });

// Prevent multiple analytics documents for the same user on the same day
analyticsSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
