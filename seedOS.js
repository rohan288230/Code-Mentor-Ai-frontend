const mongoose = require('mongoose');
require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const OSSubject = require('./models/OSSubject');
const OSTopic = require('./models/OSTopic');
const OSNotes = require('./models/OSNotes');
const OSQuiz = require('./models/OSQuiz');

const modules = [
  {
    "title": "Introduction to Operating Systems",
    "description": "This module introduces the fundamentals of Operating Systems. Learners will understand what an Operating System is, why it is important, its role in computer systems, basic architecture, system components, and real-world applications. This module provides the foundation required for understanding advanced Operating System concepts.",
    "estimatedDuration": "60 Minutes",
    "difficulty": "Beginner",
    "learningObjectives": [
      "Understand what an Operating System is",
      "Learn the purpose of an Operating System",
      "Understand the relationship between hardware and software",
      "Learn the components of an Operating System",
      "Understand the role of the kernel",
      "Identify popular Operating Systems",
      "Learn Operating System architecture basics",
      "Build a foundation for advanced OS concepts"
    ],
    "lessons": [
      {
        "title": "Introduction to Operating Systems",
        "content": "An Operating System (OS) is system software that manages computer hardware and software resources while providing services for computer programs. It acts as an intermediary between users, applications, and hardware."
      },
      {
        "title": "Why Operating Systems are Important",
        "content": "Without an Operating System, users would need to interact directly with hardware components. The OS simplifies this interaction by providing a user-friendly environment and managing system resources efficiently."
      },
      {
        "title": "What is System Software?",
        "content": "System software is software designed to operate and control computer hardware. Operating Systems are the most important type of system software because they provide the platform on which applications run."
      },
      {
        "title": "Role of an Operating System",
        "content": "The Operating System manages hardware resources, executes programs, controls memory allocation, handles files, manages devices, and provides security mechanisms for users and applications."
      },
      {
        "title": "Operating System as an Interface",
        "content": "The Operating System acts as a bridge between users and computer hardware. Users interact with applications, applications communicate with the Operating System, and the Operating System controls hardware devices."
      },
      {
        "title": "Components of an Operating System",
        "content": "Major Operating System components include the kernel, memory manager, process manager, file system, device drivers, security system, and user interface."
      },
      {
        "title": "Understanding the Kernel",
        "content": "The kernel is the core component of an Operating System. It directly interacts with hardware and manages processes, memory, devices, and system calls."
      },
      {
        "title": "User Space and Kernel Space",
        "content": "Operating Systems separate execution into user space and kernel space. User applications run in user space, while critical system operations execute in kernel space for security and stability."
      },
      {
        "title": "Hardware and Software Interaction",
        "content": "The Operating System enables communication between software applications and hardware devices. It translates application requests into commands that hardware can understand."
      },
      {
        "title": "Types of Computer Systems",
        "content": "Operating Systems are used in personal computers, servers, mobile devices, embedded systems, cloud platforms, and supercomputers."
      },
      {
        "title": "Popular Operating Systems",
        "content": "Common Operating Systems include Microsoft Windows, Linux, macOS, Android, and iOS. Each is designed to meet specific user and system requirements."
      },
      {
        "title": "Operating System Architecture",
        "content": "Operating System architecture defines how different OS components interact. Common architectures include Monolithic Kernel, Microkernel, Hybrid Kernel, and Modular Kernel architectures."
      },
      {
        "title": "System Calls",
        "content": "System calls allow user applications to request services from the Operating System. Examples include file operations, process creation, memory allocation, and device access."
      },
      {
        "title": "Booting Process",
        "content": "Booting is the process of starting a computer and loading the Operating System into memory. The bootloader initializes hardware and loads the kernel for execution."
      },
      {
        "title": "Operating Systems in Modern Computing",
        "content": "Modern Operating Systems support multitasking, networking, virtualization, security, cloud computing, and distributed systems. They are essential for nearly every digital device."
      },
      {
        "title": "Real-World Applications of Operating Systems",
        "content": "Operating Systems power smartphones, laptops, servers, ATMs, smart TVs, automobiles, cloud infrastructure, gaming consoles, and Internet of Things devices."
      },
      {
        "title": "Importance of Operating Systems in Technical Interviews",
        "content": "Operating Systems are a core subject in software engineering interviews. Topics such as processes, threads, memory management, scheduling, synchronization, and deadlocks are frequently asked."
      }
    ],
    "quiz": {
      "title": "Introduction to Operating Systems Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is an Operating System?",
          "options": [
            "Application Software",
            "Programming Language",
            "System Software",
            "Database"
          ],
          "correctAnswer": "System Software"
        },
        {
          "questionText": "What is the core component of an Operating System?",
          "options": [
            "Compiler",
            "Kernel",
            "Database",
            "Browser"
          ],
          "correctAnswer": "Kernel"
        },
        {
          "questionText": "Which of the following is an Operating System?",
          "options": [
            "Windows",
            "Linux",
            "macOS",
            "All of the Above"
          ],
          "correctAnswer": "All of the Above"
        },
        {
          "questionText": "What acts as an interface between hardware and software?",
          "options": [
            "Database",
            "Operating System",
            "Compiler",
            "Network"
          ],
          "correctAnswer": "Operating System"
        },
        {
          "questionText": "Which component loads the Operating System during startup?",
          "options": [
            "Firewall",
            "Bootloader",
            "Database",
            "Cache"
          ],
          "correctAnswer": "Bootloader"
        }
      ]
    }
  },
  {
    "title": "Functions of Operating System",
    "description": "This module introduces the core functions performed by an Operating System. Learners will understand how an Operating System manages processes, memory, files, devices, security, and system resources. These functions enable computers to operate efficiently and provide a stable environment for applications and users.",
    "estimatedDuration": "75 Minutes",
    "difficulty": "Beginner",
    "learningObjectives": [
      "Understand the major functions of an Operating System",
      "Learn process management",
      "Understand memory management",
      "Learn file management",
      "Understand device management",
      "Learn security and protection mechanisms",
      "Understand resource allocation",
      "Explore networking and performance management"
    ],
    "lessons": [
      {
        "title": "Introduction to Operating System Functions",
        "content": "An Operating System performs several important functions that allow hardware and software to work together efficiently. These functions ensure smooth execution of programs, efficient resource utilization, and secure system operation."
      },
      {
        "title": "Process Management",
        "content": "Process management involves creating, scheduling, executing, and terminating processes. The Operating System ensures that multiple processes can run efficiently while sharing CPU resources."
      },
      {
        "title": "CPU Scheduling",
        "content": "CPU scheduling determines which process gets access to the CPU at a given time. Scheduling algorithms help maximize CPU utilization and improve system responsiveness."
      },
      {
        "title": "Memory Management",
        "content": "Memory management controls how memory is allocated and deallocated to processes. It ensures efficient use of RAM and prevents processes from interfering with each other."
      },
      {
        "title": "Virtual Memory",
        "content": "Virtual memory allows systems to use disk space as an extension of RAM. This enables larger applications to run even when physical memory is limited."
      },
      {
        "title": "File Management",
        "content": "The Operating System organizes, stores, retrieves, and manages files on storage devices. It provides users with a structured way to access and manage data."
      },
      {
        "title": "Directory Management",
        "content": "Directories help organize files into logical structures. The Operating System manages directory creation, deletion, navigation, and permissions."
      },
      {
        "title": "Device Management",
        "content": "Device management controls communication between hardware devices and software applications. The Operating System uses device drivers to interact with hardware components."
      },
      {
        "title": "Input and Output Management",
        "content": "The Operating System manages input and output operations involving keyboards, mice, printers, displays, storage devices, and network interfaces."
      },
      {
        "title": "Security and Protection",
        "content": "Security mechanisms protect system resources from unauthorized access. The Operating System implements authentication, authorization, encryption, and access control mechanisms."
      },
      {
        "title": "User Management",
        "content": "Operating Systems support multiple users by maintaining user accounts, permissions, and access privileges. This helps ensure data privacy and security."
      },
      {
        "title": "Resource Allocation",
        "content": "The Operating System allocates resources such as CPU time, memory, storage, and devices among competing processes to maximize efficiency."
      },
      {
        "title": "Error Detection and Handling",
        "content": "The Operating System continuously monitors the system for errors and failures. It detects hardware faults, software issues, and abnormal conditions while taking corrective actions."
      },
      {
        "title": "Networking Functions",
        "content": "Modern Operating Systems provide networking capabilities that allow devices to communicate over local networks and the Internet. Networking functions include protocol support, communication management, and resource sharing."
      },
      {
        "title": "System Performance Monitoring",
        "content": "The Operating System monitors CPU usage, memory utilization, disk activity, and network performance. Monitoring helps identify bottlenecks and maintain system efficiency."
      },
      {
        "title": "User Interface Management",
        "content": "The Operating System provides user interfaces such as Graphical User Interfaces (GUI) and Command Line Interfaces (CLI) that allow users to interact with the system."
      },
      {
        "title": "Multitasking Support",
        "content": "Multitasking allows multiple programs to run simultaneously. The Operating System manages task switching and resource sharing to provide a smooth user experience."
      },
      {
        "title": "Real-World Importance of Operating System Functions",
        "content": "Every modern computing device relies on Operating System functions. Smartphones, laptops, cloud servers, gaming consoles, and embedded systems all depend on efficient process, memory, file, and device management."
      }
    ],
    "quiz": {
      "title": "Functions of Operating System Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which OS function is responsible for creating and managing processes?",
          "options": [
            "File Management",
            "Process Management",
            "Device Management",
            "Security Management"
          ],
          "correctAnswer": "Process Management"
        },
        {
          "questionText": "What is the primary purpose of Memory Management?",
          "options": [
            "Managing files",
            "Managing users",
            "Allocating and controlling memory",
            "Managing networks"
          ],
          "correctAnswer": "Allocating and controlling memory"
        },
        {
          "questionText": "Which OS component helps software communicate with hardware devices?",
          "options": [
            "Compiler",
            "Device Driver",
            "Cache",
            "Database"
          ],
          "correctAnswer": "Device Driver"
        },
        {
          "questionText": "Which function protects system resources from unauthorized access?",
          "options": [
            "File Management",
            "Security and Protection",
            "Networking",
            "Scheduling"
          ],
          "correctAnswer": "Security and Protection"
        },
        {
          "questionText": "What allows multiple programs to run at the same time?",
          "options": [
            "Booting",
            "Scheduling",
            "Multitasking",
            "Compilation"
          ],
          "correctAnswer": "Multitasking"
        }
      ]
    }
  },
  {
    "title": "Types of Operating Systems",
    "description": "This module introduces the different types of Operating Systems used in computing environments. Learners will understand how various Operating Systems are designed to handle specific workloads, devices, and user requirements. The module covers Batch, Multiprogramming, Multitasking, Time-Sharing, Real-Time, Distributed, Network, Embedded, and Mobile Operating Systems.",
    "estimatedDuration": "80 Minutes",
    "difficulty": "Beginner",
    "learningObjectives": [
      "Understand different types of Operating Systems",
      "Learn Batch Operating Systems",
      "Understand Multiprogramming and Multitasking",
      "Learn Time-Sharing Systems",
      "Understand Real-Time Operating Systems",
      "Learn Distributed and Network Operating Systems",
      "Understand Embedded and Mobile Operating Systems",
      "Compare different OS types and their applications"
    ],
    "lessons": [
      {
        "title": "Introduction to Types of Operating Systems",
        "content": "Operating Systems are designed to meet different computing needs. Depending on the environment and workload, different types of Operating Systems provide specialized features and functionalities."
      },
      {
        "title": "Why Different Types of Operating Systems Exist",
        "content": "Different computing systems have unique requirements. A smartphone, server, ATM machine, and supercomputer all require Operating Systems optimized for their specific tasks and performance requirements."
      },
      {
        "title": "Batch Operating System",
        "content": "A Batch Operating System executes groups of jobs without user interaction. Tasks are collected into batches and processed sequentially. Early computer systems commonly used batch processing for payroll, billing, and data processing applications."
      },
      {
        "title": "Advantages and Disadvantages of Batch Systems",
        "content": "Batch systems improve resource utilization and automate repetitive tasks. However, they provide no immediate user interaction and may have longer processing times."
      },
      {
        "title": "Multiprogramming Operating System",
        "content": "Multiprogramming allows multiple programs to reside in memory simultaneously. While one program waits for input or output operations, the CPU executes another program, improving CPU utilization."
      },
      {
        "title": "Benefits of Multiprogramming",
        "content": "Multiprogramming increases CPU efficiency, improves resource utilization, and reduces idle time by allowing multiple jobs to share system resources."
      },
      {
        "title": "Multitasking Operating System",
        "content": "A Multitasking Operating System allows users to run multiple applications simultaneously. Modern operating systems such as Windows, Linux, and macOS support multitasking."
      },
      {
        "title": "Examples of Multitasking",
        "content": "Users can browse the internet, listen to music, edit documents, and run background applications simultaneously. The Operating System rapidly switches between tasks to create the illusion of parallel execution."
      },
      {
        "title": "Time-Sharing Operating System",
        "content": "Time-Sharing Operating Systems allocate CPU time slices to multiple users or processes. This allows multiple users to interact with the system simultaneously while receiving fair access to resources."
      },
      {
        "title": "Advantages of Time-Sharing Systems",
        "content": "Time-sharing improves responsiveness, supports multiple users, maximizes resource utilization, and provides interactive computing experiences."
      },
      {
        "title": "Real-Time Operating System (RTOS)",
        "content": "A Real-Time Operating System guarantees responses within strict time limits. RTOS systems are commonly used in environments where delays can cause failures or safety issues."
      },
      {
        "title": "Hard Real-Time vs Soft Real-Time Systems",
        "content": "Hard Real-Time systems require absolute deadline adherence, such as aircraft control systems. Soft Real-Time systems aim to meet deadlines but can tolerate occasional delays, such as multimedia applications."
      },
      {
        "title": "Distributed Operating System",
        "content": "A Distributed Operating System manages multiple computers and presents them as a single unified system. Resources and workloads are shared across multiple machines."
      },
      {
        "title": "Benefits of Distributed Systems",
        "content": "Distributed systems improve scalability, fault tolerance, resource sharing, and performance while enabling large-scale computing environments."
      },
      {
        "title": "Network Operating System",
        "content": "A Network Operating System provides services that enable communication, file sharing, printer sharing, and resource management across connected devices in a network."
      },
      {
        "title": "Examples of Network Operating Systems",
        "content": "Examples include Windows Server, Linux Server distributions, and UNIX-based systems used in enterprise networks and data centers."
      },
      {
        "title": "Embedded Operating System",
        "content": "Embedded Operating Systems are designed for dedicated devices with limited resources. They are commonly found in smart TVs, washing machines, automobiles, routers, and industrial equipment."
      },
      {
        "title": "Mobile Operating System",
        "content": "Mobile Operating Systems are optimized for smartphones and tablets. They provide touch interfaces, wireless communication support, battery management, and mobile application environments."
      },
      {
        "title": "Examples of Mobile Operating Systems",
        "content": "Android and iOS are the most widely used mobile operating systems. They support mobile applications, multimedia services, cloud integration, and communication features."
      },
      {
        "title": "Comparison of Operating System Types",
        "content": "Batch systems focus on automated processing, multiprogramming improves CPU utilization, multitasking supports multiple applications, RTOS provides guaranteed response times, distributed systems support scalability, and mobile systems optimize user mobility."
      },
      {
        "title": "Real-World Applications of Different OS Types",
        "content": "Banks use batch systems for transaction processing, smartphones use mobile operating systems, aircraft use real-time operating systems, cloud platforms use distributed systems, and businesses rely on network operating systems."
      },
      {
        "title": "Operating System Types in Technical Interviews",
        "content": "Interviewers often ask candidates to compare Batch, Multitasking, Time-Sharing, Real-Time, Distributed, and Network Operating Systems. Understanding their characteristics and use cases is important for technical interviews."
      }
    ],
    "quiz": {
      "title": "Types of Operating Systems Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which Operating System processes jobs in groups without user interaction?",
          "options": [
            "Real-Time OS",
            "Batch OS",
            "Mobile OS",
            "Network OS"
          ],
          "correctAnswer": "Batch OS"
        },
        {
          "questionText": "Which Operating System guarantees responses within strict deadlines?",
          "options": [
            "Batch OS",
            "Distributed OS",
            "Real-Time OS",
            "Network OS"
          ],
          "correctAnswer": "Real-Time OS"
        },
        {
          "questionText": "Which Operating System is commonly used on smartphones?",
          "options": [
            "Batch OS",
            "Android",
            "Distributed OS",
            "Network OS"
          ],
          "correctAnswer": "Android"
        },
        {
          "questionText": "What is the main goal of Multiprogramming?",
          "options": [
            "Increase CPU utilization",
            "Reduce memory",
            "Manage networks",
            "Improve graphics"
          ],
          "correctAnswer": "Increase CPU utilization"
        },
        {
          "questionText": "Which Operating System manages multiple computers as a single system?",
          "options": [
            "Distributed OS",
            "Mobile OS",
            "Batch OS",
            "Embedded OS"
          ],
          "correctAnswer": "Distributed OS"
        }
      ]
    }
  },
  {
    "title": "Process Management",
    "description": "This module introduces Process Management, one of the most important responsibilities of an Operating System. Learners will understand processes, process lifecycle, Process Control Blocks (PCB), process scheduling, context switching, threads, multithreading, process creation, process termination, and Inter-Process Communication (IPC). These concepts are fundamental to modern operating systems and frequently appear in technical interviews.",
    "estimatedDuration": "90 Minutes",
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand processes and programs",
      "Learn the process lifecycle",
      "Understand Process Control Blocks",
      "Learn process scheduling",
      "Understand context switching",
      "Learn threads and multithreading",
      "Understand process creation and termination",
      "Learn Inter-Process Communication"
    ],
    "lessons": [
      {
        "title": "Introduction to Process Management",
        "content": "Process Management is the function of an Operating System that handles the creation, scheduling, execution, and termination of processes. It ensures efficient CPU utilization and smooth execution of multiple applications."
      },
      {
        "title": "What is a Program?",
        "content": "A program is a passive set of instructions stored on a storage device. It contains code and data but does not perform any action until executed."
      },
      {
        "title": "What is a Process?",
        "content": "A process is an active instance of a program that is currently being executed. It includes program code, data, CPU registers, memory allocation, and execution state."
      },
      {
        "title": "Program vs Process",
        "content": "A program is a static entity stored on disk, whereas a process is a dynamic entity executing in memory. Multiple processes can be created from the same program."
      },
      {
        "title": "Components of a Process",
        "content": "A process consists of program code, stack, heap, data section, process state, program counter, CPU registers, and allocated resources."
      },
      {
        "title": "Process Lifecycle",
        "content": "A process moves through various states during execution. These states help the Operating System manage CPU allocation and resource utilization efficiently."
      },
      {
        "title": "Process States Overview",
        "content": "The primary process states are New, Ready, Running, Waiting (Blocked), and Terminated. A process transitions between these states during execution."
      },
      {
        "title": "New State",
        "content": "In the New state, a process is being created. The Operating System allocates resources and prepares the process for execution."
      },
      {
        "title": "Ready State",
        "content": "A process in the Ready state has all necessary resources except the CPU. It waits in the ready queue until the scheduler selects it for execution."
      },
      {
        "title": "Running State",
        "content": "A process enters the Running state when the CPU executes its instructions. Only one process can be in the Running state on a single-core processor at a time."
      },
      {
        "title": "Waiting (Blocked) State",
        "content": "A process enters the Waiting state when it requires an external event such as file access, user input, or network communication before continuing execution."
      },
      {
        "title": "Terminated State",
        "content": "A process enters the Terminated state after completing execution or being forcibly stopped by the Operating System."
      },
      {
        "title": "Process Control Block (PCB)",
        "content": "A PCB is a data structure maintained by the Operating System for each process. It stores information required for process management and scheduling."
      },
      {
        "title": "Information Stored in PCB",
        "content": "The PCB contains Process ID, Process State, Program Counter, CPU Registers, Scheduling Information, Memory Information, and I/O Status Information."
      },
      {
        "title": "Process Scheduling",
        "content": "Process Scheduling determines which process receives CPU time. The scheduler ensures efficient resource utilization and fair execution among processes."
      },
      {
        "title": "CPU Scheduler",
        "content": "The CPU Scheduler selects a process from the ready queue and allocates CPU resources for execution."
      },
      {
        "title": "Context Switching",
        "content": "Context Switching is the process of saving the state of the currently running process and loading the state of another process. It enables multitasking in Operating Systems."
      },
      {
        "title": "Advantages of Context Switching",
        "content": "Context switching improves CPU utilization, supports multitasking, and allows multiple applications to run seemingly simultaneously."
      },
      {
        "title": "What is a Thread?",
        "content": "A thread is the smallest unit of execution within a process. Multiple threads within a process share memory and resources while executing independently."
      },
      {
        "title": "Multithreading",
        "content": "Multithreading allows multiple threads to execute concurrently within the same process. This improves performance and responsiveness in modern applications."
      },
      {
        "title": "Process Creation",
        "content": "Processes can create child processes during execution. Operating Systems provide system calls to create new processes and manage their execution."
      },
      {
        "title": "Process Termination",
        "content": "A process terminates when it completes execution, encounters an unrecoverable error, or is explicitly terminated by the Operating System or user."
      },
      {
        "title": "Inter-Process Communication (IPC)",
        "content": "IPC allows processes to exchange information and coordinate activities. Since processes have separate memory spaces, special communication mechanisms are required."
      },
      {
        "title": "Methods of IPC",
        "content": "Common IPC methods include Pipes, Message Queues, Shared Memory, Sockets, Signals, and Semaphores."
      },
      {
        "title": "Real-World Example of Process Management",
        "content": "When a user opens a web browser, multiple processes and threads are created to handle rendering, networking, extensions, and user interactions simultaneously."
      },
      {
        "title": "Process Management in Technical Interviews",
        "content": "Interviewers frequently ask about Process vs Program, Process Lifecycle, PCB, Context Switching, Threads, Multithreading, Scheduling, and IPC concepts. These are core Operating System topics for placements and software engineering roles."
      }
    ],
    "quiz": {
      "title": "Process Management Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is a process?",
          "options": [
            "A file stored on disk",
            "An active instance of a program",
            "A programming language",
            "A database"
          ],
          "correctAnswer": "An active instance of a program"
        },
        {
          "questionText": "Which data structure stores information about a process?",
          "options": [
            "Cache",
            "PCB",
            "Stack",
            "Heap"
          ],
          "correctAnswer": "PCB"
        },
        {
          "questionText": "What is Context Switching?",
          "options": [
            "Deleting a process",
            "Saving and loading process states",
            "Creating a file",
            "Allocating memory"
          ],
          "correctAnswer": "Saving and loading process states"
        },
        {
          "questionText": "What is a thread?",
          "options": [
            "A type of memory",
            "A scheduling algorithm",
            "The smallest unit of execution",
            "A process queue"
          ],
          "correctAnswer": "The smallest unit of execution"
        },
        {
          "questionText": "Which of the following is an IPC mechanism?",
          "options": [
            "Pipes",
            "Message Queues",
            "Shared Memory",
            "All of the Above"
          ],
          "correctAnswer": "All of the Above"
        }
      ]
    }
  },
  {
    "title": "Process States",
    "description": "This module introduces Process States, a fundamental concept in Operating Systems. Learners will understand how processes move through different execution states, how the Operating System manages state transitions, scheduler queues, and context switching. Understanding process states is essential for process scheduling, CPU management, and operating system design.",
    "estimatedDuration": "80 Minutes",
    "difficulty": "Intermediate",
    "learningObjectives": [
      "Understand process states",
      "Learn the process state transition model",
      "Understand New, Ready, Running, Waiting, and Terminated states",
      "Learn scheduler queues",
      "Understand state transitions",
      "Learn context switching between states",
      "Understand process scheduling behavior",
      "Apply process state concepts in real-world systems"
    ],
    "lessons": [
      {
        "title": "Introduction to Process States",
        "content": "A process does not remain in a single state throughout its execution. As it interacts with the CPU, memory, and I/O devices, it moves through various states managed by the Operating System."
      },
      {
        "title": "Why Process States are Important",
        "content": "Process states help the Operating System efficiently allocate CPU resources, manage multitasking, and track process execution. They form the basis of process scheduling and CPU management."
      },
      {
        "title": "The Five-State Process Model",
        "content": "Most Operating Systems use five primary process states: New, Ready, Running, Waiting (Blocked), and Terminated. Processes transition between these states during execution."
      },
      {
        "title": "New State",
        "content": "A process enters the New state when it is first created. The Operating System allocates resources, creates the Process Control Block (PCB), and prepares the process for execution."
      },
      {
        "title": "Characteristics of the New State",
        "content": "In this state, the process exists but is not yet ready to execute. System resources and scheduling information are initialized before the process moves to the Ready state."
      },
      {
        "title": "Ready State",
        "content": "A process enters the Ready state after initialization. It has all necessary resources except CPU access and waits in the Ready Queue until selected by the CPU Scheduler."
      },
      {
        "title": "Ready Queue",
        "content": "The Ready Queue contains processes waiting for CPU allocation. The scheduler selects processes from this queue based on the scheduling algorithm being used."
      },
      {
        "title": "Running State",
        "content": "A process enters the Running state when the CPU executes its instructions. Only one process can be in the Running state at a time on a single-core processor."
      },
      {
        "title": "Activities in the Running State",
        "content": "During execution, the process performs computations, accesses memory, interacts with devices, and may request I/O operations or additional resources."
      },
      {
        "title": "Waiting (Blocked) State",
        "content": "A process enters the Waiting state when it cannot continue execution until a specific event occurs, such as file access completion, user input, or network response."
      },
      {
        "title": "Examples of Waiting State",
        "content": "A process waiting for disk access, keyboard input, database response, or network communication enters the Waiting state until the required operation completes."
      },
      {
        "title": "Waiting Queue",
        "content": "Processes in the Waiting state are placed in Waiting Queues. Once the required event occurs, the process returns to the Ready state."
      },
      {
        "title": "Terminated State",
        "content": "A process enters the Terminated state after completing execution or being forcibly stopped. The Operating System releases all resources allocated to the process."
      },
      {
        "title": "Reasons for Process Termination",
        "content": "Processes may terminate normally after completing their tasks, encounter fatal errors, exceed resource limits, or be manually terminated by users or the Operating System."
      },
      {
        "title": "Process State Transition Diagram",
        "content": "Processes continuously move between states based on CPU scheduling decisions, I/O requests, interrupts, and completion of tasks. The state transition diagram visually represents these movements."
      },
      {
        "title": "State Transitions",
        "content": "A process transitions from New to Ready, Ready to Running, Running to Waiting, Waiting to Ready, and Running to Terminated depending on system events and scheduling decisions."
      },
      {
        "title": "Role of CPU Scheduler",
        "content": "The CPU Scheduler selects processes from the Ready Queue and moves them into the Running state. Efficient scheduling improves system performance and responsiveness."
      },
      {
        "title": "Context Switching Between States",
        "content": "When the CPU switches from one process to another, the Operating System saves the current process state and restores the next process state. This operation is known as Context Switching."
      },
      {
        "title": "Process State Management in Multitasking Systems",
        "content": "Modern Operating Systems manage thousands of process state transitions every second, allowing multiple applications to run simultaneously while sharing CPU resources efficiently."
      },
      {
        "title": "Extended Process States",
        "content": "Some Operating Systems include additional states such as Suspended Ready and Suspended Blocked to support advanced memory management and process control mechanisms."
      },
      {
        "title": "Real-World Example of Process States",
        "content": "When opening a web browser, the process is created (New), waits for CPU access (Ready), executes code (Running), waits for network responses (Waiting), and eventually closes (Terminated)."
      },
      {
        "title": "Process States in Technical Interviews",
        "content": "Interviewers frequently ask about process states, state transitions, Ready Queues, Waiting Queues, Context Switching, and scheduling behavior. Understanding these concepts is essential for Operating System interviews."
      }
    ],
    "quiz": {
      "title": "Process States Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which state represents a newly created process?",
          "options": [
            "Ready",
            "Running",
            "New",
            "Waiting"
          ],
          "correctAnswer": "New"
        },
        {
          "questionText": "In which state does a process wait for CPU allocation?",
          "options": [
            "Ready",
            "Running",
            "Terminated",
            "Blocked"
          ],
          "correctAnswer": "Ready"
        },
        {
          "questionText": "Which state occurs when a process is waiting for an I/O operation?",
          "options": [
            "Running",
            "Ready",
            "Waiting",
            "New"
          ],
          "correctAnswer": "Waiting"
        },
        {
          "questionText": "What is Context Switching?",
          "options": [
            "Deleting a process",
            "Moving files",
            "Saving and restoring process states",
            "Creating a thread"
          ],
          "correctAnswer": "Saving and restoring process states"
        },
        {
          "questionText": "Which queue contains processes waiting for CPU execution?",
          "options": [
            "Waiting Queue",
            "Ready Queue",
            "I/O Queue",
            "Termination Queue"
          ],
          "correctAnswer": "Ready Queue"
        }
      ]
    }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codementorai');
    console.log('Connected to MongoDB.');

    let subject = await OSSubject.findOne({ title: 'Operating System Interview Preparation' });
    if (!subject) {
      subject = new OSSubject({
        title: 'Operating System Interview Preparation',
        description: 'Prepare for technical interviews by mastering Operating System concepts from beginner to advanced level.',
        difficulty: 'Intermediate'
      });
      await subject.save();
      console.log('Created OSSubject.');
    } else {
      console.log('OSSubject already exists.');
    }

    // Now seed the modules
    for (let i = 0; i < modules.length; i++) {
      const mod = modules[i];
      let topic = await OSTopic.findOne({ title: mod.title, subjectId: subject._id });
      if (!topic) {
        topic = new OSTopic({
          subjectId: subject._id,
          title: mod.title,
          description: mod.description,
          order: i + 1,
          estimatedDuration: mod.estimatedDuration,
          difficulty: mod.difficulty
        });
        await topic.save();
        console.log(`Created OSTopic: ${mod.title}`);
      } else {
        console.log(`OSTopic already exists: ${mod.title}`);
      }

      // Notes
      let notes = await OSNotes.findOne({ topicId: topic._id });
      if (!notes) {
        let contentStr = '';
        if (mod.learningObjectives && mod.learningObjectives.length > 0) {
          contentStr += "### Learning Objectives\\n\\n";
          mod.learningObjectives.forEach(obj => {
            contentStr += `- ${obj}\\n`;
          });
          contentStr += "\\n";
        }
        
        const sections = mod.lessons.map(lesson => ({
          title: lesson.title,
          content: lesson.content
        }));

        notes = new OSNotes({
          topicId: topic._id,
          content: contentStr || "Notes for " + mod.title,
          sections: sections
        });
        await notes.save();
        console.log(`Created OSNotes for: ${mod.title}`);
      }

      // Quiz
      let quiz = await OSQuiz.findOne({ topicId: topic._id });
      if (!quiz) {
        const questions = mod.quiz.questions.map(q => {
          let cIndex = q.options.indexOf(q.correctAnswer);
          if (cIndex === -1) cIndex = 0; // fallback
          return {
            questionText: q.questionText,
            options: q.options,
            correctAnswerIndex: cIndex,
            explanation: `The correct answer is ${q.correctAnswer}.`
          };
        });

        quiz = new OSQuiz({
          topicId: topic._id,
          title: mod.quiz.title,
          passingScore: mod.quiz.passingScore,
          questions: questions
        });
        await quiz.save();
        console.log(`Created OSQuiz for: ${mod.title}`);
      }
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
