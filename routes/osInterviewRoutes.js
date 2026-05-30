const express = require('express');
const router = express.Router();
const osController = require('../controllers/osInterviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/subject', protect, osController.getSubject);
router.get('/topics', protect, osController.getTopics);
router.get('/topic/:id', protect, osController.getTopicDetails);

router.get('/progress', protect, osController.getProgress);
router.post('/progress', protect, osController.markTopicCompleted);
router.post('/quiz', protect, osController.submitQuiz);
router.post('/mock', protect, osController.saveMockInterviewResult);

router.get('/mock-questions', protect, osController.getMockQuestions);

module.exports = router;
