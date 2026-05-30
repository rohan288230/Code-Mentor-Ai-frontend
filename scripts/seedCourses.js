require('dotenv').config({ path: __dirname + '/../.env' });
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

const seedCourses = async () => {
  await connectDB();

  try {
    console.log('Clearing old course data...');
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});

    // Read the generated JSON data
    const dataPath = path.join(__dirname, '../data/courses/courses.json');
    if (!fs.existsSync(dataPath)) {
      console.error('Data file not found! Run generateCourseData.js first.');
      process.exit(1);
    }
    
    const allCourses = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    for (const courseData of allCourses) {
      console.log(`Seeding Course: ${courseData.title}...`);
      
      const course = await Course.create({
        title: courseData.title,
        description: courseData.description,
        language: courseData.language
      });

      let order = 1;
      for (const modData of courseData.modules) {
        const module = await Module.create({
          title: modData.title,
          description: modData.description,
          course: course._id,
          order: order++
        });

        // Add lessons
        let lessonOrder = 1;
        for (const lessonData of modData.lessons) {
          const lesson = await Lesson.create({
            title: lessonData.title,
            content: lessonData.content,
            module: module._id,
            order: lessonOrder++
          });
          module.lessons.push(lesson._id);
        }

        // Add a quiz
        if (modData.quiz) {
          const quizData = {
            title: modData.quiz.title,
            module: module._id,
            questions: modData.quiz.questions
          };
          const quiz = await Quiz.create(quizData);
          module.quiz = quiz._id;
        }

        await module.save();
        course.modules.push(module._id);
      }
      
      await course.save();
    }

    console.log('Course Seeding Completed Successfully! The robust learning platform is populated.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

seedCourses();
