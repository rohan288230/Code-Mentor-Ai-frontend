const express = require('express');
const router = express.Router();
const dbmsController = require('../controllers/dbmsInterviewController');
const { protect } = require('../middleware/authMiddleware');

// Public or basic routes (can be protected if needed, usually we protect everything in interview section)
router.use(protect);

router.get('/topics', dbmsController.getTopics);
router.get('/topic/:id', dbmsController.getTopicDetails);

router.get('/progress', dbmsController.getProgress);
router.post('/progress', dbmsController.updateProgress);

router.post('/quiz', dbmsController.submitQuiz);
router.post('/bookmark', dbmsController.toggleBookmark);

router.get('/mock-interview', dbmsController.getMockInterview);
router.post('/mock-interview/score', dbmsController.submitMockInterviewScore);

module.exports = router;
