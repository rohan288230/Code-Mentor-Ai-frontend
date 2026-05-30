const InterviewSubject = require('../models/InterviewSubject');
const InterviewQuestion = require('../models/InterviewQuestion');
const InterviewProgress = require('../models/InterviewProgress');
const GeminiService = require('../services/geminiService');

const INITIAL_SUBJECTS = [
  { 
    slug: 'computer-networks', 
    title: 'Computer Networks', 
    description: 'OSI Model, TCP/IP, Routing, DNS, Sockets', 
    topics: [
      { title: 'OSI Model', content: 'The OSI (Open Systems Interconnection) model has 7 layers:\n1. Physical: Raw bit stream over physical medium.\n2. Data Link: Node-to-node data transfer, MAC addresses.\n3. Network: Routing and IP addressing.\n4. Transport: End-to-end communication, TCP/UDP.\n5. Session: Managing sessions and connection establishment.\n6. Presentation: Data encryption, compression, and translation.\n7. Application: Network applications like HTTP, FTP, SMTP.' },
      { title: 'TCP/IP vs UDP', content: 'TCP (Transmission Control Protocol) is connection-oriented, reliable, and ensures ordered delivery of packets (e.g., Web browsing). UDP (User Datagram Protocol) is connectionless, faster, but does not guarantee delivery or order (e.g., Video streaming, gaming).' },
      { title: 'Routing & Switching', content: 'Routing operates at the Network Layer (Layer 3) to find the best path across networks. Switching operates at the Data Link Layer (Layer 2) to forward frames within the same local network using MAC addresses.' },
      { title: 'DNS', content: 'Domain Name System acts as the phonebook of the internet, translating human-readable domain names (google.com) into IP addresses (142.250.190.46).' }
    ]
  },
  { 
    slug: 'dbms', 
    title: 'DBMS', 
    description: 'Normalization, ACID, Joins, Indexing, Transactions', 
    topics: [
      { title: 'ACID Properties', content: 'ACID ensures reliable database transactions:\n- Atomicity: "All or nothing" execution.\n- Consistency: DB state remains valid after a transaction.\n- Isolation: Concurrent transactions do not interfere.\n- Durability: Committed data is permanently saved, even in failure.' },
      { title: 'Normalization', content: 'Process of organizing data to minimize redundancy and dependency:\n- 1NF: Atomic values, no repeating groups.\n- 2NF: 1NF + no partial dependency (attributes depend on the whole primary key).\n- 3NF: 2NF + no transitive dependency.\n- BCNF: Stricter version of 3NF.' },
      { title: 'Joins', content: 'SQL Joins are used to combine rows from two or more tables:\n- INNER JOIN: Returns matching records in both tables.\n- LEFT JOIN: Returns all records from left table, and matched from right.\n- RIGHT JOIN: Returns all records from right table, and matched from left.\n- FULL OUTER JOIN: Returns all records when there is a match in either left or right.' },
      { title: 'Indexing', content: 'Indexes improve the speed of data retrieval operations on a table at the cost of slower writes and increased storage space. (B-Trees, Hash Indexes).' }
    ]
  },
  { 
    slug: 'os', 
    title: 'Operating System', 
    description: 'Deadlock, Scheduling, Threads, Paging, Virtual Memory', 
    topics: [
      { title: 'Deadlock', content: 'A situation where a set of processes are blocked waiting for each other. Coffman conditions for deadlock:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait' },
      { title: 'Threads vs Processes', content: 'A Process is an executing instance of an application with its own memory space. A Thread is the smallest unit of execution within a process; threads share memory and resources of their parent process.' },
      { title: 'Virtual Memory & Paging', content: 'Virtual Memory is a memory management capability providing an idealized abstraction of storage resources. Paging eliminates external fragmentation by dividing memory into equal-sized fixed blocks called pages and frames.' },
      { title: 'CPU Scheduling', content: 'Algorithms used by the OS to decide which process runs next: FCFS, Shortest Job First (SJF), Round Robin (RR), Priority Scheduling.' }
    ]
  },
  { 
    slug: 'oops', 
    title: 'OOPs', 
    description: 'Inheritance, Polymorphism, Encapsulation, Abstraction', 
    topics: [
      { title: 'Encapsulation', content: 'Binding data (variables) and code (methods) together into a single unit (class). Helps hide internal state (data hiding).' },
      { title: 'Abstraction', content: 'Hiding complex implementation details and exposing only the essential features of an object (e.g., interfaces and abstract classes).' },
      { title: 'Inheritance', content: 'A mechanism where a new class derives properties and behaviors from an existing class, promoting code reusability.' },
      { title: 'Polymorphism', content: 'The ability of different objects to respond to the same function call in their own way. Includes Compile-time (Method Overloading) and Run-time (Method Overriding).' }
    ]
  },
  { 
    slug: 'sql', 
    title: 'SQL', 
    description: 'Queries, Group By, Subqueries, Stored Procedures', 
    topics: [
      { title: 'CRUD Operations', content: 'CREATE (INSERT), READ (SELECT), UPDATE, DELETE are the basic operations for managing database records.' },
      { title: 'GROUP BY & HAVING', content: 'GROUP BY aggregates rows that have the same values into summary rows. HAVING is used instead of WHERE to filter grouped records.' },
      { title: 'Subqueries & CTEs', content: 'A subquery is a query nested inside another query. Common Table Expressions (CTEs) define a temporary result set using the WITH clause for better readability.' }
    ]
  },
  { 
    slug: 'dsa', 
    title: 'Data Structures & Algorithms', 
    description: 'Arrays, Trees, DP, Graphs, HashMaps', 
    topics: [
      { title: 'Time & Space Complexity', content: 'Big O Notation describes the worst-case scenario. Common complexities: O(1) [constant], O(log N) [logarithmic], O(N) [linear], O(N log N) [linearithmic], O(N^2) [quadratic].' },
      { title: 'Arrays & Strings', content: 'Contiguous memory allocation. Common interview techniques include Two Pointers, Sliding Window, and Prefix Sum arrays.' },
      { title: 'Trees & Graphs', content: 'Hierarchical data structures. Traversals include Depth First Search (DFS - Inorder, Preorder, Postorder) and Breadth First Search (BFS - Level order). Graphs use adjacency matrices or lists.' },
      { title: 'Dynamic Programming', content: 'Solving complex problems by breaking them down into simpler subproblems and storing the results (Memoization - Top-Down, Tabulation - Bottom-Up).' }
    ]
  },
  { 
    slug: 'javascript', 
    title: 'JavaScript', 
    description: 'Closures, Promises, Event Loop, ES6+', 
    topics: [
      { title: 'Event Loop', content: 'JavaScript is single-threaded. The Event Loop continuously checks the Call Stack and the Callback Queue (Macrotask/Microtask queues), pushing tasks to the stack when it is empty.' },
      { title: 'Closures', content: 'A closure is a function that remembers its outer lexical environment even after the outer function has executed and returned.' },
      { title: 'Promises & Async/Await', content: 'A Promise represents the eventual completion or failure of an asynchronous operation. async/await is syntactic sugar over Promises, making async code look synchronous.' },
      { title: 'Hoisting & Scope', content: 'Hoisting is JS default behavior of moving declarations to the top. let/const are block-scoped and hoisted but stay in the Temporal Dead Zone. var is function-scoped.' }
    ]
  },
  { 
    slug: 'react', 
    title: 'React', 
    description: 'Hooks, Virtual DOM, State, Context API', 
    topics: [
      { title: 'Virtual DOM', content: 'A lightweight JavaScript representation of the actual DOM. React uses a diffing algorithm (Reconciliation) to compare the Virtual DOM with the real DOM and only updates the changed nodes, boosting performance.' },
      { title: 'Hooks', content: '- useState: Manages local state.\n- useEffect: Handles side effects (fetching data, subscriptions).\n- useMemo: Memoizes a computed value.\n- useCallback: Memoizes a callback function.' },
      { title: 'Context API vs Redux', content: 'Context API is native to React and used for avoiding prop-drilling for simple global states. Redux is a predictable state container for complex, large-scale applications.' }
    ]
  },
  { 
    slug: 'nodejs', 
    title: 'Node.js', 
    description: 'Event Driven, Non-blocking I/O, Express', 
    topics: [
      { title: 'Architecture', content: 'Node.js uses the V8 JavaScript engine and libuv library. It is single-threaded but uses asynchronous, non-blocking I/O via the Event Loop to handle concurrent requests efficiently.' },
      { title: 'Event Emitter', content: 'The events module allows creating, firing, and listening for custom events. It is the core of Node.js asynchronous event-driven architecture.' },
      { title: 'Streams & Buffers', content: 'Streams allow processing large amounts of data in chunks rather than loading it all into memory. Buffers are raw binary data used to handle streams temporarily.' }
    ]
  },
  { 
    slug: 'mongodb', 
    title: 'MongoDB', 
    description: 'NoSQL, Documents, Aggregation, Replication', 
    topics: [
      { title: 'NoSQL vs SQL', content: 'MongoDB is schema-less (NoSQL), storing data in flexible, JSON-like BSON documents rather than rigid tables and rows.' },
      { title: 'Aggregation Pipeline', content: 'A framework for data aggregation. Documents pass through multiple stages (like $match, $group, $sort, $project) to process and transform data.' },
      { title: 'Indexes & Performance', content: 'Indexes support efficient execution of queries. Without an index, MongoDB performs a full collection scan (O(N)).' }
    ]
  },
  { 
    slug: 'system-design', 
    title: 'System Design', 
    description: 'Scalability, Load Balancing, CAP, Microservices', 
    topics: [
      { title: 'CAP Theorem', content: 'A distributed system can only provide two of three guarantees: Consistency, Availability, and Partition Tolerance. In network partitions, you must choose between C and A.' },
      { title: 'Vertical vs Horizontal Scaling', content: 'Vertical Scaling (Scaling up): Adding more CPU/RAM to a single server. Horizontal Scaling (Scaling out): Adding more servers to a distributed pool.' },
      { title: 'Load Balancing', content: 'Distributing incoming network traffic across a group of backend servers to ensure no single server bears too much demand.' },
      { title: 'Microservices', content: 'An architectural style structuring an application as a collection of small, autonomous services modeled around business domains, usually communicating via REST or gRPC.' }
    ]
  },
  { 
    slug: 'hr', 
    title: 'HR Interview Questions', 
    description: 'Behavioral, Leadership, Strengths, Weaknesses', 
    topics: [
      { title: 'STAR Method', content: 'Use this structure to answer behavioral questions:\n- Situation: Set the scene.\n- Task: Describe your responsibility.\n- Action: Explain exactly what steps YOU took.\n- Result: Share the positive outcome or what you learned.' },
      { title: 'Strengths & Weaknesses', content: 'Always answer weaknesses honestly but pivot to how you are actively improving upon them. Use strengths that align with the specific job role.' }
    ]
  },
  { 
    slug: 'compiler-design', 
    title: 'Compiler Design', 
    description: 'Lexical Analysis, Parsing, Syntax Trees', 
    topics: [
      { title: 'Lexical Analysis', content: 'The first phase of a compiler (Scanning). It reads the source code character by character and groups them into meaningful sequences called Tokens.' },
      { title: 'Syntax Analysis (Parsing)', content: 'The second phase checks if the sequence of tokens conforms to the grammar rules of the language, generating a Parse Tree.' },
      { title: 'Intermediate Code Generation', content: 'Transforms the parse tree into an intermediate, machine-independent representation (e.g., Three-Address Code) to make optimization easier.' },
      { title: 'Code Optimization', content: 'Improves the intermediate code to consume fewer resources (memory, CPU cycles) without changing the programs output.' }
    ]
  }
];

