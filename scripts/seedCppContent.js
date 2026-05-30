require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

const cppData = {
  title: 'C++ Programming Mastery',
  description: 'Learn C++ from beginner to advanced level. Master object-oriented programming, STL, memory management, data structures, algorithms, and modern C++ development used in software engineering and competitive programming.',
  language: 'C++',
  modules: [
    {
      title: "Introduction to C++ Programming",
      description: "This module introduces the fundamentals of C++ Programming Language. Learners will understand the history of C++, its importance in software development, object-oriented programming concepts, development environment setup, program structure, compilation process, and real-world applications. This module provides the foundation required for learning advanced C++ concepts.",
      estimatedDuration: "60 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand what C++ is",
        "Learn the history of C++",
        "Understand the advantages of C++",
        "Identify real-world applications of C++",
        "Install a C++ compiler and IDE",
        "Understand the structure of a C++ program",
        "Learn the compilation process",
        "Write and execute the first C++ program"
      ],
      lessons: [
        {
          title: "Introduction to Programming",
          content: "Programming is the process of creating instructions that tell a computer how to perform specific tasks. These instructions are written using programming languages. Modern software applications, websites, operating systems, and games are all built using programming concepts."
        },
        {
          title: "What is C++?",
          content: "C++ is a powerful, general-purpose programming language developed as an extension of the C programming language. It supports both procedural and object-oriented programming paradigms, making it suitable for building simple applications as well as large-scale software systems."
        },
        {
          title: "History of C++",
          content: "C++ was developed by Bjarne Stroustrup at Bell Laboratories in 1979. It was originally called 'C with Classes' because it added object-oriented programming features to the C language. Later, it was renamed C++ to represent the increment operator in C, indicating an enhanced version of C."
        },
        {
          title: "Why Learn C++?",
          content: "C++ provides excellent performance, memory control, and object-oriented programming capabilities. It is widely used in competitive programming, game development, operating systems, software engineering, embedded systems, and high-performance applications."
        },
        {
          title: "Applications of C++",
          content: "C++ is used in game engines, desktop applications, operating systems, web browsers, financial systems, embedded devices, database management systems, and real-time applications. Popular software such as Adobe products, Unreal Engine, and parts of Windows use C++."
        },
        {
          title: "Features of C++",
          content: "C++ offers object-oriented programming, high performance, portability, dynamic memory allocation, reusable code through classes, inheritance, polymorphism, and extensive standard libraries. These features make C++ suitable for both system-level and application-level development."
        },
        {
          title: "Advantages of C++",
          content: "C++ combines the efficiency of C with the power of object-oriented programming. It provides better code organization, reusability, scalability, and performance. Developers can create highly optimized applications while maintaining structured code."
        },
        {
          title: "Installing a C++ Compiler",
          content: "To write and run C++ programs, a compiler is required. Popular C++ compilers include GCC, MinGW, Clang, and Microsoft Visual C++. The compiler translates source code into machine code that the computer can execute."
        },
        {
          title: "Setting Up the Development Environment",
          content: "Developers commonly use Visual Studio Code, CodeBlocks, Dev-C++, Visual Studio, and CLion for C++ development. These tools provide syntax highlighting, debugging support, code completion, and project management features."
        },
        {
          title: "Structure of a C++ Program",
          content: "A C++ program consists of header files, namespaces, the main() function, variable declarations, program logic, and return statements. Understanding the program structure helps learners write organized and maintainable code."
        },
        {
          title: "Header Files",
          content: "Header files contain declarations of functions, classes, and libraries. One of the most commonly used header files is iostream, which provides input and output functionality through cin and cout."
        },
        {
          title: "Namespaces in C++",
          content: "Namespaces help organize code and prevent naming conflicts. The standard namespace, std, contains commonly used objects and functions such as cout, cin, and string."
        },
        {
          title: "The main() Function",
          content: "The main() function is the starting point of every C++ program. Program execution begins from main() and continues until all statements inside the function are executed."
        },
        {
          title: "Input and Output in C++",
          content: "C++ uses cout to display output and cin to receive input from users. These objects are provided by the iostream library and are fundamental for building interactive applications."
        },
        {
          title: "Compilation Process",
          content: "Before execution, C++ source code must be compiled into machine code. The compilation process includes preprocessing, compilation, assembly, linking, and execution."
        },
        {
          title: "Your First C++ Program",
          content: "The traditional first program is called the Hello World program. It demonstrates the basic structure of a C++ application and introduces output using the cout statement."
        },
        {
          title: "Comments in C++",
          content: "Comments are used to explain code and improve readability. Single-line comments use // while multi-line comments use /* */. Comments are ignored by the compiler and help developers understand program logic."
        },
        {
          title: "Real-World Importance of C++",
          content: "C++ remains one of the most important programming languages in the software industry. It is heavily used in game development, operating systems, robotics, finance, high-frequency trading systems, and performance-critical software applications."
        }
      ],
      quiz: {
        title: "Introduction to C++ Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Who developed C++?", options: ["Dennis Ritchie", "Guido van Rossum", "Bjarne Stroustrup", "James Gosling"], correctAnswerIndex: 2 },
          { questionText: "C++ was originally called:", options: ["Advanced C", "C with Classes", "Object C", "Modern C"], correctAnswerIndex: 1 },
          { questionText: "Which function is the entry point of every C++ program?", options: ["start()", "run()", "main()", "execute()"], correctAnswerIndex: 2 },
          { questionText: "Which header file is used for cin and cout?", options: ["stdio.h", "math.h", "iostream", "string"], correctAnswerIndex: 2 },
          { questionText: "Which programming paradigm is strongly supported by C++?", options: ["Markup Programming", "Object-Oriented Programming", "Database Programming", "Assembly Programming"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Variables and Data Types in C++",
      description: "This module introduces Variables and Data Types in C++. Learners will understand how data is stored in memory, how variables are declared and initialized, different primitive data types, constants, type conversion, memory allocation, and best practices for variable naming. These concepts form the foundation of every C++ program.",
      estimatedDuration: "65 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand variables and memory storage",
        "Declare and initialize variables",
        "Learn primitive data types",
        "Understand constants",
        "Use type conversion",
        "Understand memory allocation",
        "Learn variable naming conventions",
        "Apply variables in real-world applications"
      ],
      lessons: [
        {
          title: "Introduction to Variables",
          content: "Variables are named memory locations used to store data in a program. They allow applications to save information such as names, ages, marks, salaries, and calculation results. Variables make programs dynamic because values can change during execution."
        },
        {
          title: "Why Variables are Important",
          content: "Without variables, programs would not be able to store user input, process calculations, or manage data efficiently. Variables act as containers that hold information needed throughout program execution."
        },
        {
          title: "Declaring Variables in C++",
          content: "Before a variable can be used, it must be declared with a specific data type. The declaration tells the compiler what kind of value will be stored and how much memory should be allocated."
        },
        {
          title: "Variable Initialization",
          content: "Initialization means assigning a value to a variable at the time of declaration. Proper initialization prevents undefined behavior and makes programs more reliable."
        },
        {
          title: "Understanding Data Types",
          content: "Data types define the kind of values a variable can store. C++ provides several built-in data types that allow developers to work with numbers, characters, text, and logical values."
        },
        {
          title: "Integer Data Type (int)",
          content: "The int data type is used to store whole numbers without decimal points. Integers are commonly used for counting, indexing, IDs, quantities, and mathematical calculations."
        },
        {
          title: "Character Data Type (char)",
          content: "The char data type stores a single character such as a letter, digit, or symbol. Characters are internally represented using ASCII values and occupy one byte of memory."
        },
        {
          title: "Floating Point Data Type (float)",
          content: "The float data type stores decimal values. It is commonly used for percentages, measurements, scientific calculations, and applications where fractional values are required."
        },
        {
          title: "Double Data Type (double)",
          content: "The double data type stores decimal values with higher precision than float. It is commonly used in engineering, financial, and scientific applications where accuracy is important."
        },
        {
          title: "Boolean Data Type (bool)",
          content: "The bool data type stores logical values. It can contain either true or false. Boolean values are used in conditions, loops, authentication systems, and decision-making processes."
        },
        {
          title: "The string Data Type",
          content: "The string data type is used to store text and sequences of characters. Strings are widely used in applications for handling names, messages, passwords, user input, and textual data."
        },
        {
          title: "Constants in C++",
          content: "Constants are fixed values that cannot be changed after declaration. They improve code safety and readability by preventing accidental modification of important values."
        },
        {
          title: "Memory Allocation",
          content: "Every variable occupies a specific amount of memory based on its data type. Understanding memory allocation helps developers optimize performance and choose appropriate data types."
        },
        {
          title: "Type Conversion",
          content: "Type conversion is the process of converting one data type into another. C++ supports both implicit and explicit type conversion. This feature is useful when performing calculations involving multiple data types."
        },
        {
          title: "Variable Naming Rules",
          content: "Variable names can contain letters, numbers, and underscores. They cannot begin with a number and cannot use reserved keywords. Meaningful variable names improve readability and maintainability."
        },
        {
          title: "Best Practices for Variables",
          content: "Developers should use descriptive names such as studentName, totalMarks, and accountBalance. Clear naming conventions make code easier to understand, debug, and maintain."
        },
        {
          title: "Real-World Applications of Variables",
          content: "Variables are used in banking software to store balances, e-commerce applications to manage product prices, social media platforms to store user information, and game development to track scores and player statistics."
        }
      ],
      quiz: {
        title: "Variables and Data Types Quiz",
        passingScore: 70,
        questions: [
          { questionText: "What is a variable?", options: ["A loop", "A function", "A named memory location", "A compiler"], correctAnswerIndex: 2 },
          { questionText: "Which data type stores whole numbers?", options: ["float", "char", "int", "double"], correctAnswerIndex: 2 },
          { questionText: "Which data type stores true or false values?", options: ["char", "bool", "string", "float"], correctAnswerIndex: 1 },
          { questionText: "Which data type provides higher precision than float?", options: ["int", "char", "double", "bool"], correctAnswerIndex: 2 },
          { questionText: "What is the purpose of constants?", options: ["Store changing values", "Store fixed values", "Create loops", "Perform calculations"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Operators in C++",
      description: "This module introduces Operators in C++. Operators are special symbols used to perform operations on variables and values. Learners will understand arithmetic, relational, logical, assignment, increment/decrement, bitwise, and conditional operators. These concepts are essential for calculations, decision-making, and building real-world applications.",
      estimatedDuration: "70 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand the purpose of operators",
        "Learn arithmetic operators",
        "Understand relational operators",
        "Use logical operators",
        "Work with assignment operators",
        "Learn increment and decrement operators",
        "Understand bitwise operators",
        "Apply operators in real-world programs"
      ],
      lessons: [
        {
          title: "Introduction to Operators",
          content: "Operators are special symbols that perform operations on variables and values. They help programs perform calculations, compare values, make decisions, and manipulate data efficiently. Operators are used in almost every programming task."
        },
        {
          title: "Why Operators are Important",
          content: "Operators allow developers to perform mathematical calculations, evaluate conditions, process user input, and create logical decisions. Without operators, programs would not be able to perform meaningful computations."
        },
        {
          title: "Arithmetic Operators",
          content: "Arithmetic operators are used for mathematical calculations. C++ provides addition (+), subtraction (-), multiplication (*), division (/), and modulus (%) operators. These operators are commonly used in calculators, billing systems, and data processing applications."
        },
        {
          title: "Addition Operator (+)",
          content: "The addition operator combines two values and returns their sum. It is commonly used for totals, scores, balances, and mathematical calculations."
        },
        {
          title: "Subtraction Operator (-)",
          content: "The subtraction operator finds the difference between two values. It is useful in financial calculations, inventory management, and analytical applications."
        },
        {
          title: "Multiplication Operator (*)",
          content: "The multiplication operator multiplies two values together. It is widely used in scientific calculations, geometry formulas, and business applications."
        },
        {
          title: "Division Operator (/)",
          content: "The division operator divides one value by another. Integer division returns whole numbers, while floating-point division produces decimal values."
        },
        {
          title: "Modulus Operator (%)",
          content: "The modulus operator returns the remainder after division. It is frequently used for checking even and odd numbers, cyclic operations, and algorithm design."
        },
        {
          title: "Relational Operators",
          content: "Relational operators compare values and return either true or false. Common relational operators include ==, !=, >, <, >=, and <=. These operators are heavily used in conditional statements and loops."
        },
        {
          title: "Logical Operators",
          content: "Logical operators combine multiple conditions. C++ provides AND (&&), OR (||), and NOT (!) operators. These operators are used in authentication systems, access control, validation checks, and decision-making applications."
        },
        {
          title: "Assignment Operators",
          content: "Assignment operators assign values to variables. The basic assignment operator is '='. Compound assignment operators such as +=, -=, *=, /=, and %= simplify calculations and improve code readability."
        },
        {
          title: "Increment Operator (++)",
          content: "The increment operator increases the value of a variable by one. It is commonly used in loops, counters, and repetitive operations."
        },
        {
          title: "Decrement Operator (--)",
          content: "The decrement operator decreases the value of a variable by one. It is useful for countdowns, reverse loops, and resource tracking systems."
        },
        {
          title: "Bitwise Operators",
          content: "Bitwise operators work directly with binary values. Common bitwise operators include &, |, ^, ~, <<, and >>. These operators are widely used in embedded systems, operating systems, and performance-critical applications."
        },
        {
          title: "Conditional (Ternary) Operator",
          content: "The conditional operator (? :) is a shorthand version of simple if-else statements. It helps reduce code length and improve readability when making simple decisions."
        },
        {
          title: "Operator Precedence",
          content: "Operator precedence determines the order in which operations are performed. Understanding precedence helps developers avoid logical errors and produce accurate results. Parentheses can be used to control execution order."
        },
        {
          title: "Real-World Applications of Operators",
          content: "Operators are used in banking software for balance calculations, e-commerce platforms for discounts and taxes, gaming systems for scoring, scientific software for calculations, and operating systems for low-level memory operations."
        },
        {
          title: "Best Practices for Using Operators",
          content: "Use parentheses when expressions become complex, avoid unnecessary operator chaining, choose meaningful variable names, and understand precedence rules to improve code readability and maintainability."
        }
      ],
      quiz: {
        title: "Operators Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which operator is used for addition?", options: ["+", "-", "*", "/"], correctAnswerIndex: 0 },
          { questionText: "Which operator returns the remainder after division?", options: ["/", "%", "*", "+"], correctAnswerIndex: 1 },
          { questionText: "Which operator checks equality?", options: ["=", "==", "!=", ">="], correctAnswerIndex: 1 },
          { questionText: "Which logical operator represents AND?", options: ["||", "&&", "!", "&"], correctAnswerIndex: 1 },
          { questionText: "Which operator increases a variable's value by one?", options: ["--", "++", "+=", "*="], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Conditional Statements in C++",
      description: "This module introduces Conditional Statements in C++. Conditional statements allow programs to make decisions based on different conditions. They help control the flow of execution by choosing different actions depending on whether a condition evaluates to true or false. These concepts are essential for building interactive and intelligent applications.",
      estimatedDuration: "65 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand decision making in programming",
        "Learn if statements",
        "Learn if-else statements",
        "Understand else-if ladders",
        "Work with nested if statements",
        "Learn switch-case statements",
        "Apply logical operators in conditions",
        "Build real-world decision-making applications"
      ],
      lessons: [
        {
          title: "Introduction to Conditional Statements",
          content: "Conditional statements allow a program to make decisions. In everyday life, decisions are made based on conditions. For example, if a student scores above 40 marks, they pass the exam. Similarly, programs use conditions to determine which block of code should execute."
        },
        {
          title: "Why Conditional Statements are Important",
          content: "Without conditions, programs would always execute the same instructions. Conditional statements make applications dynamic by allowing them to react differently based on user input, calculations, system states, or external events."
        },
        {
          title: "Boolean Expressions",
          content: "Conditional statements rely on boolean expressions. A boolean expression evaluates to either true or false. Comparison operators and logical operators are commonly used to create boolean expressions."
        },
        {
          title: "The if Statement",
          content: "The if statement is the simplest decision-making statement in C++. It executes a block of code only when a specified condition evaluates to true. If the condition is false, the block is skipped."
        },
        {
          title: "The if-else Statement",
          content: "The if-else statement provides two possible execution paths. If the condition is true, the if block executes. Otherwise, the else block executes. This is commonly used in login systems, eligibility checks, and validation processes."
        },
        {
          title: "The else-if Ladder",
          content: "The else-if ladder is used when multiple conditions need to be checked. The program evaluates each condition one by one and executes the first matching block. This is useful in grading systems, menu-driven applications, and business logic."
        },
        {
          title: "Nested if Statements",
          content: "A nested if statement is an if statement placed inside another if statement. Nested conditions are useful when multiple levels of verification are required before an action can be performed."
        },
        {
          title: "Comparison Operators in Conditions",
          content: "Comparison operators compare values and return true or false. Common comparison operators include ==, !=, >, <, >=, and <=. These operators form the basis of conditional logic."
        },
        {
          title: "Logical Operators in Conditions",
          content: "Logical operators combine multiple conditions. C++ provides && (AND), || (OR), and ! (NOT). These operators help create more complex decision-making systems."
        },
        {
          title: "Introduction to switch Statement",
          content: "The switch statement is used when a variable can have multiple possible values. It provides a cleaner alternative to long else-if ladders and improves code readability."
        },
        {
          title: "Case Labels and break Statement",
          content: "Each case in a switch statement represents a possible value. The break statement prevents execution from continuing into subsequent cases after a match is found."
        },
        {
          title: "Default Case",
          content: "The default case executes when none of the specified cases match the expression value. It acts similarly to the else block in an if-else statement."
        },
        {
          title: "Conditional Operator (? :)",
          content: "The conditional operator, also known as the ternary operator, provides a compact way to write simple if-else statements. It improves readability when only a single decision needs to be made."
        },
        {
          title: "Common Mistakes in Conditional Statements",
          content: "A common mistake is using the assignment operator (=) instead of the equality operator (==). Developers should also avoid overly complex nested conditions and ensure all possible cases are handled properly."
        },
        {
          title: "Real-World Applications of Conditional Statements",
          content: "Conditional statements are used in ATM systems, online shopping discounts, banking software, login authentication systems, exam result processing, traffic management systems, and game development."
        },
        {
          title: "Best Practices for Decision Making",
          content: "Keep conditions simple and readable, avoid deep nesting when possible, use switch statements for multiple fixed values, and write meaningful logical expressions that clearly communicate program intent."
        }
      ],
      quiz: {
        title: "Conditional Statements Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which statement is used for decision making in C++?", options: ["for", "while", "if", "function"], correctAnswerIndex: 2 },
          { questionText: "Which operator checks equality?", options: ["=", "==", "!=", ">="], correctAnswerIndex: 1 },
          { questionText: "Which statement is useful when multiple conditions need to be checked?", options: ["if", "switch", "else-if ladder", "All of the Above"], correctAnswerIndex: 3 },
          { questionText: "Which logical operator represents OR?", options: ["&&", "||", "!", "&"], correctAnswerIndex: 1 },
          { questionText: "What is the purpose of the default case in a switch statement?", options: ["Stops execution", "Executes when no case matches", "Creates a loop", "Starts execution"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Loops in C++",
      description: "This module introduces Loops in C++. Loops are control structures that allow a block of code to execute repeatedly until a specific condition is met. They help reduce code duplication, improve efficiency, and automate repetitive tasks. Learners will understand for loops, while loops, do-while loops, nested loops, and loop control statements used in real-world applications.",
      estimatedDuration: "75 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand iteration and repetition",
        "Learn for loops",
        "Learn while loops",
        "Learn do-while loops",
        "Work with nested loops",
        "Understand break statements",
        "Understand continue statements",
        "Build repetitive task automation programs"
      ],
      lessons: [
        {
          title: "Introduction to Loops",
          content: "Loops are used to execute a block of code repeatedly. Instead of writing the same statements multiple times, loops allow programmers to automate repetitive tasks efficiently. Loops are one of the most commonly used control structures in programming."
        },
        {
          title: "Why Loops are Important",
          content: "Loops reduce code duplication, improve readability, and increase efficiency. They are used in calculations, data processing, report generation, searching algorithms, game development, and many other real-world applications."
        },
        {
          title: "Understanding Iteration",
          content: "Iteration refers to the repeated execution of a block of code. Each execution is called an iteration. Loops perform iterations automatically until a specific condition becomes false."
        },
        {
          title: "The for Loop",
          content: "The for loop is used when the number of iterations is known beforehand. It contains three components: initialization, condition, and update expression. The for loop is commonly used for counting, traversing arrays, and repetitive calculations."
        },
        {
          title: "Components of a for Loop",
          content: "The initialization section runs once at the beginning. The condition is checked before each iteration. The update expression modifies the loop variable after every iteration. Together these components control loop execution."
        },
        {
          title: "The while Loop",
          content: "The while loop executes as long as a condition remains true. It is useful when the number of iterations is not known in advance and depends on user input, system events, or dynamic conditions."
        },
        {
          title: "Working of a while Loop",
          content: "Before each iteration, the condition is evaluated. If the condition is true, the loop body executes. If the condition becomes false, the loop terminates and program execution continues."
        },
        {
          title: "The do-while Loop",
          content: "The do-while loop executes the loop body first and checks the condition afterward. This guarantees that the loop runs at least once regardless of whether the condition is initially true or false."
        },
        {
          title: "Difference Between while and do-while",
          content: "The while loop checks the condition before execution, whereas the do-while loop checks the condition after execution. Therefore, a do-while loop always executes at least one time."
        },
        {
          title: "Nested Loops",
          content: "A nested loop is a loop placed inside another loop. Nested loops are commonly used for pattern printing, matrix operations, multiplication tables, and multidimensional data processing."
        },
        {
          title: "Infinite Loops",
          content: "An infinite loop occurs when the loop condition never becomes false. Infinite loops can consume system resources and should be used carefully. They are sometimes intentionally used in servers, games, and operating systems."
        },
        {
          title: "Break Statement",
          content: "The break statement immediately terminates the loop, regardless of the condition. It is useful when a required result has been found and further iterations are unnecessary."
        },
        {
          title: "Continue Statement",
          content: "The continue statement skips the current iteration and moves directly to the next iteration of the loop. It allows specific conditions to be ignored without stopping the loop."
        },
        {
          title: "Loop Control Variables",
          content: "Loop control variables determine how many times a loop executes. Properly updating these variables is important to avoid infinite loops and incorrect program behavior."
        },
        {
          title: "Real-World Applications of Loops",
          content: "Loops are used in payroll systems, banking software, inventory management systems, report generation, search engines, gaming systems, machine learning algorithms, and automation tools."
        },
        {
          title: "Best Practices for Loops",
          content: "Use meaningful loop variables, avoid unnecessary nesting, update loop variables correctly, choose the appropriate loop type for the problem, and ensure loop termination conditions are clearly defined."
        }
      ],
      quiz: {
        title: "Loops Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which loop is commonly used when the number of iterations is known?", options: ["while", "do-while", "for", "switch"], correctAnswerIndex: 2 },
          { questionText: "Which loop guarantees at least one execution?", options: ["for", "while", "do-while", "nested loop"], correctAnswerIndex: 2 },
          { questionText: "Which statement immediately exits a loop?", options: ["continue", "break", "return", "goto"], correctAnswerIndex: 1 },
          { questionText: "Which statement skips the current iteration and moves to the next one?", options: ["continue", "break", "exit", "stop"], correctAnswerIndex: 0 },
          { questionText: "What is a nested loop?", options: ["A function inside a loop", "A loop inside another loop", "A condition inside a loop", "A variable inside a loop"], correctAnswerIndex: 1 }
        ]
      }
    }
  ]
};

const runSeeder = async () => {
  await connectDB();
  try {
    console.log('Inserting pure C++ Programming Course...');
    const course = await Course.create({
      title: cppData.title,
      description: cppData.description,
      language: cppData.language
    });

    let modOrder = 1;
    for (const mod of cppData.modules) {
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
          questions: mod.quiz.questions,
          passingScore: mod.quiz.passingScore
        });
        moduleDoc.quiz = quizDoc._id;
      }
      
      await moduleDoc.save();
      course.modules.push(moduleDoc._id);
    }
    await course.save();

    console.log('C++ Programming Course seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
};

runSeeder();
