const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');
require('dotenv').config({ path: '../.env' });

const DBMSSubject = require('../models/DBMSSubject');
const DBMSTopic = require('../models/DBMSTopic');
const DBMSNotes = require('../models/DBMSNotes');
const DBMSQuestion = require('../models/DBMSQuestion');
const DBMSQuiz = require('../models/DBMSQuiz');
const DBMSProgress = require('../models/DBMSProgress');

const connectDB = require('../config/db');

const dbmsModulesData = [
  {
    "title": "Introduction to DBMS",
    "description": "This module introduces the fundamentals of Database Management Systems (DBMS). Learners will understand what databases are, why DBMS is important, the advantages of using databases, and how modern applications store and manage data efficiently. This module provides the foundation for all advanced database concepts.",
    "estimatedDuration": "60 Minutes",
    "difficulty": "Beginner",
    "lessons": [
      {
        "title": "Introduction to Databases",
        "content": "A database is an organized collection of related data that can be easily accessed, managed, and updated. Databases are used to store information in a structured format so that data can be retrieved efficiently whenever needed."
      },
      {
        "title": "What is DBMS?",
        "content": "A Database Management System (DBMS) is software that allows users to create, manage, retrieve, update, and organize data in databases. It acts as an interface between users, applications, and the database."
      },
      {
        "title": "Why DBMS is Important",
        "content": "Modern applications generate large amounts of data. DBMS helps store, organize, and manage this data efficiently while ensuring security, consistency, and reliability."
      },
      {
        "title": "Need for DBMS",
        "content": "Before DBMS, data was stored in files, leading to redundancy, inconsistency, and difficulty in data retrieval. DBMS solves these problems by providing centralized and structured data management."
      }
    ],
    "quiz": {
      "title": "Introduction to DBMS Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What does DBMS stand for?",
          "options": [
            "Database Management System",
            "Data Backup Management System",
            "Database Monitoring Service",
            "Data Management Software"
          ],
          "correctAnswerIndex": 0
        },
        {
          "questionText": "What is the primary purpose of a DBMS?",
          "options": [
            "Manage and organize data",
            "Create websites",
            "Compile programs",
            "Manage networks"
          ],
          "correctAnswerIndex": 0
        }
      ]
    }
  },
  {
    "title": "Database Architecture",
    "description": "This module introduces Database Architecture, which defines how database systems are organized and how users interact with databases. Learners will understand different database architectures, client-server models, data abstraction levels, schema concepts, and the overall structure of modern database systems used in real-world applications.",
    "estimatedDuration": "75 Minutes",
    "difficulty": "Beginner",
    "lessons": [
      {
        "title": "Introduction to Database Architecture",
        "content": "Database Architecture refers to the design and structure of a database system. It defines how database components interact with users, applications, and storage systems."
      },
      {
        "title": "1-Tier Architecture",
        "content": "In a 1-Tier Architecture, the user, application, and database reside on the same system. This architecture is mainly used for local development, testing, and small standalone applications."
      },
      {
        "title": "2-Tier Architecture",
        "content": "In a 2-Tier Architecture, the client application directly communicates with the database server. The client handles user interaction while the database server manages data storage and retrieval."
      },
      {
        "title": "3-Tier Architecture",
        "content": "3-Tier Architecture introduces an Application Server between clients and the database. It is the most commonly used architecture in modern web and enterprise applications."
      }
    ],
    "quiz": {
      "title": "Database Architecture Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which architecture is most commonly used in modern web applications?",
          "options": [
            "1-Tier",
            "2-Tier",
            "3-Tier",
            "0-Tier"
          ],
          "correctAnswerIndex": 2
        }
      ]
    }
  },
  {
    "title": "Types of Databases",
    "description": "This module introduces the different types of databases used in modern computing systems. Learners will understand how databases evolved over time, the characteristics of various database models, and the use cases where each database type is most suitable. The module covers Hierarchical, Network, Relational, Object-Oriented, NoSQL, Distributed, Cloud, and Centralized databases.",
    "estimatedDuration": "80 Minutes",
    "difficulty": "Beginner",
    "lessons": [
      {
        "title": "Hierarchical Database",
        "content": "A Hierarchical Database organizes data in a tree-like structure where each parent record can have multiple child records, but each child has only one parent. This model follows a one-to-many relationship."
      },
      {
        "title": "Network Database",
        "content": "A Network Database organizes data as a graph structure where records can have multiple parent and child relationships. It supports many-to-many relationships more effectively than hierarchical databases."
      },
      {
        "title": "Relational Database",
        "content": "A Relational Database stores data in tables consisting of rows and columns. Relationships between tables are established using keys. This is the most widely used database model today."
      },
      {
        "title": "NoSQL Database",
        "content": "NoSQL databases are designed to handle large-scale, distributed, and unstructured data. They provide flexibility and horizontal scalability beyond traditional relational databases."
      }
    ],
    "quiz": {
      "title": "Types of Databases Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which database model stores data in tables?",
          "options": [
            "Hierarchical Database",
            "Network Database",
            "Relational Database",
            "Object-Oriented Database"
          ],
          "correctAnswerIndex": 2
        }
      ]
    }
  },
  {
    "title": "Relational Database Model",
    "description": "This module introduces the Relational Database Model, the most widely used database model in modern applications. Learners will understand relations, tables, rows, columns, attributes, tuples, domains, cardinality, relational schemas, integrity constraints, and the basics of relational algebra. These concepts form the foundation of SQL and relational database systems.",
    "estimatedDuration": "90 Minutes",
    "difficulty": "Intermediate",
    "lessons": [
      {
        "title": "What is a Relation?",
        "content": "A relation is a table that stores related data in rows and columns. Each relation represents a specific entity such as Students, Employees, Products, or Customers."
      },
      {
        "title": "Rows (Tuples)",
        "content": "A row, also known as a tuple, represents a single record in a table. Each row contains information about one specific entity instance."
      },
      {
        "title": "Columns (Attributes)",
        "content": "Columns, also called attributes, define the properties of an entity. Examples include StudentID, Name, Age, Salary, and Department."
      }
    ],
    "quiz": {
      "title": "Relational Database Model Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is a row in a relation called?",
          "options": [
            "Attribute",
            "Tuple",
            "Domain",
            "Schema"
          ],
          "correctAnswerIndex": 1
        }
      ]
    }
  },
  {
    "title": "Keys in DBMS",
    "description": "This module introduces Keys in DBMS, one of the most important concepts in relational databases. Keys help uniquely identify records, establish relationships between tables, maintain data integrity, and improve database organization. Learners will understand different types of keys and their practical applications in database design.",
    "estimatedDuration": "85 Minutes",
    "difficulty": "Intermediate",
    "lessons": [
      {
        "title": "Super Key",
        "content": "A Super Key is a set of one or more attributes that can uniquely identify a record in a table. A Super Key may contain extra attributes that are not necessary for unique identification."
      },
      {
        "title": "Candidate Key",
        "content": "A Candidate Key is a minimal Super Key. It contains only the attributes required to uniquely identify a record and does not contain unnecessary attributes."
      },
      {
        "title": "Primary Key",
        "content": "A Primary Key is a Candidate Key chosen to uniquely identify each record in a table. Primary Key values must be unique and cannot contain NULL values."
      },
      {
        "title": "Foreign Key",
        "content": "A Foreign Key is an attribute in one table that refers to the Primary Key of another table. It establishes relationships between tables and enforces referential integrity."
      }
    ],
    "quiz": {
      "title": "Keys in DBMS Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which key uniquely identifies each record in a table?",
          "options": [
            "Foreign Key",
            "Composite Key",
            "Primary Key",
            "Alternate Key"
          ],
          "correctAnswerIndex": 2
        }
      ]
    }
  }
];

