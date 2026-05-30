const mongoose = require('mongoose');
require('dotenv').config();
const OSSubject = require('../models/OSSubject');
const OSTopic = require('../models/OSTopic');
const OSNotes = require('../models/OSNotes');
const OSQuestion = require('../models/OSQuestion');
const OSQuiz = require('../models/OSQuiz');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const modules = [
  {
    "title": "Introduction to Operating Systems",
    "description": "This module introduces the fundamentals of Operating Systems. Learners will understand what an Operating System is, why it is important, its role in computer systems, basic architecture, system components, and real-world applications.",
    "estimatedDuration": "60 Minutes",
    "difficulty": "Beginner",
    "learningObjectives": [
      "Understand what an Operating System is",
      "Learn the purpose of an Operating System"
    ],
    "lessons": [
      {
        "title": "Introduction to Operating Systems",
        "content": "An Operating System (OS) is system software that manages computer hardware and software resources while providing services for computer programs. It acts as an intermediary between users, applications, and hardware."
      }
    ],
    "quiz": {
      "title": "Introduction to Operating Systems Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is an Operating System?",
          "options": ["Application Software", "Programming Language", "System Software", "Database"],
          "correctAnswer": "System Software"
        }
      ]
    }
  },
  {
    "title": "Functions of Operating System",
    "description": "This module introduces the core functions performed by an Operating System.",
    "estimatedDuration": "75 Minutes",
    "difficulty": "Beginner",
    "learningObjectives": [
      "Understand the major functions of an Operating System"
    ],
    "lessons": [
      {
        "title": "Introduction to Operating System Functions",
        "content": "An Operating System performs several important functions that allow hardware and software to work together efficiently."
      }
    ],
    "quiz": {
      "title": "Functions of Operating System Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which OS function is responsible for creating and managing processes?",
          "options": ["File Management", "Process Management", "Device Management", "Security Management"],
          "correctAnswer": "Process Management"
        }
      ]
    }
  },
  {
    "title": "Types of Operating Systems",
    "description": "This module introduces the different types of Operating Systems used in computing environments.",
    "estimatedDuration": "80 Minutes",
    "difficulty": "Beginner",
    "learningObjectives": [
      "Understand different types of Operating Systems"
    ],
    "lessons": [
      {
        "title": "Introduction to Types of Operating Systems",
        "content": "Operating Systems are designed to meet different computing needs."
      }
    ],
    "quiz": {
      "title": "Types of Operating Systems Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which Operating System processes jobs in groups without user interaction?",
          "options": ["Real-Time OS", "Batch OS", "Mobile OS", "Network OS"],
          "correctAnswer": "Batch OS"
        }
      ]
    }
  },
  {
    "title": "Process Management",
    "description": "This module introduces Process Management, one of the most important responsibilities of an Operating System.",
    "estimatedDuration": "90 Minutes",
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand processes and programs"
    ],
    "lessons": [
      {
        "title": "Introduction to Process Management",
        "content": "Process Management is the function of an Operating System that handles the creation, scheduling, execution, and termination of processes."
      }
    ],
    "quiz": {
      "title": "Process Management Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is a process?",
          "options": ["A file stored on disk", "An active instance of a program", "A programming language", "A database"],
          "correctAnswer": "An active instance of a program"
        }
      ]
    }
  },
  {
    "title": "Process States",
    "description": "This module introduces Process States, a fundamental concept in Operating Systems.",
    "estimatedDuration": "80 Minutes",
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand process states"
    ],
    "lessons": [
      {
        "title": "Introduction to Process States",
        "content": "A process does not remain in a single state throughout its execution. As it interacts with the CPU, memory, and I/O devices, it moves through various states managed by the Operating System."
      }
    ],
    "quiz": {
      "title": "Process States Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which state represents a newly created process?",
          "options": ["Ready", "Running", "New", "Waiting"],
          "correctAnswer": "New"
        }
      ]
    }
  }
];

// Reusing some sample questions for OS
const sampleQuestions = [
  { question: "What is an Operating System?", answer: "An OS is a system software that acts as an intermediary between computer hardware and user.", difficulty: "Easy", companyTags: ["Amazon", "Microsoft"] },
  { question: "What is a Process?", answer: "A process is an active instance of a program being executed.", difficulty: "Easy", companyTags: ["Google", "Adobe"] },
  { question: "What is a Thread?", answer: "A thread is the smallest unit of execution within a process.", difficulty: "Medium", companyTags: ["Meta", "Apple"] },
  { question: "Difference between Process and Thread?", answer: "Processes are isolated, threads share memory. Processes are heavy, threads are lightweight.", difficulty: "Medium", companyTags: ["Oracle", "Cisco"] },
  { question: "What is Context Switching?", answer: "Saving the state of a currently running process and restoring the state of the next process.", difficulty: "Medium", companyTags: ["Intel", "Qualcomm"] }
];

const seedOS = async () => {
  await connectDB();

  console.log('Clearing old OS data...');
  await OSSubject.deleteMany();
  await OSTopic.deleteMany();
  await OSNotes.deleteMany();
  await OSQuestion.deleteMany();
  await OSQuiz.deleteMany();

  console.log('Creating OS Subject...');
  const subject = await OSSubject.create({
    title: 'Operating System Interview Preparation',
    description: 'Prepare for technical interviews by mastering Operating System concepts from beginner to advanced level.',
    difficulty: 'Intermediate'
  });

  console.log('Creating OS Topics, Notes, Quizzes, and Questions...');
  for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];
    
    const topic = await OSTopic.create({
      subjectId: subject._id,
      title: mod.title,
      description: mod.description,
      order: i + 1,
      estimatedDuration: mod.estimatedDuration,
      difficulty: mod.difficulty
    });

    let markdownContent = `# ${mod.title}\n\n`;
    for (let lesson of mod.lessons) {
      markdownContent += `## ${lesson.title}\n${lesson.content}\n\n`;
    }

    await OSNotes.create({
      topicId: topic._id,
      content: markdownContent,
      sections: []
    });

    const formattedQuestions = mod.quiz.questions.map(q => {
      const correctIndex = q.options.indexOf(q.correctAnswer);
      return {
        questionText: q.questionText,
        options: q.options,
        correctAnswerIndex: correctIndex >= 0 ? correctIndex : 0,
        explanation: 'Detailed explanation for this answer.'
      };
    });

    await OSQuiz.create({
      topicId: topic._id,
      title: mod.quiz.title,
      passingScore: mod.quiz.passingScore,
      questions: formattedQuestions
    });

    for (let sampleQ of sampleQuestions) {
      await OSQuestion.create({
        topicId: topic._id,
        question: sampleQ.question,
        answer: sampleQ.answer,
        difficulty: sampleQ.difficulty,
        companyTags: sampleQ.companyTags
      });
    }
  }

  console.log('OS database successfully seeded!');
  process.exit();
};

seedOS();
