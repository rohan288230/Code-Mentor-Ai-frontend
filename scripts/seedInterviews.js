require('dotenv').config({ path: __dirname + '/../.env' });
const connectDB = require('../config/db');
const InterviewSubject = require('../models/InterviewSubject');
const InterviewQuestion = require('../models/InterviewQuestion');

const interviewSubjectsData = [
  { slug: 'computer-networks', title: 'Computer Networks', description: 'OSI Model, TCP/IP, Routing, DNS', topics: [
    { title: 'OSI Model', content: 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.' },
    { title: 'TCP/IP', content: 'Transmission Control Protocol / Internet Protocol is the fundamental communication language of the Internet.' },
    { title: 'Routing', content: 'Routing is the process of selecting a path for traffic in a network.' },
    { title: 'HTTP/HTTPS', content: 'HTTP is stateless. HTTPS uses TLS/SSL for secure communication.' },
    { title: 'DNS', content: 'Domain Name System translates human-readable domain names to IP addresses.' },
    { title: 'Subnetting', content: 'Dividing a network into two or more smaller networks.' },
    { title: 'Network Devices', content: 'Hub, Switch, Router, Modem, Firewall.' }
  ]},
  { slug: 'system-design', title: 'System Design', description: 'Scalability, Load Balancing, CAP', topics: [
    { title: 'Scalability', content: 'Horizontal scaling (adding more machines) vs Vertical scaling (adding more power to an existing machine).' },
    { title: 'Load Balancing', content: 'Distributing incoming network traffic across multiple servers.' },
    { title: 'Caching', content: 'Storing copies of frequently accessed data in a faster storage layer (e.g., Redis, Memcached).' },
    { title: 'Databases', content: 'SQL (Relational, ACID) vs NoSQL (Non-relational, BASE).' },
    { title: 'Microservices', content: 'Structuring an application as a collection of loosely coupled services.' },
    { title: 'Rate Limiting', content: 'Controlling the rate of requests sent or received by a network interface controller.' },
    { title: 'CDN', content: 'Content Delivery Network - geographically distributed group of servers.' },
    { title: 'API Gateway', content: 'A server that acts as an API front-end, receiving API requests, enforcing throttling and security policies.' }
  ]},
  { slug: 'dbms', title: 'DBMS', description: 'Normalization, ACID, Joins, Indexing', topics: [
    { title: 'Normalization', content: 'Process of organizing data to minimize redundancy (1NF, 2NF, 3NF, BCNF).' },
    { title: 'Transactions', content: 'A logical unit of work that contains one or more SQL statements.' },
    { title: 'SQL Queries', content: 'SELECT, INSERT, UPDATE, DELETE, GROUP BY, HAVING.' },
    { title: 'Indexing', content: 'A data structure technique to efficiently retrieve records from the database files based on some attributes.' },
    { title: 'ACID Properties', content: 'Atomicity, Consistency, Isolation, Durability ensure database transactions are processed reliably.' },
    { title: 'Joins', content: 'INNER, LEFT, RIGHT, and FULL OUTER joins combine records from multiple tables.' },
    { title: 'Locks', content: 'Shared (Read) lock, Exclusive (Write) lock.' },
    { title: 'Keys', content: 'Primary Key, Foreign Key, Super Key, Candidate Key.' }
  ]},
  { slug: 'os', title: 'Operating System', description: 'Deadlock, Scheduling, Threads, Paging', topics: [
    { title: 'Processes and Threads', content: 'A process is a program in execution. A thread is a lightweight process that shares memory space.' },
    { title: 'Scheduling', content: 'FCFS, SJF, Round Robin, Priority Scheduling.' },
    { title: 'Deadlock', content: 'A situation where a set of processes are blocked because each process is holding a resource and waiting for another. Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.' },
    { title: 'Paging', content: 'Memory management scheme that eliminates the need for contiguous allocation of physical memory.' },
    { title: 'Virtual Memory', content: 'Memory management capability that provides an idealized abstraction of the storage resources.' },
    { title: 'Synchronization', content: 'Coordinating execution of processes to ensure data consistency.' },
    { title: 'Semaphores', content: 'A variable used to control access to a common resource. Types: Binary, Counting.' }
  ]}
];

const interviewQuestionsData = [
  // Computer Networks
  { subjectSlug: 'computer-networks', questionText: 'Explain the difference between TCP and UDP.', type: 'Technical', difficulty: 'Intermediate', expectedAnswer: 'TCP is connection-oriented, reliable, and ensures ordered delivery. UDP is connectionless, faster, but does not guarantee delivery or order.', tags: ['networking', 'protocols'] },
  { subjectSlug: 'computer-networks', questionText: 'Which layer of the OSI model does a Router operate on?', type: 'MCQ', difficulty: 'Beginner', options: ['Physical', 'Data Link', 'Network', 'Transport'], correctOptionIndex: 2, aiExplanation: 'Routers operate at Layer 3 (Network Layer) because they route packets based on IP addresses.', tags: ['osi'] },
  { subjectSlug: 'computer-networks', questionText: 'What is the purpose of DNS?', type: 'Technical', difficulty: 'Beginner', expectedAnswer: 'To translate human-readable domain names into IP addresses.', tags: ['dns'] },

  // System Design
  { subjectSlug: 'system-design', questionText: 'Design a URL shortener like bit.ly.', type: 'Technical', difficulty: 'Advanced', expectedAnswer: 'Discuss base62 encoding, database schema (long_url, short_code), caching strategy, and load balancing.', tags: ['architecture'] },
  { subjectSlug: 'system-design', questionText: 'What is the CAP Theorem?', type: 'Technical', difficulty: 'Intermediate', expectedAnswer: 'A distributed data store can only simultaneously provide two of the three guarantees: Consistency, Availability, and Partition Tolerance.', tags: ['database'] },
  { subjectSlug: 'system-design', questionText: 'Which scaling involves adding more power (CPU, RAM) to an existing machine?', type: 'MCQ', difficulty: 'Beginner', options: ['Horizontal Scaling', 'Vertical Scaling', 'Diagonal Scaling', 'None of the above'], correctOptionIndex: 1, aiExplanation: 'Vertical scaling is "scaling up" a single machine, while horizontal scaling is "scaling out" by adding more machines.', tags: ['scalability'] },

  // DBMS
  { subjectSlug: 'dbms', questionText: 'What are the ACID properties in a database?', type: 'Technical', difficulty: 'Intermediate', expectedAnswer: 'Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions do not interfere), Durability (committed data is permanent).', tags: ['transactions'] },
  { subjectSlug: 'dbms', questionText: 'What is the difference between an INNER JOIN and a LEFT JOIN?', type: 'Technical', difficulty: 'Beginner', expectedAnswer: 'INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table, and matching rows from the right table (with NULLs if no match).', tags: ['sql', 'joins'] },
  { subjectSlug: 'dbms', questionText: 'Which normal form removes transitive dependencies?', type: 'MCQ', difficulty: 'Intermediate', options: ['1NF', '2NF', '3NF', 'BCNF'], correctOptionIndex: 2, aiExplanation: '3NF ensures that all attributes are functionally dependent only on the primary key, removing transitive dependencies.', tags: ['normalization'] },

  // OS
  { subjectSlug: 'os', questionText: 'Explain Deadlock and the necessary conditions for it to occur.', type: 'Technical', difficulty: 'Advanced', expectedAnswer: 'Deadlock happens when processes block each other holding resources. Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.', tags: ['process'] },
  { subjectSlug: 'os', questionText: 'What is the difference between Paging and Segmentation?', type: 'Technical', difficulty: 'Intermediate', expectedAnswer: 'Paging divides memory into fixed-size blocks (pages). Segmentation divides memory into variable-sized logical blocks (segments).', tags: ['memory'] },
  { subjectSlug: 'os', questionText: 'Which scheduling algorithm can lead to starvation?', type: 'MCQ', difficulty: 'Intermediate', options: ['Round Robin', 'First Come First Serve', 'Shortest Job First', 'None of the above'], correctOptionIndex: 2, aiExplanation: 'In SJF, a continuous stream of short jobs can indefinitely delay a long job.', tags: ['scheduling'] }
];

const seedInterviews = async () => {
  await connectDB();

  try {
    console.log('Updating interview subjects and adding questions...');

    for (const subData of interviewSubjectsData) {
      let subject = await InterviewSubject.findOne({ slug: subData.slug });
      
      if (!subject) {
        console.log(`Creating new subject: ${subData.title}`);
        subject = await InterviewSubject.create(subData);
      } else {
        console.log(`Updating existing subject: ${subData.title}`);
        subject.description = subData.description;
        subject.topics = subData.topics;
        await subject.save();
      }

      // Seed questions
      const qs = interviewQuestionsData.filter(q => q.subjectSlug === subData.slug);
      for (const q of qs) {
        const existingQ = await InterviewQuestion.findOne({ subject: subject._id, questionText: q.questionText });
        if (!existingQ) {
          await InterviewQuestion.create({
            subject: subject._id,
            type: q.type,
            difficulty: q.difficulty,
            questionText: q.questionText,
            options: q.options,
            correctOptionIndex: q.correctOptionIndex,
            expectedAnswer: q.expectedAnswer,
            aiExplanation: q.aiExplanation,
            tags: q.tags
          });
        }
      }
    }

    console.log('Interview Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding interviews:', error);
    process.exit(1);
  }
};

seedInterviews();