const MOCK_QUESTIONS = [
  { question: 'What is DBMS?', answer: 'A Database Management System (DBMS) is software that allows users to create, manage, retrieve, update, and organize data in databases. It acts as an interface between users, applications, and the database.', difficulty: 'Easy', tags: ['Amazon', 'Infosys'] },
  { question: 'Difference between DBMS and RDBMS?', answer: 'DBMS stores data as files and may not enforce relationships. RDBMS stores data in tabular form (rows and columns) and enforces relationships using foreign keys.', difficulty: 'Medium', tags: ['TCS', 'Wipro'] },
  { question: 'What is Normalization?', answer: 'Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller tables and linking them using relationships.', difficulty: 'Medium', tags: ['Microsoft', 'Amazon'] },
  { question: 'Difference between Primary Key and Foreign Key?', answer: 'A Primary Key uniquely identifies a record in its own table. A Foreign Key is a field in one table that links to the Primary Key of another table, establishing a relationship between them.', difficulty: 'Easy', tags: ['Cognizant', 'Accenture'] },
  { question: 'What are ACID properties?', answer: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties ensure that database transactions are processed reliably.', difficulty: 'Advanced', tags: ['Google', 'Oracle'] },
  { question: 'Difference between Clustered and Non-Clustered Index?', answer: 'A clustered index determines the physical order of data in a table (only one allowed per table). A non-clustered index stores data and a pointer to the actual row (multiple allowed per table).', difficulty: 'Advanced', tags: ['Microsoft', 'Amazon'] },
  { question: 'Explain Joins in SQL.', answer: 'Joins are used to combine rows from two or more tables based on a related column. Types include INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.', difficulty: 'Medium', tags: ['TCS', 'Oracle'] },
  { question: 'What is a Deadlock?', answer: 'A deadlock is a situation where two or more transactions are waiting indefinitely for each other to release locks on database resources.', difficulty: 'Advanced', tags: ['Google', 'Oracle'] }
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('Connected to DB...');

    // Clear existing collections
    await DBMSSubject.deleteMany();
    await DBMSTopic.deleteMany();
    await DBMSNotes.deleteMany();
    await DBMSQuestion.deleteMany();
    await DBMSQuiz.deleteMany();
    await DBMSProgress.deleteMany();
    
    console.log('Cleared existing DBMS collections.');

    // Create Subject
    const subject = await DBMSSubject.create({
      title: 'Database Management System (DBMS) Interview Preparation',
      description: 'Prepare for technical interviews by mastering Database Management System concepts from beginner to advanced level. Cover database fundamentals, normalization, SQL, transactions, indexing, optimization, and company interview questions.',
      difficulty: 'Beginner to Advanced'
    });

    console.log('Created DBMS Subject.');

    // Iterate through modules and create topics, notes, and quizzes
    for (let i = 0; i < dbmsModulesData.length; i++) {
      const moduleData = dbmsModulesData[i];
      
      const topic = await DBMSTopic.create({
        subjectId: subject._id,
        title: moduleData.title,
        description: moduleData.description,
        estimatedDuration: moduleData.estimatedDuration,
        difficulty: moduleData.difficulty,
        order: i + 1
      });

      // Format markdown notes
      let markdownContent = `# ${moduleData.title}\n\n${moduleData.description}\n\n`;
      const sections = [];
      moduleData.lessons.forEach(lesson => {
        markdownContent += `## ${lesson.title}\n${lesson.content}\n\n`;
        sections.push({ title: lesson.title, content: lesson.content });
      });

      const notes = await DBMSNotes.create({
        topicId: topic._id,
        content: markdownContent,
        sections: sections
      });

      const quiz = await DBMSQuiz.create({
        topicId: topic._id,
        title: moduleData.quiz.title,
        passingScore: moduleData.quiz.passingScore,
        questions: moduleData.quiz.questions
      });

      topic.notes = notes._id;
      topic.quiz = quiz._id;
      await topic.save();

      subject.topics.push(topic._id);

      // Create some questions for this topic
      // We will assign one random mock question to each topic just to seed it
      const qTemplate = MOCK_QUESTIONS[i % MOCK_QUESTIONS.length];
      await DBMSQuestion.create({
        topicId: topic._id,
        question: qTemplate.question,
        answer: qTemplate.answer,
        difficulty: qTemplate.difficulty,
        companyTags: qTemplate.tags
      });
      
      console.log(`Created Topic: ${topic.title}`);
    }

    await subject.save();

    console.log('DBMS Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedDB();
