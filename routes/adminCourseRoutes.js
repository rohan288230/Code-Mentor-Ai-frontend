const express = require('express');
const { 
  getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
  createModule, updateModule, deleteModule,
  createLesson, updateLesson, deleteLesson,
  createQuiz, updateQuiz, deleteQuiz
} = require('../controllers/adminCourseController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth & admin middleware to all routes
router.use(protect, admin);

// Course Routes
router.route('/courses')
  .get(getCourses)
  .post(createCourse);

router.route('/courses/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

// Module Routes
router.route('/modules')
  .post(createModule);
  
router.route('/modules/:id')
  .put(updateModule)
  .delete(deleteModule);

// Lesson Routes
router.route('/lessons')
  .post(createLesson);

router.route('/lessons/:id')
  .put(updateLesson)
  .delete(deleteLesson);

// Quiz Routes
router.route('/quizzes')
  .post(createQuiz);

router.route('/quizzes/:id')
  .put(updateQuiz)
  .delete(deleteQuiz);

module.exports = router;
