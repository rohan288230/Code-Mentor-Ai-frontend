const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware.js');
const {
  getSubject,
  getTopics,
  createTopic,
  deleteTopic,
  getTopicNotes,
  updateTopicNotes,
  getTopicQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getTopicQuiz,
  updateTopicQuiz
} = require('../controllers/adminSystemDesignController.js');

const router = express.Router();

router.use(protect, admin);

router.route('/subject').get(getSubject);
router.route('/topics').get(getTopics);
router.route('/topic').post(createTopic);
router.route('/topic/:id').delete(deleteTopic);

router.route('/topic/:topicId/notes')
  .get(getTopicNotes)
  .post(updateTopicNotes);

router.route('/topic/:topicId/questions')
  .get(getTopicQuestions);

router.route('/topic/:topicId/question')
  .post(createQuestion);

router.route('/question/:id')
  .put(updateQuestion)
  .delete(deleteQuestion);

router.route('/topic/:topicId/quiz')
  .get(getTopicQuiz)
  .post(updateTopicQuiz);

module.exports = router;
