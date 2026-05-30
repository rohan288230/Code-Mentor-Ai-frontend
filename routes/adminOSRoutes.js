const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminOSController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/subject', protect, admin, adminController.getSubject);
router.get('/topics', protect, admin, adminController.getTopics);
router.post('/topic', protect, admin, adminController.createTopic);
router.delete('/topic/:id', protect, admin, adminController.deleteTopic);

router.get('/topic/:topicId/notes', protect, admin, adminController.getNotes);
router.post('/topic/:topicId/notes', protect, admin, adminController.saveNotes);

router.get('/topic/:topicId/questions', protect, admin, adminController.getQuestions);
router.post('/topic/:topicId/question', protect, admin, adminController.addQuestion);
router.delete('/question/:id', protect, admin, adminController.deleteQuestion);

router.get('/topic/:topicId/quiz', protect, admin, adminController.getQuiz);
router.post('/topic/:topicId/quiz', protect, admin, adminController.saveQuiz);

module.exports = router;
