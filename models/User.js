const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  streak: { type: Number, default: 0 },
  solvedProblems: { type: Number, default: 0 },
  easySolved: { type: Number, default: 0 },
  mediumSolved: { type: Number, default: 0 },
  hardSolved: { type: Number, default: 0 },
  acceptanceRate: { type: Number, default: 0 },
  globalRanking: { type: Number, default: null },
  mockInterviewScore: { type: Number, default: 0 },
  completedCourses: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  recentActivity: { type: Array, default: [] },
  activityLog: [{ date: { type: Date, default: Date.now }, action: String }],
  badges: [{ type: String }],
  achievements: { type: Array, default: [] },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  courseProgress: {
    type: Map,
    of: {
      completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
      completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
      quizScores: {
        type: Map,
        of: Number
      }
    },
    default: {}
  }
}, { timestamps: true });

userSchema.pre('save', async function () {

  try {

    const today = new Date();

    const lastActive = this.lastActive
      ? new Date(this.lastActive)
      : null;

    if (!lastActive) {

      this.streak = 0;

    } else {

      const diffTime = today - lastActive;

      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {

        this.streak += 1;

      } else if (diffDays > 1) {

        this.streak = 1;

      }

    }

    this.lastActive = today;

  } catch (error) {

    console.error('Error updating streak:', error);

  }

});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
