const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  constraints: [{ type: String }],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  topic: { type: String, required: true },
  hints: [{ type: String }],
  testCases: [
    {
      input: { type: String, required: true },
      expectedOutput: { type: String, required: true },
      isHidden: { type: Boolean, default: false }
    }
  ],
  starterCode: {
    python: { type: String },
    java: { type: String },
    cpp: { type: String },
    c: { type: String }
  },
  solution: {
    python: { type: String },
    java: { type: String },
    cpp: { type: String },
    c: { type: String }
  },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);
