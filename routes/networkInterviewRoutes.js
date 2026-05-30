const express = require('express');
const router = express.Router();
const networkInterviewController = require('../controllers/networkInterviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', networkInterviewController.getNetworkSubject);
router.get('/topics', networkInterviewController.getAllTopics);
router.get('/topic/:id', networkInterviewController.getTopicDetails);

// Mock Interview
router.get('/mock-interview', protect, networkInterviewController.getMockInterview);
router.post('/mock-interview/score', protect, networkInterviewController.saveMockInterviewScore);

// Progress
router.get('/progress', protect, networkInterviewController.getUserProgress);
router.post('/progress', protect, networkInterviewController.updateProgress);
router.post('/quiz', protect, networkInterviewController.submitQuiz);
router.post('/bookmark', protect, networkInterviewController.toggleBookmark);

module.exports = router;
