const express = require('express');
const router = express.Router();
const adminNetworkController = require('../controllers/adminNetworkController');
const { protect, admin } = require('../middleware/authMiddleware');

// Apply admin protection to all routes
router.use(protect);
router.use(admin);

// Subject & Topics
router.get('/subject', adminNetworkController.getSubject);
router.get('/topics', adminNetworkController.getTopics);
router.post('/topic', adminNetworkController.createTopic);
router.put('/topic/:id', adminNetworkController.updateTopic);
router.delete('/topic/:id', adminNetworkController.deleteTopic);

// Notes
router.get('/topic/:topicId/notes', adminNetworkController.getNotes);
router.post('/topic/:topicId/notes', adminNetworkController.saveNotes);

// Questions
router.get('/topic/:topicId/questions', adminNetworkController.getQuestions);
router.post('/topic/:topicId/question', adminNetworkController.createQuestion);
router.put('/question/:id', adminNetworkController.updateQuestion);
router.delete('/question/:id', adminNetworkController.deleteQuestion);

// Quiz
router.get('/topic/:topicId/quiz', adminNetworkController.getQuiz);
router.post('/topic/:topicId/quiz', adminNetworkController.saveQuiz);

module.exports = router;
