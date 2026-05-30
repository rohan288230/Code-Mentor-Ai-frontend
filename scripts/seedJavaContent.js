require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

const javaData = {
  title: 'Java Programming Mastery',
  description: 'Learn Java from beginner to advanced level. Master object-oriented programming, collections framework, exception handling, multithreading, JDBC, file handling, and modern Java development used in software engineering and enterprise applications.',
  language: 'Java',
  modules: [
    {
      title: "Introduction to Java",
      description: "This module introduces the fundamentals of Java Programming Language. Learners will understand the history of Java, its features, applications, development environment setup, Java Virtual Machine (JVM), Java Runtime Environment (JRE), Java Development Kit (JDK), program structure, and the compilation process. This module serves as the foundation for all upcoming Java programming concepts.",
      estimatedDuration: "60 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand what Java is",
        "Learn the history of Java",
        "Understand Java's features",
        "Learn JVM, JRE, and JDK",
        "Install Java Development Kit",
        "Set up the development environment",
        "Understand Java program structure",
        "Write and execute the first Java program"
      ],
      lessons: [
        {
          title: "Introduction to Programming",
          content: "Programming is the process of creating instructions that tell a computer how to perform specific tasks. Modern applications, websites, mobile apps, and software systems are built using programming languages. Java is one of the most widely used programming languages in the world."
        },
        {
          title: "What is Java?",
          content: "Java is a high-level, object-oriented, and platform-independent programming language developed by Sun Microsystems in 1995. It is designed to be simple, secure, portable, and reliable. Java follows the principle of 'Write Once, Run Anywhere', allowing programs to run on different operating systems without modification."
        },
        {
          title: "History of Java",
          content: "Java was developed by James Gosling and his team at Sun Microsystems. Initially called Oak, it was later renamed Java. The language became popular because of its platform independence and ability to run on different devices using the Java Virtual Machine."
        },
        {
          title: "Why Learn Java?",
          content: "Java is one of the most in-demand programming languages in the software industry. It is used in enterprise applications, Android development, web applications, cloud computing, and backend systems. Learning Java provides a strong foundation in object-oriented programming and software development."
        },
        {
          title: "Applications of Java",
          content: "Java is used for Android app development, enterprise software, banking systems, e-commerce platforms, web applications, cloud services, desktop applications, and big data technologies. Popular companies such as Amazon, Netflix, LinkedIn, and Uber use Java in various systems."
        },
        {
          title: "Features of Java",
          content: "Java provides object-oriented programming, platform independence, automatic memory management, strong security, multithreading support, portability, and a rich standard library. These features make Java suitable for building scalable and reliable applications."
        },
        {
          title: "Understanding JDK, JRE, and JVM",
          content: "JDK (Java Development Kit) provides tools required to develop Java applications. JRE (Java Runtime Environment) provides the environment needed to run Java programs. JVM (Java Virtual Machine) executes Java bytecode and enables platform independence."
        },
        {
          title: "Installing Java",
          content: "To start Java development, install the latest JDK from Oracle or OpenJDK. After installation, verify the setup using the commands 'java -version' and 'javac -version' in the terminal."
        },
        {
          title: "Setting Up the Development Environment",
          content: "Developers commonly use IntelliJ IDEA, Eclipse, NetBeans, and Visual Studio Code for Java development. These IDEs provide debugging tools, code completion, project management, and productivity features."
        },
        {
          title: "Structure of a Java Program",
          content: "A Java program consists of classes, methods, variables, and statements. Every Java application starts execution from the main() method. Understanding program structure is important for writing organized and maintainable code."
        },
        {
          title: "The main() Method",
          content: "The main() method is the entry point of a Java application. When a Java program runs, execution starts from the main() method and continues until all statements are executed."
        },
        {
          title: "Compilation and Execution Process",
          content: "Java source code is compiled into bytecode using the Java compiler. The JVM then executes this bytecode. This two-step process allows Java programs to run on different platforms without modification."
        },
        {
          title: "Comments in Java",
          content: "Comments improve code readability and documentation. Java supports single-line comments using //, multi-line comments using /* */, and documentation comments using /** */."
        },
        {
          title: "Advantages of Java",
          content: "Java provides platform independence, strong security, scalability, object-oriented design, automatic garbage collection, and a large developer community. These advantages make Java one of the most trusted programming languages in the industry."
        },
        {
          title: "Real-World Importance of Java",
          content: "Java powers banking systems, enterprise software, Android applications, cloud platforms, e-commerce websites, and backend services. Its reliability and scalability make it a preferred choice for large-scale software development."
        }
      ],
      quiz: {
        title: "Introduction to Java Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Who developed Java?", options: ["Dennis Ritchie", "James Gosling", "Bjarne Stroustrup", "Guido van Rossum"], correctAnswerIndex: 1 },
          { questionText: "Java was originally called:", options: ["Oak", "Pine", "Cedar", "Maple"], correctAnswerIndex: 0 },
          { questionText: "What is the entry point of a Java program?", options: ["start()", "main()", "run()", "execute()"], correctAnswerIndex: 1 },
          { questionText: "What does JVM stand for?", options: ["Java Variable Machine", "Java Virtual Machine", "Java Visual Manager", "Java Version Manager"], correctAnswerIndex: 1 },
          { questionText: "Which feature makes Java platform independent?", options: ["Compiler", "JVM", "IDE", "JDK"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Variables and Data Types in Java",
      description: "This module introduces Variables and Data Types in Java. Learners will understand how data is stored in memory, how variables are declared and initialized, different primitive and non-primitive data types, constants, type casting, and best practices for naming variables. These concepts form the foundation of every Java application.",
      estimatedDuration: "65 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand variables and memory storage",
        "Declare and initialize variables",
        "Learn primitive data types",
        "Understand non-primitive data types",
        "Use constants in Java",
        "Learn type casting",
        "Understand memory allocation basics",
        "Apply variables in real-world applications"
      ],
      lessons: [
        {
          title: "Introduction to Variables",
          content: "Variables are named memory locations used to store data in a program. They allow applications to save information such as names, ages, marks, salaries, and calculation results. Variables make programs dynamic because values can change during execution."
        },
        {
          title: "Why Variables are Important",
          content: "Variables help programs store and manage data efficiently. Without variables, developers would not be able to process user input, perform calculations, or maintain application state."
        },
        {
          title: "Declaring Variables in Java",
          content: "In Java, every variable must be declared with a specific data type before it can be used. The declaration tells the compiler what type of data will be stored and how much memory should be allocated."
        },
        {
          title: "Variable Initialization",
          content: "Initialization means assigning a value to a variable when it is created. Proper initialization helps avoid unexpected behavior and makes programs more reliable."
        },
        {
          title: "What are Data Types?",
          content: "Data types define the kind of values that can be stored in a variable. Java provides primitive and non-primitive data types. Choosing the correct data type improves memory usage and application performance."
        },
        {
          title: "Primitive Data Types",
          content: "Java provides eight primitive data types: byte, short, int, long, float, double, char, and boolean. These data types are predefined by the language and are used to store simple values."
        },
        {
          title: "Integer Data Types",
          content: "Integer data types include byte, short, int, and long. They are used to store whole numbers. Each type provides different storage capacity depending on the size of the value being stored."
        },
        {
          title: "Floating Point Data Types",
          content: "Float and double are used to store decimal values. Double provides greater precision than float and is commonly used in scientific and financial calculations."
        },
        {
          title: "Character Data Type",
          content: "The char data type stores a single Unicode character. Characters are commonly used for grades, symbols, and individual letters."
        },
        {
          title: "Boolean Data Type",
          content: "The boolean data type stores logical values. It can contain either true or false and is heavily used in conditional statements, loops, authentication systems, and validations."
        },
        {
          title: "Non-Primitive Data Types",
          content: "Non-primitive data types include String, Arrays, Classes, and Objects. These types are used to store more complex information and form the basis of object-oriented programming."
        },
        {
          title: "The String Data Type",
          content: "Strings are used to store text and sequences of characters. They are widely used for names, messages, passwords, user input, and textual data in applications."
        },
        {
          title: "Constants in Java",
          content: "Constants are values that cannot be changed once assigned. In Java, constants are declared using the final keyword. Constants improve code safety and readability."
        },
        {
          title: "Type Casting",
          content: "Type casting is the process of converting one data type into another. Java supports widening casting, where smaller types are converted to larger types automatically, and narrowing casting, where larger types are converted to smaller types manually."
        },
        {
          title: "Memory Allocation Basics",
          content: "Every variable occupies memory. Primitive data types store actual values directly, while non-primitive types store references to objects. Understanding memory allocation helps developers write efficient programs."
        },
        {
          title: "Variable Naming Rules",
          content: "Variable names can contain letters, digits, underscores, and dollar signs. They cannot start with a number and cannot use reserved Java keywords. Meaningful names improve code readability."
        },
        {
          title: "Best Practices for Variables",
          content: "Use descriptive names such as studentName, totalMarks, and accountBalance. Follow camelCase naming conventions and avoid using unclear or abbreviated names."
        },
        {
          title: "Real-World Applications of Variables",
          content: "Variables are used in banking software to store account balances, social media platforms to manage user profiles, e-commerce applications to track products and prices, and mobile apps to handle user information."
        }
      ],
      quiz: {
        title: "Variables and Data Types Quiz",
        passingScore: 70,
        questions: [
          { questionText: "What is a variable?", options: ["A loop", "A named memory location", "A function", "A compiler"], correctAnswerIndex: 1 },
          { questionText: "Which Java data type is used to store whole numbers?", options: ["float", "boolean", "int", "char"], correctAnswerIndex: 2 },
          { questionText: "Which data type stores true or false values?", options: ["char", "boolean", "String", "int"], correctAnswerIndex: 1 },
          { questionText: "Which keyword is used to create a constant in Java?", options: ["const", "fixed", "final", "static"], correctAnswerIndex: 2 },
          { questionText: "Which non-primitive data type is used to store text?", options: ["char", "String", "boolean", "double"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Operators and Expressions in Java",
      description: "This module introduces Operators and Expressions in Java. Operators are special symbols used to perform operations on variables and values, while expressions are combinations of variables, values, and operators that produce a result. Understanding operators and expressions is essential for calculations, decision-making, and building real-world Java applications.",
      estimatedDuration: "70 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand operators and expressions",
        "Learn arithmetic operators",
        "Understand relational operators",
        "Use logical operators",
        "Learn assignment operators",
        "Understand unary operators",
        "Work with bitwise operators",
        "Understand operator precedence and associativity"
      ],
      lessons: [
        {
          title: "Introduction to Operators",
          content: "Operators are special symbols used to perform operations on variables and values. They help programmers perform calculations, compare values, manipulate data, and create logical conditions. Operators are one of the most frequently used components in Java programming."
        },
        {
          title: "What are Expressions?",
          content: "An expression is a combination of variables, constants, and operators that produces a value. Expressions are evaluated by the Java compiler and are used in assignments, calculations, conditions, and method arguments."
        },
        {
          title: "Arithmetic Operators",
          content: "Arithmetic operators are used to perform mathematical calculations. Java provides addition (+), subtraction (-), multiplication (*), division (/), and modulus (%) operators. These operators are commonly used in calculators, billing systems, and scientific applications."
        },
        {
          title: "Addition and Subtraction Operators",
          content: "The addition operator combines values and calculates totals, while the subtraction operator finds differences between values. These operators are widely used in financial applications, score calculations, and inventory systems."
        },
        {
          title: "Multiplication, Division, and Modulus Operators",
          content: "Multiplication is used for repeated addition, division calculates quotients, and modulus returns the remainder after division. Modulus is particularly useful for checking even and odd numbers."
        },
        {
          title: "Relational Operators",
          content: "Relational operators compare values and return either true or false. Common relational operators include ==, !=, >, <, >=, and <=. These operators are heavily used in conditions and loops."
        },
        {
          title: "Logical Operators",
          content: "Logical operators combine multiple conditions. Java provides AND (&&), OR (||), and NOT (!) operators. These operators are useful in authentication systems, validations, and decision-making applications."
        },
        {
          title: "Assignment Operators",
          content: "Assignment operators assign values to variables. The basic assignment operator is '='. Java also provides shorthand operators such as +=, -=, *=, /=, and %= to simplify calculations and assignments."
        },
        {
          title: "Unary Operators",
          content: "Unary operators work with a single operand. Common unary operators include increment (++), decrement (--), unary plus (+), unary minus (-), and logical NOT (!)."
        },
        {
          title: "Increment and Decrement Operators",
          content: "The increment operator increases a variable's value by one, while the decrement operator decreases it by one. These operators are commonly used in loops, counters, and iteration processes."
        },
        {
          title: "Bitwise Operators",
          content: "Bitwise operators perform operations directly on binary values. Java provides &, |, ^, ~, <<, and >> operators. These operators are useful in low-level programming, networking, and embedded systems."
        },
        {
          title: "Ternary Operator",
          content: "The ternary operator (? :) is a shorthand version of an if-else statement. It helps reduce code length and improves readability when making simple decisions."
        },
        {
          title: "Operator Precedence",
          content: "Operator precedence determines the order in which operations are evaluated. Understanding precedence helps developers avoid logical errors and ensures correct calculations."
        },
        {
          title: "Operator Associativity",
          content: "Associativity determines the order in which operators of the same precedence level are evaluated. Most operators are evaluated from left to right, while some are evaluated from right to left."
        },
        {
          title: "Expressions in Java",
          content: "Expressions are formed using operators and operands. Java evaluates expressions according to precedence and associativity rules. Expressions can be arithmetic, relational, logical, or assignment-based."
        },
        {
          title: "Real-World Applications of Operators",
          content: "Operators are used in banking systems for balance calculations, e-commerce platforms for discounts and taxes, educational systems for grading, gaming applications for scoring, and business software for analytics."
        },
        {
          title: "Best Practices for Using Operators",
          content: "Use parentheses when expressions become complex, avoid unnecessary operator chaining, write readable expressions, and understand precedence rules to improve code quality and maintainability."
        }
      ],
      quiz: {
        title: "Operators and Expressions Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which operator is used for addition in Java?", options: ["+", "-", "*", "/"], correctAnswerIndex: 0 },
          { questionText: "Which operator returns the remainder after division?", options: ["/", "%", "*", "+"], correctAnswerIndex: 1 },
          { questionText: "Which operator checks equality?", options: ["=", "==", "!=", ">="], correctAnswerIndex: 1 },
          { questionText: "Which logical operator represents AND?", options: ["||", "&&", "!", "&"], correctAnswerIndex: 1 },
          { questionText: "Which operator increases a variable's value by one?", options: ["--", "++", "+=", "*="], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Conditional Statements in Java",
      description: "This module introduces Conditional Statements in Java. Conditional statements allow programs to make decisions based on different conditions. They control the flow of execution by selecting specific code blocks depending on whether a condition evaluates to true or false. These concepts are essential for building interactive and intelligent Java applications.",
      estimatedDuration: "65 Minutes",
      difficulty: "Beginner",
      learningObjectives: [
        "Understand decision making in programming",
        "Learn if statements",
        "Learn if-else statements",
        "Understand else-if ladders",
        "Work with nested if statements",
        "Learn switch statements",
        "Use logical operators in conditions",
        "Build real-world decision-making applications"
      ],
      lessons: [
        {
          title: "Introduction to Conditional Statements",
          content: "Conditional statements allow a program to make decisions based on specific conditions. Instead of executing the same instructions every time, programs can choose different actions depending on user input, calculations, or system states."
        },
        {
          title: "Why Conditional Statements are Important",
          content: "Modern software applications constantly make decisions. Login systems verify credentials, banking applications check account balances, and e-commerce platforms determine discounts. Conditional statements make these decisions possible."
        },
        {
          title: "Boolean Expressions",
          content: "Conditional statements depend on boolean expressions. A boolean expression evaluates to either true or false. These expressions are created using comparison operators and logical operators."
        },
        {
          title: "The if Statement",
          content: "The if statement is the simplest decision-making statement in Java. It executes a block of code only when a specified condition evaluates to true. If the condition is false, the code block is skipped."
        },
        {
          title: "The if-else Statement",
          content: "The if-else statement provides two possible execution paths. If the condition is true, the if block executes. Otherwise, the else block executes. This structure is commonly used in validations and user authentication systems."
        },
        {
          title: "The else-if Ladder",
          content: "The else-if ladder is used when multiple conditions need to be checked. The program evaluates each condition one by one and executes the first matching block. This is useful for grading systems, menu-driven programs, and business rules."
        },
        {
          title: "Nested if Statements",
          content: "A nested if statement is an if statement placed inside another if statement. Nested conditions are useful when multiple levels of verification or validation are required before performing an action."
        },
        {
          title: "Comparison Operators in Conditions",
          content: "Comparison operators compare values and return either true or false. Common comparison operators include ==, !=, >, <, >=, and <=. They form the foundation of most conditional statements."
        },
        {
          title: "Logical Operators in Conditions",
          content: "Logical operators combine multiple conditions. Java provides && (AND), || (OR), and ! (NOT). These operators help create complex decision-making logic."
        },
        {
          title: "Introduction to switch Statement",
          content: "The switch statement allows programs to select one option from multiple possible choices. It provides a cleaner and more organized alternative to long else-if ladders."
        },
        {
          title: "Case Labels and break Statement",
          content: "Each case inside a switch statement represents a possible value. The break statement prevents execution from continuing into the next case after a match is found."
        },
        {
          title: "Default Case",
          content: "The default case executes when none of the specified cases match the expression value. It acts similarly to the else block in an if-else statement."
        },
        {
          title: "Switch vs If-Else",
          content: "If-else statements are suitable for complex conditions and ranges, while switch statements are ideal when checking a single variable against multiple fixed values."
        },
        {
          title: "Common Mistakes in Conditional Statements",
          content: "Developers often confuse = and == operators, forget break statements in switch cases, or create overly complex nested conditions. Proper validation and readability practices help prevent these mistakes."
        },
        {
          title: "Real-World Applications of Conditional Statements",
          content: "Conditional statements are used in ATM systems, login authentication, online shopping discounts, examination result systems, banking software, traffic control systems, and mobile applications."
        },
        {
          title: "Best Practices for Decision Making",
          content: "Keep conditions simple and readable, avoid deep nesting, use switch statements when appropriate, and ensure all possible cases are handled properly to improve maintainability."
        }
      ],
      quiz: {
        title: "Conditional Statements Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which statement is used for decision making in Java?", options: ["for", "while", "if", "class"], correctAnswerIndex: 2 },
          { questionText: "Which operator checks equality?", options: ["=", "==", "!=", ">="], correctAnswerIndex: 1 },
          { questionText: "Which statement is used when multiple conditions need to be checked?", options: ["if", "switch", "else-if ladder", "All of the Above"], correctAnswerIndex: 3 },
          { questionText: "Which logical operator represents OR?", options: ["&&", "||", "!", "&"], correctAnswerIndex: 1 },
          { questionText: "What is the purpose of the default case in a switch statement?", options: ["Stops execution", "Executes when no case matches", "Creates a loop", "Starts execution"], correctAnswerIndex: 1 }
        ]
      }
    },
    {
      title: "Loops in Java",
      description: "This module introduces Loops in Java. Loops allow programs to execute a block of code repeatedly until a specific condition is met. They help reduce code duplication, improve efficiency, and automate repetitive tasks. Learners will understand for loops, while loops, do-while loops, nested loops, and loop control statements used in real-world applications.",
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
          content: "Loops are control structures that allow a block of code to execute repeatedly. Instead of writing the same statements multiple times, programmers can use loops to automate repetitive tasks efficiently. Loops are essential for building scalable and efficient applications."
        },
        {
          title: "Why Loops are Important",
          content: "Many programming problems require the same operation to be performed multiple times. Loops reduce code duplication, improve readability, and make programs easier to maintain. They are widely used in data processing, report generation, searching algorithms, and automation tasks."
        },
        {
          title: "Understanding Iteration",
          content: "Iteration refers to repeatedly executing a block of code. Each execution is called an iteration. Loops automate this repetition and continue executing until a specified condition becomes false."
        },
        {
          title: "The for Loop",
          content: "The for loop is used when the number of iterations is known beforehand. It consists of initialization, condition checking, and update expressions. The for loop is commonly used for counting, traversing arrays, and performing repetitive calculations."
        },
        {
          title: "Components of a for Loop",
          content: "A for loop contains three main components: initialization, condition, and update expression. Initialization executes once at the beginning, the condition is checked before every iteration, and the update expression modifies the loop variable after each iteration."
        },
        {
          title: "Enhanced for Loop (For-Each Loop)",
          content: "Java provides an enhanced for loop that simplifies iteration over arrays and collections. It improves readability and eliminates the need for manual index management when processing elements."
        },
        {
          title: "The while Loop",
          content: "The while loop executes as long as a specified condition remains true. It is useful when the number of iterations is not known in advance and depends on user input, system events, or runtime conditions."
        },
        {
          title: "Working of a while Loop",
          content: "Before each iteration, the condition is evaluated. If the condition is true, the loop body executes. If the condition becomes false, the loop terminates and execution moves to the next statement."
        },
        {
          title: "The do-while Loop",
          content: "The do-while loop executes the loop body first and checks the condition afterward. This guarantees that the loop executes at least once regardless of the initial condition."
        },
        {
          title: "Difference Between while and do-while",
          content: "A while loop checks its condition before execution, whereas a do-while loop checks the condition after execution. As a result, a do-while loop always runs at least one time."
        },
        {
          title: "Nested Loops",
          content: "A nested loop is a loop inside another loop. Nested loops are commonly used for pattern printing, matrix operations, multiplication tables, and multidimensional data processing."
        },
        {
          title: "Infinite Loops",
          content: "An infinite loop occurs when the loop condition never becomes false. Infinite loops can consume system resources and should be used carefully. They are sometimes intentionally used in servers, game engines, and real-time systems."
        },
        {
          title: "Break Statement",
          content: "The break statement immediately terminates a loop regardless of the loop condition. It is useful when a desired result has been found and no further iterations are required."
        },
        {
          title: "Continue Statement",
          content: "The continue statement skips the current iteration and moves directly to the next iteration of the loop. It allows developers to ignore specific cases without terminating the loop."
        },
        {
          title: "Loop Control Variables",
          content: "Loop control variables determine how many times a loop executes. Properly updating these variables is essential to prevent infinite loops and ensure correct program behavior."
        },
        {
          title: "Real-World Applications of Loops",
          content: "Loops are used in banking systems, payroll software, report generation, search algorithms, inventory management systems, gaming applications, machine learning algorithms, and data processing systems."
        },
        {
          title: "Best Practices for Using Loops",
          content: "Use meaningful loop variables, avoid unnecessary nesting, clearly define loop termination conditions, choose the appropriate loop type, and use break and continue statements carefully to improve code readability and maintainability."
        }
      ],
      quiz: {
        title: "Loops Quiz",
        passingScore: 70,
        questions: [
          { questionText: "Which loop is commonly used when the number of iterations is known?", options: ["while", "do-while", "for", "switch"], correctAnswerIndex: 2 },
          { questionText: "Which Java loop guarantees at least one execution?", options: ["for", "while", "do-while", "enhanced for"], correctAnswerIndex: 2 },
          { questionText: "Which statement immediately exits a loop?", options: ["continue", "break", "return", "stop"], correctAnswerIndex: 1 },
          { questionText: "Which statement skips the current iteration and moves to the next one?", options: ["continue", "break", "exit", "return"], correctAnswerIndex: 0 },
          { questionText: "What is a nested loop?", options: ["A function inside a loop", "A loop inside another loop", "A condition inside a loop", "A variable inside a loop"], correctAnswerIndex: 1 }
        ]
      }
    }
  ]
};

const runSeeder = async () => {
  await connectDB();
  try {
    console.log('Inserting pure Java Programming Course...');
    const course = await Course.create({
      title: javaData.title,
      description: javaData.description,
      language: javaData.language
    });

    let modOrder = 1;
    for (const mod of javaData.modules) {
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

    console.log('Java Programming Course seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
};

runSeeder();
