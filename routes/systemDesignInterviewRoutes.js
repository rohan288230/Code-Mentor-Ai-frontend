const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const {
  getSystemDesignSubject,
  getSystemDesignTopic,
  getProgress,
  updateProgress,
  submitQuiz,
  toggleBookmark,
  getMockInterview,
  saveMockScore
} = require('../controllers/systemDesignInterviewController.js');

const router = express.Router();

router.route('/')
  .get(protect, getSystemDesignSubject);

router.route('/progress')
  .get(protect, getProgress)
  .post(protect, updateProgress);

router.route('/quiz')
  .post(protect, submitQuiz);

router.route('/bookmark')
  .post(protect, toggleBookmark);

router.route('/mock-interview')
  .get(protect, getMockInterview);

router.route('/mock-interview/score')
  .post(protect, saveMockScore);

router.route('/topic/:id')
  .get(protect, getSystemDesignTopic);

module.exports = router;
