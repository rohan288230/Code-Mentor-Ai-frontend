const express = require('express');
const { getSubjects, getSubjectDetails, getQuestionsForSubject, getProgress, evaluateMockAnswer, toggleBookmark } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/subjects', getSubjects);
router.get('/subjects/:slug', getSubjectDetails);
router.get('/subjects/:slug/questions', getQuestionsForSubject);
router.get('/progress', protect, getProgress);
router.post('/evaluate', protect, evaluateMockAnswer);
router.post('/bookmark', protect, toggleBookmark);

module.exports = router;
