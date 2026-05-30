const fs = require('fs');
const path = require('path');

const generatePython = () => {
  return {
    title: 'Python Mastery',
    description: 'Complete Python from basics to Advanced (NumPy, Pandas, APIs).',
    language: 'Python',
    modules: [
      {
        title: 'Introduction to Python',
        description: 'Getting started with Python syntax and environment.',
        lessons: [
          {
            title: 'What is Python?',
            content: `## What is Python?\nPython is a high-level, interpreted programming language known for its extreme readability and simplicity. Created by Guido van Rossum in 1991, it has grown to become the dominant language for Data Science, AI, and backend web development.\n\n### Key Features:\n- **Interpreted**: Code is executed line by line, making debugging easier.\n- **Dynamically Typed**: You don't need to declare variable types.\n- **Garbage Collected**: Memory management is handled automatically.\n\n### Your First Program\n\`\`\`python\nprint("Hello, World!")\n\`\`\`\n\nThis single line of code outputs text to the console. Notice there are no semicolons or mandatory braces.`
          },
          {
            title: 'Setting up the Environment',
            content: `## Environment Setup\nTo write Python, you need an interpreter and an IDE (like VS Code or PyCharm).\n\n1. Download Python from python.org\n2. Check installation in terminal:\n\`\`\`bash\npython --version\n\`\`\`\n3. Write code in a \`.py\` file and run it using \`python filename.py\`.`
          }
        ],
        quiz: {
          title: 'Introduction Quiz',
          questions: [
            { questionText: 'Who created Python?', options: ['Dennis Ritchie', 'Guido van Rossum', 'James Gosling', 'Bjarne Stroustrup'], correctAnswerIndex: 1 },
            { questionText: 'Is Python statically or dynamically typed?', options: ['Statically', 'Dynamically', 'Both', 'Neither'], correctAnswerIndex: 1 },
            { questionText: 'What is the correct syntax to output "Hello World" in Python?', options: ['echo "Hello World"', 'print("Hello World")', 'console.log("Hello World")', 'System.out.println("Hello World")'], correctAnswerIndex: 1 },
            { questionText: 'Which of the following is NOT a core use case for Python?', options: ['Data Science', 'Machine Learning', 'Low-level OS Development', 'Backend Web Development'], correctAnswerIndex: 2 },
            { questionText: 'Does Python require semicolons at the end of every statement?', options: ['Yes', 'No', 'Only in loops', 'Only for variables'], correctAnswerIndex: 1 }
          ]
        }
      },
      {
        title: 'Variables and Data Types',
        description: 'Core data types in Python.',
        lessons: [
          {
            title: 'Variables & Primitives',
            content: `## Variables in Python\nPython is dynamically typed, meaning you don't declare the type of a variable.\n\n\`\`\`python\nx = 10          # Integer\npi = 3.14       # Float\nname = "Alice"  # String\nis_valid = True # Boolean\n\`\`\`\n\n### Type Checking\nYou can check the type of a variable using the \`type()\` function:\n\`\`\`python\nprint(type(x))  # <class 'int'>\n\`\`\``
          },
          {
            title: 'Type Conversion',
            content: `## Casting\nSometimes you need to convert between types (e.g., String to Integer).\n\n\`\`\`python\nstr_num = "50"\nreal_num = int(str_num)\nprint(real_num + 10) # Outputs 60\n\`\`\``
          }
        ],
        quiz: {
          title: 'Variables Quiz',
          questions: [
            { questionText: 'What is the output of type(5.5)?', options: ['int', 'double', 'float', 'decimal'], correctAnswerIndex: 2 },
            { questionText: 'How do you convert a string "10" to an integer?', options: ['parseInt("10")', 'int("10")', 'toInteger("10")', 'Integer.parse("10")'], correctAnswerIndex: 1 },
            { questionText: 'Which of these is a valid boolean in Python?', options: ['true', 'TRUE', 'True', 'T'], correctAnswerIndex: 2 },
            { questionText: 'Can you change the type of a variable after it is declared in Python?', options: ['Yes', 'No'], correctAnswerIndex: 0 },
            { questionText: 'What happens if you run `int("hello")`?', options: ['Returns 0', 'Returns None', 'Throws a ValueError', 'Returns -1'], correctAnswerIndex: 2 }
          ]
        }
      },
      {
        title: 'Conditions and Loops',
        description: 'Control flow in Python.',
        lessons: [
          {
            title: 'If, Elif, Else',
            content: `## Conditional Statements\nPython relies on indentation (whitespace) to define scope in the code.\n\n\`\`\`python\nage = 20\nif age >= 18:\n    print("Adult")\nelif age > 12:\n    print("Teenager")\nelse:\n    print("Child")\n\`\`\``
          },
          {
            title: 'For and While Loops',
            content: `## Iteration\n### For Loop\nUsed for iterating over a sequence (list, tuple, dictionary, set, or string).\n\`\`\`python\nfor i in range(5):\n    print(i) # Prints 0 to 4\n\`\`\`\n\n### While Loop\nExecutes a set of statements as long as a condition is true.\n\`\`\`python\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n\`\`\``
          }
        ],
        quiz: {
          title: 'Control Flow Quiz',
          questions: [
            { questionText: 'Which keyword is used for "else if" in Python?', options: ['elseif', 'else if', 'elif', 'elsif'], correctAnswerIndex: 2 },
            { questionText: 'What does `range(3)` generate?', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'], correctAnswerIndex: 1 },
            { questionText: 'How does Python denote code blocks?', options: ['Curly braces {}', 'Square brackets []', 'Indentation', 'Parentheses ()'], correctAnswerIndex: 2 },
            { questionText: 'What happens if a while loop condition never becomes false?', options: ['Syntax Error', 'Infinite Loop', 'Memory Leak', 'Program stops immediately'], correctAnswerIndex: 1 },
            { questionText: 'Which keyword immediately terminates a loop?', options: ['stop', 'end', 'break', 'return'], correctAnswerIndex: 2 }
          ]
        }
      },
      {
        title: 'Functions',
        description: 'Reusable blocks of code.',
        lessons: [
          {
            title: 'Defining Functions',
            content: `## Functions\nA function is defined using the \`def\` keyword.\n\n\`\`\`python\ndef greet(name):\n    """This is a docstring"""\n    return f"Hello, {name}!"\n\nmessage = greet("Alice")\nprint(message)\n\`\`\``
          },
          {
            title: 'Args and Kwargs',
            content: `## Flexible Arguments\n\`*args\` and \`**kwargs\` allow you to pass a variable number of arguments to a function.\n\n\`\`\`python\ndef sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4)) # Outputs 10\n\`\`\``
          }
        ],
        quiz: {
          title: 'Functions Quiz',
          questions: [
            { questionText: 'Which keyword defines a function?', options: ['func', 'function', 'def', 'define'], correctAnswerIndex: 2 },
            { questionText: 'What is a docstring?', options: ['A string used for math', 'A multi-line string documenting a function', 'A variable type', 'A type of list'], correctAnswerIndex: 1 },
            { questionText: 'What does `*args` do?', options: ['Passes a dictionary of arguments', 'Passes a variable number of positional arguments', 'Throws an error', 'Multiplies variables'], correctAnswerIndex: 1 },
            { questionText: 'What does a function return by default if there is no return statement?', options: ['0', '""', 'None', 'False'], correctAnswerIndex: 2 },
            { questionText: 'Can a function return multiple values in Python?', options: ['Yes, as a tuple', 'No, only one value', 'Yes, as an array only', 'Yes, as a string only'], correctAnswerIndex: 0 }
          ]
        }
      },
      {
        title: 'Lists and Dictionaries',
        description: 'Data structures in Python.',
        lessons: [
          {
            title: 'Lists',
            content: `## Lists\nLists are ordered, mutable collections.\n\n\`\`\`python\nfruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nprint(fruits[0]) # apple\n\`\`\``
          },
          {
            title: 'Dictionaries',
            content: `## Dictionaries\nDictionaries store data in key-value pairs.\n\n\`\`\`python\nuser = {\n    "name": "John",\n    "age": 30\n}\nprint(user["name"]) # John\nuser["city"] = "New York"\n\`\`\``
          }
        ],
        quiz: {
          title: 'Data Structures Quiz',
          questions: [
            { questionText: 'Are lists in Python mutable?', options: ['Yes', 'No'], correctAnswerIndex: 0 },
            { questionText: 'Which symbol is used for Dictionaries?', options: ['[]', '()', '{}', '<>'], correctAnswerIndex: 2 },
            { questionText: 'How do you add an item to the end of a list?', options: ['add()', 'insert()', 'push()', 'append()'], correctAnswerIndex: 3 },
            { questionText: 'What happens if you access a non-existent key in a dictionary using square brackets (e.g., dict["fake"])?', options: ['Returns None', 'Throws a KeyError', 'Returns False', 'Creates the key'], correctAnswerIndex: 1 },
            { questionText: 'How can you safely access a dictionary key without throwing an error?', options: ['dict.fetch()', 'dict.get()', 'dict.grab()', 'dict.read()'], correctAnswerIndex: 1 }
          ]
        }
      }
    ]
  };
};

const generateCpp = () => {
  return {
    title: 'C++ Programming',
    description: 'Learn C++ including OOP and STL.',
    language: 'C++',
    modules: [
      {
        title: 'Basics & Syntax',
        description: 'Getting started with C++.',
        lessons: [
          {
            title: 'Hello World',
            content: `## C++ Structure\nC++ is a compiled language. Every C++ program must have a \`main()\` function.\n\n\`\`\`cpp\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n\`\`\``
          },
          {
            title: 'Data Types',
            content: `## Primitives\nC++ is statically typed.\n- \`int\`: Integer\n- \`float\`, \`double\`: Decimals\n- \`char\`: Single character\n- \`bool\`: true/false`
          }
        ],
        quiz: {
          title: 'C++ Basics Quiz',
          questions: [
            { questionText: 'Which function is the entry point of a C++ program?', options: ['start()', 'init()', 'main()', 'run()'], correctAnswerIndex: 2 },
            { questionText: 'What does `std::cout` do?', options: ['Reads input', 'Prints output', 'Calculates math', 'Clears memory'], correctAnswerIndex: 1 },
            { questionText: 'Which library is required for standard input/output in C++?', options: ['<stdio.h>', '<iostream>', '<math.h>', '<string>'], correctAnswerIndex: 1 },
            { questionText: 'Is C++ statically or dynamically typed?', options: ['Statically typed', 'Dynamically typed', 'Both', 'Neither'], correctAnswerIndex: 0 },
            { questionText: 'What symbol is used to end a statement in C++?', options: ['.', ':', ';', 'No symbol needed'], correctAnswerIndex: 2 }
          ]
        }
      },
      {
        title: 'Pointers & Memory',
        description: 'Memory addresses and manipulation.',
        lessons: [
          {
            title: 'Introduction to Pointers',
            content: `## Pointers\nA pointer is a variable that stores the memory address of another variable.\n\n\`\`\`cpp\nint var = 20;\nint *ptr = &var;\nstd::cout << ptr; // Prints memory address\nstd::cout << *ptr; // Prints 20 (dereferencing)\n\`\`\``
          }
        ],
        quiz: {
          title: 'Pointers Quiz',
          questions: [
            { questionText: 'What does the `&` operator do in C++?', options: ['Dereferences a pointer', 'Returns the memory address of a variable', 'Multiplies values', 'Creates a reference'], correctAnswerIndex: 1 },
            { questionText: 'What does the `*` operator do when applied to a pointer variable?', options: ['Returns the memory address', 'Dereferences the pointer to get the value', 'Deletes the pointer', 'Multiplies by a pointer'], correctAnswerIndex: 1 },
            { questionText: 'What is a null pointer?', options: ['A pointer that points to memory address 0', 'A pointer that points to negative memory', 'A broken pointer', 'A pointer to a string'], correctAnswerIndex: 0 },
            { questionText: 'Which keyword is used to allocate dynamic memory in C++?', options: ['malloc', 'alloc', 'new', 'create'], correctAnswerIndex: 2 },
            { questionText: 'Which keyword frees dynamically allocated memory in C++?', options: ['free', 'delete', 'remove', 'destroy'], correctAnswerIndex: 1 }
          ]
        }
      }
    ]
  };
};

const generateJava = () => {
  return {
    title: 'Java Masterclass',
    description: 'Learn Java from scratch to advanced concepts.',
    language: 'Java',
    modules: [
      {
        title: 'Java Basics',
        description: 'Syntax, JVM, and initial setup.',
        lessons: [
          {
            title: 'Structure of a Java Program',
            content: `## Java Structure\nEverything in Java must be inside a class. The file name must match the class name.\n\n\`\`\`java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n\`\`\``
          }
        ],
        quiz: {
          title: 'Java Basics Quiz',
          questions: [
            { questionText: 'What compiles Java code into bytecode?', options: ['JRE', 'JVM', 'JDK compiler (javac)', 'JIT'], correctAnswerIndex: 2 },
            { questionText: 'What runs the Java bytecode?', options: ['Compiler', 'JVM', 'Browser', 'OS directly'], correctAnswerIndex: 1 },
            { questionText: 'Can a Java file contain multiple public classes?', options: ['Yes', 'No', 'Only interfaces', 'Only abstract classes'], correctAnswerIndex: 1 },
            { questionText: 'Which method is the entry point for any Java application?', options: ['start()', 'run()', 'init()', 'main()'], correctAnswerIndex: 3 },
            { questionText: 'Is Java purely object-oriented?', options: ['Yes', 'No, it has primitive types', 'No, it supports global functions', 'Yes, everything inherits from Object'], correctAnswerIndex: 1 }
          ]
        }
      },
      {
        title: 'Object Oriented Programming',
        description: 'Classes, Objects, Inheritance.',
        lessons: [
          {
            title: 'Classes and Inheritance',
            content: `## Inheritance\nJava uses the \`extends\` keyword for inheritance.\n\n\`\`\`java\nclass Animal {\n    void eat() { System.out.println("Eating"); }\n}\nclass Dog extends Animal {\n    void bark() { System.out.println("Barking"); }\n}\n\`\`\``
          }
        ],
        quiz: {
          title: 'Java OOP Quiz',
          questions: [
            { questionText: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'extends', 'inherits', 'super'], correctAnswerIndex: 1 },
            { questionText: 'Does Java support multiple inheritance for classes?', options: ['Yes', 'No'], correctAnswerIndex: 1 },
            { questionText: 'Which keyword refers to the current object instance?', options: ['super', 'this', 'self', 'current'], correctAnswerIndex: 1 },
            { questionText: 'What is used to achieve runtime polymorphism in Java?', options: ['Method Overloading', 'Method Overriding', 'Interfaces', 'Static methods'], correctAnswerIndex: 1 },
            { questionText: 'Which access modifier makes a member accessible only within its own package?', options: ['public', 'private', 'protected', 'default (no modifier)'], correctAnswerIndex: 3 }
          ]
        }
      }
    ]
  };
};

const generateData = () => {
  const courses = [
    generatePython(),
    generateCpp(),
    generateJava()
  ];
  
  fs.writeFileSync(path.join(__dirname, '../data/courses/courses.json'), JSON.stringify(courses, null, 2));
  console.log('Successfully generated extensive courses.json data.');
};

generateData();
