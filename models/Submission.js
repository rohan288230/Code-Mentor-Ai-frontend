const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compile Error', 'Pending'], required: true },
  executionTime: { type: String }, // For piston
  runtime: { type: String },
  memory: { type: String },
  memoryBytes: { type: Number },
  output: { type: String },
  passedCases: { type: Number },
  totalCases: { type: Number },
  results: [
    {
      testCase: Number,
      passed: Boolean,
      isHidden: Boolean,
      status: String,
    },
  ],
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

submissionSchema.index({ userId: 1, problemId: 1, submittedAt: -1 });

module.exports = mongoose.model('Submission', submissionSchema);
