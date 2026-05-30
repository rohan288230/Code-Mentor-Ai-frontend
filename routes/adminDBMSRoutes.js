const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminDBMSController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.get('/subject', adminController.getSubject);

router.get('/topics', adminController.getTopics);
router.post('/topic', adminController.createTopic);
router.delete('/topic/:id', adminController.deleteTopic);

router.get('/topic/:topicId/notes', adminController.getNotes);
router.post('/topic/:topicId/notes', adminController.saveNotes);

router.get('/topic/:topicId/questions', adminController.getQuestions);
router.post('/topic/:topicId/question', adminController.addQuestion);
router.delete('/question/:questionId', adminController.deleteQuestion);

router.get('/topic/:topicId/quiz', adminController.getQuiz);
router.post('/topic/:topicId/quiz', adminController.saveQuiz);

module.exports = router;
