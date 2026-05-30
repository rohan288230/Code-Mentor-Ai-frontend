const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({})
      .populate({
        path: 'modules',
        select: 'title description isLocked order'
      });
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'modules',
        populate: [
          { path: 'lessons', select: 'title content videoUrl order' },
          { path: 'quiz', select: 'title questions' }
        ]
      });
    if (course) {
      res.json(course);
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  } catch (error) {
    next(error);
  }
};

const getUserProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).select('enrolledCourses courseProgress');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      enrolledCourses: user.enrolledCourses,
      courseProgress: user.courseProgress || {}
    });
  } catch (error) {
    next(error);
  }
};

const enrollCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    console.log(`[Enroll API] Attempting to enroll user ${req.session.userId} in course ${courseId}`);
    
    if (!courseId) {
      return res.status(400).json({ success: false, error: 'Course ID is missing' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found or session expired' });
    }
    
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      
      // Initialize progress for this course if not exists
      if (!user.courseProgress) user.courseProgress = new Map();
      if (!user.courseProgress.has(courseId.toString())) {
        user.courseProgress.set(courseId.toString(), {
          completedModules: [],
          completedLessons: [],
          quizScores: {},
          progress: 0,
          enrolledAt: new Date()
        });
      }
      
      await user.save();
      console.log(`[Enroll API] Successfully enrolled in ${courseId}`);
    } else {
      console.log(`[Enroll API] User already enrolled in ${courseId}`);
    }
    
    res.json({ success: true, message: 'Course enrolled successfully', enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error(`[Enroll API] Error: ${error.message}`);
    next(error);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const { lessonId, moduleId, quizScore } = req.body;
    
    console.log(`[Progress API] Updating progress for course ${courseId}`);
    
    if (!courseId) {
      return res.status(400).json({ success: false, error: 'Course ID is missing' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }
    
    if (!user.courseProgress) user.courseProgress = new Map();
    
    let progress = user.courseProgress.get(courseId.toString());
    if (!progress) {
      progress = { completedModules: [], completedLessons: [], quizScores: {}, progress: 0, enrolledAt: new Date() };
    }

    if (lessonId && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    if (moduleId && quizScore !== undefined) {
      if (!progress.quizScores) progress.quizScores = {};
      progress.quizScores[moduleId] = quizScore;
      if (!progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId);
      }
    }

    user.courseProgress.set(courseId.toString(), progress);
    await user.save();
    
    res.json({ success: true, progress });
  } catch (error) {
    console.error(`[Progress API] Error: ${error.message}`);
    next(error);
  }
};

module.exports = { 
  getCourses, 
  getCourseById,
  getUserProgress,
  enrollCourse,
  updateProgress
};
