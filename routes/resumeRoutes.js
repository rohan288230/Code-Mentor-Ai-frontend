const express = require('express');
const { getMyResumes, createResume, updateResume, analyzeResumeWithAI, generateSummary, improveBullets } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getMyResumes)
  .post(protect, createResume);

router.post('/analyze', protect, analyzeResumeWithAI);
router.post('/summary', protect, generateSummary);
router.post('/improve-bullets', protect, improveBullets);

router.route('/:id')
  .put(protect, updateResume);

module.exports = router;
