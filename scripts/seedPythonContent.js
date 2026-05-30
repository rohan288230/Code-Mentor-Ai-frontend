require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

const pythonData = {
  title: 'Python',
  description: 'Learn Python programming language, its history, applications, features, and basic programming concepts.',
  language: 'Python',
  modules: [
    {
      title: "Introduction to Python",
      description: "This module introduces learners to Python programming language, its history, applications, features, installation process, development environment setup, and basic programming concepts. After completing this module, students will understand why Python is one of the most popular programming languages in the world and will be ready to start writing Python programs.",
      estimatedDuration: "45 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand what Python is",
        "Learn the history of Python",
        "Identify real-world applications of Python",
        "Understand Python features and advantages",
        "Install Python successfully",
        "Set up Visual Studio Code",
        "Understand Python syntax basics",
        "Write and execute the first Python program"
      ],
      lessons: [
        {
          title: "Introduction to Programming",
          content: "Programming is the process of giving instructions to a computer so that it can perform specific tasks. These instructions are written using programming languages. Every application we use today, such as Instagram, YouTube, WhatsApp, and Netflix, is built using programming languages. Programming helps developers solve problems, automate tasks, process data, and create software systems."
        },
        {
          title: "What is Python?",
          content: "Python is a high-level, interpreted, and general-purpose programming language created by Guido van Rossum and released in 1991. Python is designed to be simple, readable, and easy to learn. Unlike many other programming languages, Python allows developers to write fewer lines of code while achieving powerful results. Python follows a philosophy called 'Readability Counts', which makes programs easier to understand and maintain."
        },
        {
          title: "History of Python",
          content: "Python was developed by Guido van Rossum in the late 1980s and officially released in 1991. The language was named after the comedy television show 'Monty Python's Flying Circus'. Since its release, Python has continuously evolved and become one of the most widely used programming languages in the world. Modern versions such as Python 3.x provide powerful features for software development, artificial intelligence, machine learning, and automation."
        },
        {
          title: "Why Learn Python?",
          content: "Python is considered one of the best programming languages for beginners because of its simple syntax and readability. It has a large community, extensive documentation, and thousands of libraries that simplify development. Python is also highly demanded in the job market and is used in industries such as artificial intelligence, machine learning, web development, cybersecurity, automation, and data science."
        },
        {
          title: "Applications of Python",
          content: "Python is used in many fields. In Web Development, frameworks like Django, Flask, and FastAPI are used to build websites and APIs. In Artificial Intelligence and Machine Learning, libraries such as TensorFlow, PyTorch, and Scikit-Learn are commonly used. Data Scientists use Pandas, NumPy, and Matplotlib for data analysis and visualization. Python is also widely used for automation, scripting, cybersecurity, cloud computing, and software development."
        },
        {
          title: "Features of Python",
          content: "Python offers many powerful features. It has a simple and readable syntax that reduces development time. Python is an interpreted language, meaning code executes line by line. It is platform-independent and can run on Windows, Linux, and macOS without modifications. Python supports object-oriented programming, automatic memory management, extensive standard libraries, and integration with other technologies."
        },
        {
          title: "Advantages of Python",
          content: "Python is easy to learn and use, making it ideal for beginners. It increases productivity because developers can write less code compared to many other languages. Python has a large ecosystem of libraries that simplify development. The language is open-source and free to use. It also has strong community support and excellent documentation."
        },
        {
          title: "Installing Python",
          content: "To install Python, visit the official Python website at https://python.org. Download the latest stable version for your operating system. Run the installer and make sure to enable the 'Add Python to PATH' option before installation. After installation, open a terminal or command prompt and execute 'python --version' to verify that Python has been installed successfully."
        },
        {
          title: "Setting Up Visual Studio Code",
          content: "Visual Studio Code (VS Code) is one of the most popular code editors for Python development. Download and install VS Code from https://code.visualstudio.com. Open the Extensions Marketplace and install the Python extension provided by Microsoft. This extension provides syntax highlighting, debugging, code completion, and other development tools."
        },
        {
          title: "Your First Python Program",
          content: "The first program traditionally written by beginners is called the Hello World program. It demonstrates how Python executes instructions and displays output on the screen. Python uses the print() function to display messages. Understanding the first program helps learners become familiar with code execution and syntax."
        },
        {
          title: "Comments in Python",
          content: "Comments are used to explain code and improve readability. Python ignores comments during execution. Single-line comments use the '#' symbol, while multi-line comments use triple quotation marks. Comments help developers understand the purpose of code and make collaboration easier in large projects."
        },
        {
          title: "Python Syntax Rules",
          content: "Python is case-sensitive, which means variable names with different capitalization are treated differently. Python uses indentation to define blocks of code instead of curly braces. Proper indentation is mandatory and improves readability. Python programs are executed from top to bottom, and each statement must follow the language syntax rules."
        },
        {
          title: "Real-World Companies Using Python",
          content: "Many leading technology companies use Python extensively. Google uses Python for automation and backend systems. Netflix uses Python for recommendation systems and analytics. Instagram's backend is largely built using Django, a Python framework. Spotify uses Python for data analysis and recommendation engines. OpenAI also uses Python extensively in AI research and development."
        }
      ],
      quiz: {
        title: "Introduction to Python Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Who created Python?", options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup"], correctAnswerIndex: 1 },
          { questionText: "In which year was Python officially released?", options: ["1985", "1991", "1998", "2005"], correctAnswerIndex: 1 },
          { questionText: "Python is primarily known for which feature?", options: ["Complex Syntax", "Readability", "Hardware Programming", "Database Design"], correctAnswerIndex: 1 },
          { questionText: "Which function is used to display output in Python?", options: ["show()", "display()", "print()", "output()"], correctAnswerIndex: 2 },
          { questionText: "Which symbol is used for single-line comments in Python?", options: ["//", "#", "/* */", "$"], correctAnswerIndex: 1 },
          { questionText: "Which of the following is a popular Python web framework?", options: ["Spring", "Laravel", "Django", "ASP.NET"], correctAnswerIndex: 2 },
          { questionText: "Python is classified as which type of language?", options: ["Assembly Language", "Markup Language", "Interpreted Language", "Machine Language"], correctAnswerIndex: 2 },
          { questionText: "Which company uses Python extensively for AI development?", options: ["OpenAI", "Netflix", "Google", "All of the Above"], correctAnswerIndex: 3 }
        ]
      }
    },
    {
      title: "Variables and Data Types",
      description: "This module introduces Variables and Data Types in Python. Learners will understand how data is stored in memory, how variables work, different built-in data types, type conversion, and best practices for naming variables. These concepts form the foundation of every Python program.",
      estimatedDuration: "60 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand variables and their purpose",
        "Learn variable declaration and assignment",
        "Understand Python data types",
        "Work with integers, floats, strings, and booleans",
        "Perform type conversion",
        "Use type() function",
        "Follow variable naming conventions",
        "Understand memory representation basics"
      ],
      lessons: [
        {
          title: "Introduction to Variables",
          content: "Variables are containers used to store data in a program. Whenever a program needs to remember information such as a user's name, age, marks, or salary, variables are used. A variable acts as a label that points to a value stored in memory. Python automatically creates variables when values are assigned, so there is no need to specify the data type explicitly."
        },
        {
          title: "Creating Variables in Python",
          content: "Variables are created by assigning a value using the assignment operator '='. Python dynamically determines the data type based on the assigned value. Variables can store numbers, text, boolean values, and other types of data. A variable's value can also be changed during program execution."
        },
        {
          title: "Understanding Memory and Variables",
          content: "When a variable is created, Python allocates memory to store the value. The variable name acts as a reference to that memory location. Although Python hides most memory management details from developers, understanding that variables point to stored values helps in learning advanced concepts later."
        },
        {
          title: "What are Data Types?",
          content: "Data types define the kind of value stored in a variable. Different types of data require different storage methods and operations. Python provides several built-in data types that allow developers to store numbers, text, logical values, collections, and more."
        },
        {
          title: "Integer Data Type (int)",
          content: "Integers are whole numbers without decimal points. They can be positive, negative, or zero. Integers are commonly used for counting, indexing, calculations, IDs, and many mathematical operations."
        },
        {
          title: "Float Data Type (float)",
          content: "Float values are numbers containing decimal points. They are used when precision is required, such as storing percentages, temperatures, measurements, scientific calculations, and financial data."
        },
        {
          title: "String Data Type (str)",
          content: "Strings are sequences of characters enclosed in single quotes, double quotes, or triple quotes. Strings are used to store text such as names, addresses, messages, passwords, and user input. String operations include concatenation, slicing, searching, and formatting."
        },
        {
          title: "Boolean Data Type (bool)",
          content: "Boolean values represent logical states. Python provides two boolean values: True and False. Booleans are heavily used in decision-making, conditions, loops, authentication systems, and logical operations."
        },
        {
          title: "Using the type() Function",
          content: "Python provides the type() function to determine the data type of a variable or value. This function is useful for debugging and understanding how Python interprets different values during program execution."
        },
        {
          title: "Type Conversion",
          content: "Type conversion is the process of converting one data type into another. Python provides built-in functions such as int(), float(), str(), and bool() for explicit type conversion. This is useful when handling user input or performing calculations involving multiple data types."
        },
        {
          title: "Variable Naming Rules",
          content: "Variable names can contain letters, numbers, and underscores. They cannot start with a number and cannot use reserved Python keywords. Meaningful variable names improve code readability and maintainability."
        },
        {
          title: "Variable Naming Best Practices",
          content: "Use descriptive names that clearly indicate the purpose of the variable. Examples include student_name, total_marks, account_balance, and user_age. Avoid using single-character variable names except in temporary situations such as loops."
        },
        {
          title: "Multiple Variable Assignment",
          content: "Python allows assigning values to multiple variables in a single line. This feature makes code shorter and easier to read. Multiple assignments are commonly used when initializing related variables together."
        },
        {
          title: "Dynamic Typing in Python",
          content: "Python is dynamically typed, meaning a variable can store different types of values during execution. A variable that initially stores an integer can later store a string or any other data type without requiring redeclaration."
        },
        {
          title: "Real-World Use of Variables",
          content: "Variables are used everywhere in software development. User profiles store names and email addresses in variables. Banking applications store balances and transaction amounts. Social media platforms store posts, likes, comments, and user information using variables and data structures."
        }
      ],
      quiz: {
        title: "Variables and Data Types Quiz",
        passingScore: 70,
        questions: [
          { questionText: "What is a variable?", options: ["A loop", "A container for storing data", "A function", "A library"], correctAnswerIndex: 1 },
          { questionText: "Which data type stores whole numbers?", options: ["float", "str", "bool", "int"], correctAnswerIndex: 3 },
          { questionText: "Which data type stores decimal numbers?", options: ["int", "bool", "float", "str"], correctAnswerIndex: 2 },
          { questionText: "Which data type is used to store text?", options: ["str", "int", "float", "bool"], correctAnswerIndex: 0 },
          { questionText: "Which function returns the data type of a variable?", options: ["typeof()", "datatype()", "type()", "checktype()"], correctAnswerIndex: 2 },
          { questionText: "What are the two boolean values in Python?", options: ["Yes and No", "1 and 0", "True and False", "On and Off"], correctAnswerIndex: 2 },
          { questionText: "Which function converts a string to an integer?", options: ["string()", "integer()", "int()", "convert()"], correctAnswerIndex: 2 },
          { questionText: "Python is a ______ typed language.", options: ["Static", "Dynamic", "Compiled", "Strong Only"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Conditions and Decision Making",
      description: "This module introduces conditional statements in Python. Conditions allow programs to make decisions based on specific situations. Learners will understand how to use if, if-else, elif, nested conditions, and logical operators to control program flow and build intelligent applications.",
      estimatedDuration: "60 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand decision making in programming",
        "Use if statements",
        "Use if-else statements",
        "Work with elif ladders",
        "Create nested conditions",
        "Use logical operators",
        "Build real-world decision-based programs"
      ],
      lessons: [
        {
          title: "Introduction to Conditional Statements",
          content: "Conditional statements allow programs to make decisions. In real life, decisions are based on conditions. For example, if a student scores above 40 marks, they pass the exam. Similarly, programs use conditions to determine which block of code should execute."
        },
        {
          title: "The if Statement",
          content: "The if statement is the simplest conditional statement in Python. It executes a block of code only when the specified condition evaluates to True. If the condition is False, the code inside the if block is skipped."
        },
        {
          title: "The if-else Statement",
          content: "The if-else statement provides two possible execution paths. If the condition is True, the if block executes. Otherwise, the else block executes. This is commonly used in login systems, eligibility checks, and validation programs."
        },
        {
          title: "The elif Statement",
          content: "The elif statement is used when multiple conditions need to be checked. It allows developers to handle multiple scenarios without writing several separate if statements."
        },
        {
          title: "Nested Conditions",
          content: "A nested condition is an if statement inside another if statement. Nested conditions are useful when multiple levels of validation or verification are required before executing an action."
        },
        {
          title: "Comparison Operators",
          content: "Comparison operators compare values and return either True or False. Common operators include ==, !=, >, <, >=, and <=. These operators are the foundation of conditional statements."
        },
        {
          title: "Logical Operators",
          content: "Logical operators combine multiple conditions. Python provides and, or, and not operators. These operators help create complex decision-making systems such as authentication and access control."
        },
        {
          title: "Real-World Applications of Conditions",
          content: "Conditional statements are used in ATM systems, login authentication, e-commerce discounts, result management systems, traffic signal control systems, and AI-based decision engines."
        }
      ],
      quiz: {
        title: "Conditions Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which statement is used to make decisions in Python?", options: ["loop", "if", "function", "module"], correctAnswerIndex: 1 },
          { questionText: "Which keyword is used for alternative execution?", options: ["elseif", "elif", "alternative", "switch"], correctAnswerIndex: 1 },
          { questionText: "Which operator checks equality?", options: ["=", "==", "!=", ">"], correctAnswerIndex: 1 },
          { questionText: "Which logical operator returns True when both conditions are True?", options: ["or", "not", "and", "xor"], correctAnswerIndex: 2 },
          { questionText: "What is a nested condition?", options: ["Loop inside loop", "Function inside function", "If inside another if", "Variable inside variable"], correctAnswerIndex: 2 }
        ]
      }
    },
    {
      title: "Loops",
      description: "This module introduces loops in Python. Loops allow programs to repeat tasks efficiently without writing the same code multiple times. Learners will understand for loops, while loops, nested loops, loop control statements, and real-world applications of iteration.",
      estimatedDuration: "75 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand repetition in programming",
        "Use for loops",
        "Use while loops",
        "Work with range()",
        "Understand nested loops",
        "Use break and continue",
        "Build repetitive task automation"
      ],
      lessons: [
        {
          title: "Introduction to Loops",
          content: "Loops are used to execute a block of code repeatedly. Instead of writing the same code multiple times, a loop can automate repetitive tasks. Loops increase efficiency and reduce code duplication."
        },
        {
          title: "The for Loop",
          content: "The for loop is used when the number of iterations is known. It iterates through sequences such as lists, strings, tuples, and ranges. For loops are commonly used in data processing and collection traversal."
        },
        {
          title: "The range() Function",
          content: "The range() function generates a sequence of numbers. It is commonly used with for loops to control the number of iterations. Range can accept start, stop, and step values."
        },
        {
          title: "The while Loop",
          content: "The while loop executes as long as a condition remains True. It is useful when the number of iterations is unknown and depends on user input or changing conditions."
        },
        {
          title: "Infinite Loops",
          content: "An infinite loop occurs when the loop condition never becomes False. Infinite loops can consume system resources and should be avoided unless intentionally used in servers, games, or real-time systems."
        },
        {
          title: "Nested Loops",
          content: "A nested loop is a loop inside another loop. Nested loops are commonly used for pattern generation, matrix operations, and complex data processing tasks."
        },
        {
          title: "Break Statement",
          content: "The break statement immediately terminates the current loop. It is useful when a specific condition is met and further iterations are unnecessary."
        },
        {
          title: "Continue Statement",
          content: "The continue statement skips the current iteration and moves to the next iteration of the loop. It helps ignore specific cases without terminating the entire loop."
        },
        {
          title: "Pass Statement",
          content: "The pass statement acts as a placeholder. It allows developers to create loops or conditions without implementing functionality immediately."
        },
        {
          title: "Real-World Applications of Loops",
          content: "Loops are used in data processing, file reading, automation scripts, game development, machine learning, report generation, and user input validation systems. Almost every software application relies on loops to perform repetitive tasks efficiently."
        }
      ],
      quiz: {
        title: "Loops Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which loop is commonly used when the number of iterations is known?", options: ["while", "for", "do-while", "nested"], correctAnswerIndex: 1 },
          { questionText: "Which function generates a sequence of numbers?", options: ["list()", "range()", "number()", "generate()"], correctAnswerIndex: 1 },
          { questionText: "Which loop runs while a condition remains True?", options: ["for", "nested", "while", "range"], correctAnswerIndex: 2 },
          { questionText: "Which statement exits a loop immediately?", options: ["continue", "pass", "skip", "break"], correctAnswerIndex: 3 },
          { questionText: "Which statement skips the current iteration?", options: ["continue", "break", "exit", "pass"], correctAnswerIndex: 0 },
          { questionText: "What is a nested loop?", options: ["Function inside loop", "Loop inside another loop", "Variable inside loop", "Condition inside loop"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Loops",
      description: "This module introduces loops in Python. Loops allow programs to repeat tasks efficiently without writing the same code multiple times. Learners will understand for loops, while loops, nested loops, loop control statements, and real-world applications of iteration.",
      estimatedDuration: "75 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand repetition in programming",
        "Use for loops",
        "Use while loops",
        "Work with range()",
        "Understand nested loops",
        "Use break and continue",
        "Build repetitive task automation"
      ],
      lessons: [
        {
          title: "Introduction to Loops",
          content: "Loops are used to execute a block of code repeatedly. Instead of writing the same code multiple times, a loop can automate repetitive tasks. Loops increase efficiency and reduce code duplication."
        },
        {
          title: "The for Loop",
          content: "The for loop is used when the number of iterations is known. It iterates through sequences such as lists, strings, tuples, and ranges. For loops are commonly used in data processing and collection traversal."
        },
        {
          title: "The range() Function",
          content: "The range() function generates a sequence of numbers. It is commonly used with for loops to control the number of iterations. Range can accept start, stop, and step values."
        },
        {
          title: "The while Loop",
          content: "The while loop executes as long as a condition remains True. It is useful when the number of iterations is unknown and depends on user input or changing conditions."
        },
        {
          title: "Infinite Loops",
          content: "An infinite loop occurs when the loop condition never becomes False. Infinite loops can consume system resources and should be avoided unless intentionally used in servers, games, or real-time systems."
        },
        {
          title: "Nested Loops",
          content: "A nested loop is a loop inside another loop. Nested loops are commonly used for pattern generation, matrix operations, and complex data processing tasks."
        },
        {
          title: "Break Statement",
          content: "The break statement immediately terminates the current loop. It is useful when a specific condition is met and further iterations are unnecessary."
        },
        {
          title: "Continue Statement",
          content: "The continue statement skips the current iteration and moves to the next iteration of the loop. It helps ignore specific cases without terminating the entire loop."
        },
        {
          title: "Pass Statement",
          content: "The pass statement acts as a placeholder. It allows developers to create loops or conditions without implementing functionality immediately."
        },
        {
          title: "Real-World Applications of Loops",
          content: "Loops are used in data processing, file reading, automation scripts, game development, machine learning, report generation, and user input validation systems. Almost every software application relies on loops to perform repetitive tasks efficiently."
        }
      ],
      quiz: {
        title: "Loops Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which loop is commonly used when the number of iterations is known?", options: ["while", "for", "do-while", "nested"], correctAnswerIndex: 1 },
          { questionText: "Which function generates a sequence of numbers?", options: ["list()", "range()", "number()", "generate()"], correctAnswerIndex: 1 },
          { questionText: "Which loop runs while a condition remains True?", options: ["for", "nested", "while", "range"], correctAnswerIndex: 2 },
          { questionText: "Which statement exits a loop immediately?", options: ["continue", "pass", "skip", "break"], correctAnswerIndex: 3 },
          { questionText: "Which statement skips the current iteration?", options: ["continue", "break", "exit", "pass"], correctAnswerIndex: 0 },
          { questionText: "What is a nested loop?", options: ["Function inside loop", "Loop inside another loop", "Variable inside loop", "Condition inside loop"], correctAnswerIndex: 1 }
        ]
      }
    }
  ]
};

const runSeeder = async () => {
  await connectDB();
  try {
    console.log('Clearing old courses...');
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});

    console.log('Inserting pure Python Course...');
    const course = await Course.create({
      title: pythonData.title,
      description: pythonData.description,
      language: pythonData.language
    });

    let modOrder = 1;
    for (const mod of pythonData.modules) {
      const moduleDoc = await Module.create({
        title: mod.title,
        description: mod.description,
        course: course._id,
        order: modOrder++
      });

      let lessonOrder = 1;
      for (const les of mod.lessons) {
        const lessonDoc = await Lesson.create({
          title: les.title,
          content: les.content,
          module: moduleDoc._id,
          order: lessonOrder++
        });
        moduleDoc.lessons.push(lessonDoc._id);
      }

      if (mod.quiz) {
        const quizDoc = await Quiz.create({
          title: mod.quiz.title,
          module: moduleDoc._id,
          questions: mod.quiz.questions
        });
        moduleDoc.quiz = quizDoc._id;
      }
      
      await moduleDoc.save();
      course.modules.push(moduleDoc._id);
    }
    await course.save();

    console.log('Python Course seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
};

runSeeder();
