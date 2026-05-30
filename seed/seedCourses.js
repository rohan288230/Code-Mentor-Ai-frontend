require('../config/env');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

dns.setDefaultResultOrder('ipv4first');

require('dotenv').config();

const seed = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

seed();
const { connectMongoForScript, disconnectMongo } = require('../utils/mongoScript');

const coursesData = [
  {
    title: "Python for Beginners",
    description: "Learn Python from scratch. Master syntax, data structures, and OOP.",
    language: "python",
    modules: [
      {
        title: "Getting Started with Python",
        description: "Variables, Data Types, and Operators",
        lessons: [
          { title: "Introduction to Python", content: "<p>Python is a high-level interpreted language.</p><h3>Why Python?</h3><p>It is readable and versatile.</p>" },
          { title: "Variables and Data Types", content: "<p>Variables store data. Python has ints, floats, strings, and booleans.</p><pre><code>x = 5\nname = 'Alice'</code></pre>" }
        ],
        quiz: {
          title: "Python Basics Quiz",
          questions: [
            { questionText: "Which of the following is a Python data type?", options: ["int", "pointer", "struct", "class"], correctAnswerIndex: 0 },
            { questionText: "How do you print in Python?", options: ["System.out.println()", "console.log()", "print()", "echo"], correctAnswerIndex: 2 }
          ]
        }
      }
    ]
  },
  {
    title: "C Programming Masterclass",
    description: "Dive deep into memory management, pointers, and systems programming.",
    language: "c",
    modules: [
      {
        title: "C Basics",
        description: "Learn the fundamentals of C programming.",
        lessons: [
          { title: "Hello World in C", content: "<pre><code>#include &lt;stdio.h&gt;\nint main() {\n  printf(\"Hello, World!\");\n  return 0;\n}</code></pre>" },
          { title: "Data Types", content: "<p>C has primitive types like int, char, float, double.</p>" }
        ],
        quiz: {
          title: "C Basics Quiz",
          questions: [
            { questionText: "Which header is required for printf?", options: ["stdlib.h", "stdio.h", "math.h", "string.h"], correctAnswerIndex: 1 }
          ]
        }
      }
    ]
  },
  {
    title: "C++ Standard Template Library",
    description: "Master C++ and its powerful STL for competitive programming.",
    language: "cpp",
    modules: [
      {
        title: "Introduction to C++",
        description: "From C to C++: Classes and Objects.",
        lessons: [
          { title: "Basic Syntax", content: "<pre><code>#include &lt;iostream&gt;\nusing namespace std;\nint main() {\n  cout << \"Hello C++\";\n  return 0;\n}</code></pre>" }
        ],
        quiz: {
          title: "C++ Basics Quiz",
          questions: [
            { questionText: "What is used for output in C++?", options: ["printf", "cout", "System.out", "print"], correctAnswerIndex: 1 }
          ]
        }
      }
    ]
  },
  {
    title: "Java Object Oriented Programming",
    description: "Build robust backend systems using Java and OOP principles.",
    language: "java",
    modules: [
      {
        title: "Java Fundamentals",
        description: "JVM, JRE, JDK, and basic syntax.",
        lessons: [
          { title: "First Java Program", content: "<pre><code>public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello Java\");\n  }\n}</code></pre>" }
        ],
        quiz: {
          title: "Java Basics Quiz",
          questions: [
            { questionText: "What is the entry point of a Java program?", options: ["Main()", "start()", "init()", "main()"], correctAnswerIndex: 3 }
          ]
        }
      }
    ]
  },
  {
    title: "HTML & Web Fundamentals",
    description: "The building blocks of the web.",
    language: "html",
    modules: [
      {
        title: "HTML5 Structure",
        description: "Tags, Elements, and Attributes.",
        lessons: [
          { title: "Basic HTML Document", content: "<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;Page&lt;/title&gt;&lt;/head&gt;\n&lt;body&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;/body&gt;\n&lt;/html&gt;</code></pre>" }
        ],
        quiz: {
          title: "HTML Basics Quiz",
          questions: [
            { questionText: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "Home Tool Markup Language"], correctAnswerIndex: 0 }
          ]
        }
      }
    ]
  }
];

const seedCourses = async () => {
  try {
    await connectMongoForScript();
    console.log('MongoDB Connected for Seeding Courses...');

    await Course.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});

    console.log('Cleared existing Courses data.');

    for (const courseData of coursesData) {
      const course = new Course({
        title: courseData.title,
        description: courseData.description,
        language: courseData.language
      });
      await course.save();

      let moduleOrder = 1;
      for (const modData of courseData.modules) {
        const moduleDoc = new Module({
          title: modData.title,
          description: modData.description,
          course: course._id,
          order: moduleOrder++
        });
        await moduleDoc.save();

        let lessonOrder = 1;
        for (const lessData of modData.lessons) {
          const lesson = new Lesson({
            title: lessData.title,
            content: lessData.content,
            module: moduleDoc._id,
            order: lessonOrder++
          });
          await lesson.save();
          moduleDoc.lessons.push(lesson._id);
        }

        if (modData.quiz) {
          const quiz = new Quiz({
            title: modData.quiz.title,
            module: moduleDoc._id,
            questions: modData.quiz.questions
          });
          await quiz.save();
          moduleDoc.quiz = quiz._id;
        }

        await moduleDoc.save();
        course.modules.push(moduleDoc._id);
      }
      await course.save();
    }

    console.log('Courses seeded successfully!');
    process.exitCode = 0;
  } catch (error) {
    console.error('Error seeding Courses:', error);
    process.exitCode = 1;
  } finally {
    await disconnectMongo().catch(() => {});
  }
  process.exit(process.exitCode ?? 0);
};

seedCourses();
