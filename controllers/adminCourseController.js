const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

// ================= COURSE OPERATIONS ================= //

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).populate('modules');
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'modules',
        populate: [
          { path: 'lessons' },
          { path: 'quiz' }
        ]
      });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, language } = req.body;
    const course = await Course.create({ title, description, language });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    // Delete all modules and their dependencies
    for (const modId of course.modules) {
      const mod = await Module.findById(modId);
      if (mod) {
        await Lesson.deleteMany({ module: modId });
        await Quiz.deleteMany({ module: modId });
        await mod.deleteOne();
      }
    }
    await course.deleteOne();
    res.json({ success: true, message: 'Course deleted' });
  } catch (error) {
    next(error);
  }
};

// ================= MODULE OPERATIONS ================= //

exports.createModule = async (req, res, next) => {
  try {
    const { courseId, title, description, order } = req.body;
    const module = await Module.create({ title, description, course: courseId, order });
    
    // add to course
    const course = await Course.findById(courseId);
    course.modules.push(module._id);
    await course.save();

    res.status(201).json(module);
  } catch (error) {
    next(error);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(module);
  } catch (error) {
    next(error);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const mod = await Module.findById(req.params.id);
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    
    await Lesson.deleteMany({ module: mod._id });
    await Quiz.deleteMany({ module: mod._id });
    
    // remove from course
    const course = await Course.findById(mod.course);
    if (course) {
      course.modules = course.modules.filter(m => m.toString() !== mod._id.toString());
      await course.save();
    }
    
    await mod.deleteOne();
    res.json({ success: true, message: 'Module deleted' });
  } catch (error) {
    next(error);
  }
};

// ================= LESSON OPERATIONS ================= //

exports.createLesson = async (req, res, next) => {
  try {
    const { moduleId, title, content, videoUrl, order } = req.body;
    const lesson = await Lesson.create({ title, content, videoUrl, module: moduleId, order });
    
    const mod = await Module.findById(moduleId);
    mod.lessons.push(lesson._id);
    await mod.save();

    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
};

exports.updateLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lesson);
  } catch (error) {
    next(error);
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    
    const mod = await Module.findById(lesson.module);
    if (mod) {
      mod.lessons = mod.lessons.filter(l => l.toString() !== lesson._id.toString());
      await mod.save();
    }
    
    await lesson.deleteOne();
    res.json({ success: true, message: 'Lesson deleted' });
  } catch (error) {
    next(error);
  }
};

// ================= QUIZ OPERATIONS ================= //

exports.createQuiz = async (req, res, next) => {
  try {
    const { moduleId, title, passingScore, questions } = req.body;
    const quiz = await Quiz.create({ title, passingScore, questions, module: moduleId });
    
    const mod = await Module.findById(moduleId);
    mod.quiz = quiz._id;
    await mod.save();

    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    const mod = await Module.findById(quiz.module);
    if (mod) {
      mod.quiz = undefined;
      await mod.save();
    }
    
    await quiz.deleteOne();
    res.json({ success: true, message: 'Quiz deleted' });
  } catch (error) {
    next(error);
  }
};