const INITIAL_QUESTIONS = [
  { subjectSlug: 'computer-networks', questionText: 'Explain the difference between TCP and UDP.', type: 'Technical', difficulty: 'Easy' },
  { subjectSlug: 'dbms', questionText: 'What are the ACID properties in a database?', type: 'Technical', difficulty: 'Medium' },
  { subjectSlug: 'os', questionText: 'Explain Deadlock and the necessary conditions for it to occur.', type: 'Technical', difficulty: 'Hard' },
  { subjectSlug: 'react', questionText: 'What is the Virtual DOM?', type: 'Technical', difficulty: 'Medium' },
  { subjectSlug: 'system-design', questionText: 'Design a URL shortener like bit.ly.', type: 'System Design', difficulty: 'Hard' },
  { subjectSlug: 'hr', questionText: 'Tell me about a time you disagreed with a coworker.', type: 'Behavioral', difficulty: 'Medium' },
  { subjectSlug: 'compiler-design', questionText: 'Explain the difference between Lexical Analysis and Syntax Analysis.', type: 'Technical', difficulty: 'Medium' }
];

const seedDatabaseIfEmpty = async () => {
  const count = await InterviewSubject.countDocuments();
  if (count === 0) {
    console.log('Seeding initial interview subjects...');
    for (const sub of INITIAL_SUBJECTS) {
      const createdSub = await InterviewSubject.create(sub);
      // Seed questions for this subject
      const qToSeed = INITIAL_QUESTIONS.filter(q => q.subjectSlug === sub.slug);
      for (const q of qToSeed) {
        await InterviewQuestion.create({
          subject: createdSub._id,
          questionText: q.questionText,
          type: q.type,
          difficulty: q.difficulty
        });
      }
    }
  }
};

