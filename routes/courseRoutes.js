const express = require('express');
const { getCourses, getCourseById, getUserProgress, enrollCourse, updateProgress } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/my-progress', protect, getUserProgress);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/:id/progress', protect, updateProgress);
router.get('/', getCourses);
router.get('/:id', getCourseById);

module.exports = router;