const getSubjects = async (req, res, next) => {
  try {
    await seedDatabaseIfEmpty();
    const subjects = await InterviewSubject.find({}, 'title slug description icon');
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

const getSubjectDetails = async (req, res, next) => {
  try {
    await seedDatabaseIfEmpty();
    const subject = await InterviewSubject.findOne({ slug: req.params.slug });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    next(error);
  }
};

const getQuestionsForSubject = async (req, res, next) => {
  try {
    await seedDatabaseIfEmpty();
    const subject = await InterviewSubject.findOne({ slug: req.params.slug });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    const questions = await InterviewQuestion.find({ subject: subject._id });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

const getProgress = async (req, res, next) => {
  try {
    let progress = await InterviewProgress.findOne({ user: req.session.userId });
    if (!progress) {
      progress = await InterviewProgress.create({ user: req.session.userId });
    }
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

const evaluateMockAnswer = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) return res.status(400).json({ error: 'Question and answer required' });

    const evaluation = await GeminiService.evaluateMockInterview(question, answer);
    
    // Save score to progress
    let progress = await InterviewProgress.findOne({ user: req.session.userId });
    if (progress) {
      progress.mockInterviewScores.unshift({
        questionId: null,
        score: evaluation.score,
        feedback: evaluation.feedback,
        date: new Date()
      });
      // Keep only last 10
      if (progress.mockInterviewScores.length > 10) {
        progress.mockInterviewScores = progress.mockInterviewScores.slice(0, 10);
      }
      await progress.save();
    }

    res.json(evaluation);
  } catch (error) {
    next(error);
  }
};

const toggleBookmark = async (req, res, next) => {
  try {
    const { questionId } = req.body;
    if (!questionId) return res.status(400).json({ error: 'Question ID required' });

    let progress = await InterviewProgress.findOne({ user: req.session.userId });
    if (!progress) {
      progress = await InterviewProgress.create({ user: req.session.userId, bookmarkedQuestions: [] });
    }

    const index = progress.bookmarkedQuestions.indexOf(questionId);
    if (index > -1) {
      progress.bookmarkedQuestions.splice(index, 1); // remove
    } else {
      progress.bookmarkedQuestions.push(questionId); // add
    }

    await progress.save();
    res.json({ bookmarkedQuestions: progress.bookmarkedQuestions });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubjects,
  getSubjectDetails,
  getQuestionsForSubject,
  getProgress,
  evaluateMockAnswer,
  toggleBookmark
};
