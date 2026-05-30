require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const NetworkSubject = require('../models/NetworkSubject');
const NetworkTopic = require('../models/NetworkTopic');
const NetworkNotes = require('../models/NetworkNotes');
const NetworkQuestion = require('../models/NetworkQuestion');
const NetworkQuiz = require('../models/NetworkQuiz');

const networkData = [
  {
    title: "Introduction to Computer Networks",
    description: "This module introduces the fundamentals of Computer Networks. Learners will understand what computer networks are, why they are important, how devices communicate, the benefits of networking, and the role of computer networks in modern technology. This module provides the foundation required for all upcoming networking concepts.",
    estimatedDuration: "60 Minutes",
    difficulty: "Beginner",
    learningObjectives: [
      "Understand what a computer network is",
      "Learn why networks are important",
      "Identify network components",
      "Understand network communication",
      "Learn advantages of networking",
      "Understand real-world network applications",
      "Recognize networking terminology",
      "Build a strong foundation for advanced networking concepts"
    ],
    lessons: [
      {
        title: "Introduction to Computer Networks",
        content: "A computer network is a collection of interconnected devices that communicate and share resources. These devices may include computers, smartphones, servers, printers, routers, and switches. Networks enable users to exchange information efficiently and access shared resources."
      },
      {
        title: "Why Computer Networks are Important",
        content: "Modern communication relies heavily on computer networks. They allow users to send emails, browse websites, stream videos, access cloud services, and collaborate remotely. Without networks, modern digital communication would not be possible."
      },
      {
        title: "History of Computer Networks",
        content: "Computer networking began with ARPANET in the late 1960s. Over time, networking technologies evolved into the Internet, connecting billions of devices worldwide. Today, networks support global communication, commerce, education, and entertainment."
      },
      {
        title: "Components of a Network",
        content: "A computer network consists of hardware and software components. Hardware includes computers, servers, routers, switches, cables, and wireless access points. Software includes network protocols and operating systems that manage communication."
      },
      {
        title: "Network Communication",
        content: "Network communication occurs when devices exchange data using predefined rules called protocols. Data travels through network media such as cables or wireless signals and reaches the destination device for processing."
      },
      {
        title: "Network Resources",
        content: "Networks allow users to share resources such as printers, storage devices, internet connections, files, databases, and applications. Resource sharing improves efficiency and reduces operational costs."
      },
      {
        title: "Advantages of Computer Networks",
        content: "Computer networks provide resource sharing, faster communication, centralized management, remote access, scalability, improved collaboration, and cost savings. These benefits make networking essential in homes, businesses, and educational institutions."
      },
      {
        title: "Disadvantages of Computer Networks",
        content: "Despite their advantages, networks can face security threats, hardware failures, software issues, and maintenance costs. Proper network management and security measures help minimize these risks."
      },
      {
        title: "Types of Network Communication",
        content: "Communication can occur between two devices, multiple devices, or across global networks. Communication may be wired or wireless depending on the technology being used."
      },
      {
        title: "Network Protocols",
        content: "Protocols are sets of rules that govern communication between devices. Examples include HTTP, HTTPS, FTP, DNS, TCP, and IP. Protocols ensure reliable and organized data transmission."
      },
      {
        title: "Client-Server Model",
        content: "In the client-server model, clients request services and servers provide them. Most websites, applications, and online services use this architecture to handle user requests efficiently."
      },
      {
        title: "Peer-to-Peer Networks",
        content: "In a peer-to-peer network, devices communicate directly without a dedicated server. Each device can act as both a client and a server. Peer-to-peer networks are commonly used for small-scale resource sharing."
      },
      {
        title: "Role of Networks in Modern Technology",
        content: "Networks power social media platforms, cloud computing services, online banking systems, e-commerce websites, streaming platforms, and enterprise applications. They form the backbone of the modern digital world."
      },
      {
        title: "Careers in Networking",
        content: "Networking knowledge is valuable for careers such as Network Engineer, System Administrator, Cybersecurity Analyst, Cloud Engineer, DevOps Engineer, and IT Support Specialist."
      },
      {
        title: "Real-World Applications of Computer Networks",
        content: "Computer networks are used in schools, hospitals, banks, airports, government organizations, businesses, data centers, and cloud platforms. Nearly every modern industry depends on networking technologies."
      }
    ],
    quiz: {
      title: "Introduction to Computer Networks Quiz",
      passingScore: 70,
      questions: [
        {
          questionText: "What is a computer network?",
          options: ["A programming language", "A collection of interconnected devices", "An operating system", "A database"],
          correctAnswerIndex: 1
        },
        {
          questionText: "Which of the following is a network device?",
          options: ["Router", "Switch", "Server", "All of the Above"],
          correctAnswerIndex: 3
        },
        {
          questionText: "What is the main purpose of a computer network?",
          options: ["Playing games only", "Resource sharing and communication", "Creating databases", "Installing software"],
          correctAnswerIndex: 1
        },
        {
          questionText: "Which network model uses dedicated servers?",
          options: ["Peer-to-Peer", "Client-Server", "Bus", "Ring"],
          correctAnswerIndex: 1
        },
        {
          questionText: "Which of the following is a networking career?",
          options: ["Network Engineer", "Cybersecurity Analyst", "Cloud Engineer", "All of the Above"],
          correctAnswerIndex: 3
        }
      ]
    },
    questions: [
      { question: "What is a Computer Network?", answer: "A computer network is a group of interconnected computers and devices that share resources and data.", difficulty: "Easy", companyTags: ["TCS", "Infosys"] },
      { question: "What is the difference between client-server and peer-to-peer network?", answer: "In a client-server network, clients request services from a centralized server. In a peer-to-peer network, all devices act as both clients and servers without a central server.", difficulty: "Medium", companyTags: ["Wipro"] }
    ]
  },
  {
    title: "Network Types and Topologies",
    description: "This module introduces different types of computer networks and network topologies. Learners will understand how networks are classified based on size and coverage area, how devices are connected within a network, and the advantages and disadvantages of various network structures. These concepts are essential for designing, managing, and troubleshooting computer networks.",
    estimatedDuration: "75 Minutes",
    difficulty: "Beginner",
    learningObjectives: [
      "Understand different network types",
      "Learn LAN, MAN, WAN, PAN, and CAN",
      "Understand network topology",
      "Learn Bus, Star, Ring, Mesh, Tree, and Hybrid topologies",
      "Compare topology advantages and disadvantages",
      "Identify real-world network implementations",
      "Understand topology selection factors",
      "Build a strong foundation for advanced networking concepts"
    ],
    lessons: [
      {
        title: "Introduction to Network Types",
        content: "Computer networks are classified based on geographical coverage and the number of connected devices. Different types of networks are designed to meet different communication and resource-sharing requirements."
      },
      {
        title: "Personal Area Network (PAN)",
        content: "A Personal Area Network (PAN) is the smallest type of network. It connects devices within a short range, typically around an individual person. Examples include Bluetooth connections between smartphones, smartwatches, wireless earbuds, and laptops."
      },
      {
        title: "Local Area Network (LAN)",
        content: "A Local Area Network (LAN) connects devices within a limited geographical area such as a home, office, school, or laboratory. LANs provide high-speed communication and resource sharing among connected devices."
      },
      {
        title: "Campus Area Network (CAN)",
        content: "A Campus Area Network (CAN) connects multiple LANs within a university, corporate campus, or industrial complex. It covers a larger area than a LAN but remains confined to a specific organization."
      },
      {
        title: "Metropolitan Area Network (MAN)",
        content: "A Metropolitan Area Network (MAN) covers a city or metropolitan region. It connects multiple LANs and CANs, enabling communication between organizations and institutions within the same city."
      },
      {
        title: "Wide Area Network (WAN)",
        content: "A Wide Area Network (WAN) spans large geographical areas such as countries or continents. The Internet is the largest WAN in the world, connecting billions of devices globally."
      },
      {
        title: "Comparison of Network Types",
        content: "PAN covers a few meters, LAN covers buildings, CAN covers campuses, MAN covers cities, and WAN covers countries and continents. As coverage increases, complexity and management requirements also increase."
      },
      {
        title: "Introduction to Network Topology",
        content: "Network topology refers to the physical or logical arrangement of devices and communication links within a network. Topology determines how devices communicate and how data flows across the network."
      },
      {
        title: "Bus Topology",
        content: "In a Bus Topology, all devices are connected to a single communication cable called the backbone. Data travels through the backbone and is received by all connected devices. Bus topology is simple and inexpensive but suffers from performance issues as the network grows."
      },
      {
        title: "Star Topology",
        content: "In a Star Topology, all devices connect to a central device such as a switch or hub. It is the most commonly used topology because it provides easy management, high reliability, and simplified troubleshooting."
      },
      {
        title: "Ring Topology",
        content: "In a Ring Topology, each device connects to exactly two other devices, forming a circular structure. Data travels around the ring until it reaches the destination device."
      },
      {
        title: "Mesh Topology",
        content: "In a Mesh Topology, every device is connected to multiple devices. This provides excellent reliability and fault tolerance because multiple communication paths are available."
      },
      {
        title: "Tree Topology",
        content: "Tree Topology combines characteristics of Bus and Star topologies. Devices are arranged hierarchically, making it suitable for large organizations and enterprise networks."
      },
      {
        title: "Hybrid Topology",
        content: "Hybrid Topology combines two or more different topologies into a single network. Modern enterprise networks commonly use hybrid topologies to achieve scalability and flexibility."
      },
      {
        title: "Advantages and Disadvantages of Topologies",
        content: "Each topology offers unique advantages and disadvantages. Star topology provides easy management, Mesh offers high reliability, Bus is cost-effective, Ring provides predictable communication, and Hybrid supports scalability."
      },
      {
        title: "Factors Affecting Topology Selection",
        content: "Network size, budget, performance requirements, scalability, fault tolerance, and maintenance costs influence the choice of network topology."
      },
      {
        title: "Real-World Applications of Network Topologies",
        content: "Star topology is commonly used in offices and schools, Mesh topology is used in military and critical communication systems, Tree topology is used in enterprise networks, and Hybrid topology is used in modern data centers and cloud infrastructures."
      }
    ],
    quiz: {
      title: "Network Types and Topologies Quiz",
      passingScore: 70,
      questions: [
        {
          questionText: "Which network type covers a small area such as a home or office?",
          options: ["WAN", "MAN", "LAN", "PAN"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which is the largest network in the world?",
          options: ["LAN", "MAN", "Internet", "PAN"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which topology uses a central switch or hub?",
          options: ["Bus", "Ring", "Star", "Mesh"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which topology provides the highest fault tolerance?",
          options: ["Bus", "Star", "Mesh", "Ring"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which topology combines multiple topologies?",
          options: ["Bus", "Hybrid", "Ring", "Star"],
          correctAnswerIndex: 1
        }
      ]
    },
    questions: [
      { question: "What is the difference between LAN and WAN?", answer: "LAN is restricted to a small geographic area (like a building), while WAN covers large geographic areas (like countries). LAN is faster and more secure, whereas WAN is slower and less secure.", difficulty: "Medium", companyTags: ["Accenture", "TCS"] },
      { question: "Which network topology is highly reliable and why?", answer: "Mesh topology is highly reliable because every node is connected to every other node. If one link fails, the communication can still happen through alternative paths.", difficulty: "Advanced", companyTags: ["Cognizant"] }
    ]
  },
  {
    title: "OSI Model",
    description: "This module introduces the Open Systems Interconnection (OSI) Model, a conceptual framework used to understand how data travels across a network. Learners will understand all seven layers of the OSI model, their functions, protocols, devices, encapsulation process, and real-world applications. The OSI Model is one of the most important concepts in Computer Networks and is frequently asked in technical interviews.",
    estimatedDuration: "90 Minutes",
    difficulty: "Beginner to Intermediate",
    learningObjectives: [
      "Understand the purpose of the OSI Model",
      "Learn all seven layers of the OSI Model",
      "Understand data encapsulation and decapsulation",
      "Identify protocols used at each layer",
      "Learn devices associated with each layer",
      "Understand data flow in a network",
      "Compare layers and their responsibilities",
      "Prepare for networking interviews"
    ],
    lessons: [
      {
        title: "Introduction to the OSI Model",
        content: "The Open Systems Interconnection (OSI) Model is a conceptual framework developed by ISO to standardize communication between different networking systems. It divides network communication into seven layers, where each layer performs a specific function and communicates with the layers above and below it."
      },
      {
        title: "Why the OSI Model is Important",
        content: "The OSI Model helps network engineers understand how data moves through a network. It simplifies troubleshooting, standardizes communication, improves interoperability between devices, and provides a structured approach to network design."
      },
      {
        title: "Overview of the Seven Layers",
        content: "The seven layers of the OSI Model are Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer performs a specific task and passes information to the next layer during transmission."
      },
      {
        title: "Layer 1 - Physical Layer",
        content: "The Physical Layer is responsible for transmitting raw bits over a communication medium. It defines cables, connectors, electrical signals, radio frequencies, and transmission methods. Devices such as hubs, repeaters, cables, and network interface hardware operate at this layer."
      },
      {
        title: "Functions of the Physical Layer",
        content: "This layer handles bit transmission, signal encoding, data rates, transmission media selection, and physical network topology. Its primary responsibility is moving binary data from one device to another."
      },
      {
        title: "Layer 2 - Data Link Layer",
        content: "The Data Link Layer provides node-to-node communication and ensures error-free data transfer between directly connected devices. It converts raw bits into frames and uses MAC addresses for device identification."
      },
      {
        title: "Functions of the Data Link Layer",
        content: "The Data Link Layer performs framing, error detection, flow control, media access control, and physical addressing. Switches and network bridges primarily operate at this layer."
      },
      {
        title: "Layer 3 - Network Layer",
        content: "The Network Layer is responsible for logical addressing and routing. It determines the best path for data to travel across networks. IP addresses are used at this layer to identify source and destination devices."
      },
      {
        title: "Functions of the Network Layer",
        content: "This layer handles routing, packet forwarding, logical addressing, path determination, and network congestion management. Routers primarily operate at the Network Layer."
      },
      {
        title: "Layer 4 - Transport Layer",
        content: "The Transport Layer ensures reliable end-to-end communication between devices. It divides data into segments and provides mechanisms for error recovery, flow control, and reliable delivery."
      },
      {
        title: "Functions of the Transport Layer",
        content: "This layer performs segmentation, reassembly, error detection, flow control, and connection management. TCP and UDP are the most common protocols operating at this layer."
      },
      {
        title: "Layer 5 - Session Layer",
        content: "The Session Layer establishes, manages, and terminates communication sessions between applications. It ensures that communication remains synchronized throughout the data exchange process."
      },
      {
        title: "Functions of the Session Layer",
        content: "This layer is responsible for session establishment, synchronization, dialog control, session recovery, and connection management between applications."
      },
      {
        title: "Layer 6 - Presentation Layer",
        content: "The Presentation Layer acts as a translator between applications and the network. It ensures that data sent by one system can be correctly interpreted by another system."
      },
      {
        title: "Functions of the Presentation Layer",
        content: "The Presentation Layer performs data translation, encryption, decryption, compression, decompression, and character encoding conversion."
      },
      {
        title: "Layer 7 - Application Layer",
        content: "The Application Layer is the closest layer to the end user. It provides network services directly to applications such as web browsers, email clients, and file transfer software."
      },
      {
        title: "Functions of the Application Layer",
        content: "This layer provides services such as email communication, web browsing, file transfers, remote access, and network resource sharing. Protocols such as HTTP, HTTPS, FTP, SMTP, and DNS operate at this layer."
      },
      {
        title: "Data Encapsulation Process",
        content: "During transmission, data moves from the Application Layer down to the Physical Layer. Each layer adds its own header information. This process is called encapsulation. Encapsulation helps devices identify how data should be processed."
      },
      {
        title: "Data Decapsulation Process",
        content: "When data reaches the destination device, it moves upward through the OSI layers. Each layer removes its corresponding header information. This process is known as decapsulation."
      },
      {
        title: "Protocols Used in Different Layers",
        content: "Common protocols include HTTP, HTTPS, FTP, SMTP, and DNS at the Application Layer; TCP and UDP at the Transport Layer; IP and ICMP at the Network Layer; and Ethernet protocols at the Data Link Layer."
      },
      {
        title: "Network Devices and OSI Layers",
        content: "Different devices operate at different layers. Hubs work at Layer 1, switches at Layer 2, routers at Layer 3, and firewalls may operate across multiple layers depending on their functionality."
      },
      {
        title: "Real-World Example of Data Transmission",
        content: "When a user opens a website, data travels through all seven OSI layers. The browser generates an HTTP request, transport protocols ensure delivery, routers determine paths, switches forward frames, and physical media carry electrical or wireless signals."
      },
      {
        title: "Advantages of the OSI Model",
        content: "The OSI Model simplifies troubleshooting, promotes standardization, improves interoperability, supports modular design, and helps network professionals understand communication processes."
      },
      {
        title: "OSI Model in Technical Interviews",
        content: "The OSI Model is one of the most frequently asked topics in networking interviews. Candidates are often asked to explain the layers, protocols, devices, encapsulation process, and real-world examples."
      }
    ],
    quiz: {
      title: "OSI Model Quiz",
      passingScore: 70,
      questions: [
        {
          questionText: "How many layers are present in the OSI Model?",
          options: ["5", "6", "7", "8"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which layer is responsible for routing?",
          options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which device primarily operates at the Data Link Layer?",
          options: ["Router", "Switch", "Hub", "Repeater"],
          correctAnswerIndex: 1
        },
        {
          questionText: "Which protocol operates at the Transport Layer?",
          options: ["HTTP", "IP", "TCP", "Ethernet"],
          correctAnswerIndex: 2
        },
        {
          questionText: "What is the process of adding headers while data moves down the OSI layers called?",
          options: ["Decapsulation", "Routing", "Encapsulation", "Forwarding"],
          correctAnswerIndex: 2
        }
      ]
    },
    questions: [
      { question: "What is the OSI Model?", answer: "The OSI (Open Systems Interconnection) Model is a conceptual framework that standardizes the functions of a communication system into seven distinct layers.", difficulty: "Easy", companyTags: ["Amazon", "TCS"] },
      { question: "At which layer of the OSI model does a Router operate?", answer: "A Router operates at the Network Layer (Layer 3).", difficulty: "Easy", companyTags: ["Infosys"] }
    ]
  },
  {
    title: "TCP/IP Model",
    description: "This module introduces the TCP/IP Model, the foundation of modern Internet communication. Learners will understand the four layers of the TCP/IP Model, protocols used at each layer, data encapsulation, communication flow, and the differences between the TCP/IP and OSI models. This module is one of the most important networking concepts for interviews and real-world networking environments.",
    estimatedDuration: "90 Minutes",
    difficulty: "Beginner to Intermediate",
    learningObjectives: [
      "Understand the TCP/IP Model",
      "Learn the four layers of TCP/IP",
      "Understand protocols used at each layer",
      "Learn data encapsulation and decapsulation",
      "Compare TCP/IP and OSI models",
      "Understand Internet communication",
      "Identify networking devices and protocols",
      "Prepare for networking interviews"
    ],
    lessons: [
      {
        title: "Introduction to TCP/IP Model",
        content: "The TCP/IP Model is a set of communication protocols used for connecting devices over the Internet and private networks. It was developed by the United States Department of Defense and forms the foundation of modern networking. Unlike the OSI Model, the TCP/IP Model is widely implemented in real-world networks."
      },
      {
        title: "Why TCP/IP is Important",
        content: "Every device connected to the Internet uses TCP/IP protocols for communication. Websites, emails, cloud services, mobile applications, and online gaming platforms all depend on TCP/IP for reliable data transmission."
      },
      {
        title: "Overview of TCP/IP Layers",
        content: "The TCP/IP Model consists of four layers: Application Layer, Transport Layer, Internet Layer, and Network Access Layer. Each layer performs specific functions and works together to enable communication between devices."
      },
      {
        title: "Application Layer",
        content: "The Application Layer provides services directly to end users and applications. It combines the functions of the Application, Presentation, and Session layers of the OSI Model. This layer handles web browsing, email communication, file transfers, and remote access."
      },
      {
        title: "Protocols of the Application Layer",
        content: "Common Application Layer protocols include HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, Telnet, and SSH. These protocols enable communication between applications and network services."
      },
      {
        title: "Transport Layer",
        content: "The Transport Layer provides end-to-end communication between devices. It is responsible for segmentation, error detection, flow control, and reliable data delivery. The two main protocols at this layer are TCP and UDP."
      },
      {
        title: "Transmission Control Protocol (TCP)",
        content: "TCP is a connection-oriented protocol that ensures reliable communication. It guarantees data delivery, maintains packet order, performs error checking, and retransmits lost packets when necessary."
      },
      {
        title: "User Datagram Protocol (UDP)",
        content: "UDP is a connectionless protocol that prioritizes speed over reliability. It does not guarantee packet delivery or order. UDP is commonly used in video streaming, online gaming, VoIP, and live broadcasts."
      },
      {
        title: "Internet Layer",
        content: "The Internet Layer is responsible for logical addressing and routing. It determines the best path for data to travel across networks and ensures packets reach their destination."
      },
      {
        title: "Protocols of the Internet Layer",
        content: "Key protocols include IP (Internet Protocol), ICMP (Internet Control Message Protocol), ARP (Address Resolution Protocol), and IGMP (Internet Group Management Protocol). These protocols manage addressing, routing, and network diagnostics."
      },
      {
        title: "Network Access Layer",
        content: "The Network Access Layer is responsible for transmitting data over physical network media. It handles framing, MAC addressing, error detection, and communication with networking hardware."
      },
      {
        title: "Protocols and Technologies of Network Access Layer",
        content: "Technologies such as Ethernet, Wi-Fi, PPP, Fiber Optics, and MAC addressing operate at this layer. This layer combines the Physical and Data Link layers of the OSI Model."
      },
      {
        title: "Data Encapsulation in TCP/IP",
        content: "When data is transmitted, each TCP/IP layer adds its own header information. This process is called encapsulation. Encapsulation ensures that each layer can perform its specific function during communication."
      },
      {
        title: "Data Decapsulation in TCP/IP",
        content: "When data reaches the destination device, each layer removes its corresponding header information. This process is called decapsulation and allows the original data to be delivered to the application."
      },
      {
        title: "OSI Model vs TCP/IP Model",
        content: "The OSI Model contains seven layers, while the TCP/IP Model contains four layers. OSI is mainly used as a reference model for learning and troubleshooting, whereas TCP/IP is the practical model used on the Internet."
      },
      {
        title: "Mapping OSI Layers to TCP/IP Layers",
        content: "The Application, Presentation, and Session layers of OSI correspond to the Application Layer of TCP/IP. The Transport Layer remains the same. The Network Layer maps to the Internet Layer, while the Physical and Data Link layers map to the Network Access Layer."
      },
      {
        title: "Real-World Example of TCP/IP Communication",
        content: "When a user opens a website, the browser sends an HTTP request through the Application Layer. TCP ensures reliable delivery, IP handles routing, and Ethernet or Wi-Fi transmits the data physically. The server processes the request and sends a response back using the same TCP/IP process."
      },
      {
        title: "Advantages of TCP/IP Model",
        content: "TCP/IP provides scalability, interoperability, reliability, flexibility, and support for heterogeneous networks. It enables communication between different hardware and operating systems across the world."
      },
      {
        title: "Importance of TCP/IP in Modern Networking",
        content: "The Internet, cloud computing, enterprise networks, mobile communications, IoT devices, and data centers all rely on TCP/IP protocols. Understanding TCP/IP is essential for network engineers, cybersecurity professionals, and cloud architects."
      },
      {
        title: "TCP/IP Model in Technical Interviews",
        content: "Interviewers frequently ask about TCP/IP layers, protocol functions, TCP vs UDP differences, OSI vs TCP/IP comparisons, and real-world communication examples. A strong understanding of TCP/IP is crucial for networking and cybersecurity roles."
      }
    ],
    quiz: {
      title: "TCP/IP Model Quiz",
      passingScore: 70,
      questions: [
        {
          questionText: "How many layers are present in the TCP/IP Model?",
          options: ["4", "5", "6", "7"],
          correctAnswerIndex: 0
        },
        {
          questionText: "Which protocol provides reliable communication?",
          options: ["UDP", "IP", "TCP", "ARP"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which layer is responsible for routing?",
          options: ["Application Layer", "Transport Layer", "Internet Layer", "Network Access Layer"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which protocol is commonly used for web browsing?",
          options: ["FTP", "SMTP", "HTTP", "ARP"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which TCP/IP layer corresponds to the OSI Network Layer?",
          options: ["Application Layer", "Transport Layer", "Internet Layer", "Network Access Layer"],
          correctAnswerIndex: 2
        }
      ]
    },
    questions: [
      { question: "Explain the TCP Three-Way Handshake.", answer: "The TCP 3-way handshake is used to establish a reliable connection. 1) SYN: The client sends a SYN packet to the server. 2) SYN-ACK: The server replies with a SYN-ACK packet. 3) ACK: The client sends an ACK packet back. The connection is now established.", difficulty: "Advanced", companyTags: ["Google", "Amazon"] },
      { question: "Difference between TCP and UDP?", answer: "TCP is connection-oriented, reliable, orders packets, and has error checking (used for Web, Email). UDP is connectionless, unreliable, unordered, and faster (used for video streaming, DNS).", difficulty: "Medium", companyTags: ["Microsoft", "Capgemini"] }
    ]
  },
  {
    title: "IP Addressing and Subnetting",
    description: "This module introduces IP Addressing and Subnetting, one of the most important topics in Computer Networks. Learners will understand IPv4 and IPv6 addressing, public and private IP addresses, IP classes, subnet masks, CIDR notation, subnetting techniques, default gateways, NAT, and real-world networking scenarios. This module is essential for networking, cybersecurity, cloud computing, and technical interviews.",
    estimatedDuration: "120 Minutes",
    difficulty: "Intermediate",
    learningObjectives: [
      "Understand IP addressing concepts",
      "Learn IPv4 and IPv6",
      "Differentiate public and private IP addresses",
      "Understand IP address classes",
      "Learn subnet masks",
      "Understand CIDR notation",
      "Perform subnetting calculations",
      "Understand NAT and default gateways",
      "Apply IP addressing in real-world networks"
    ],
    lessons: [
      {
        title: "Introduction to IP Addressing",
        content: "Every device connected to a network requires a unique identifier called an IP address. IP addresses allow devices to locate and communicate with each other across local and global networks."
      },
      {
        title: "What is an IP Address?",
        content: "An Internet Protocol (IP) Address is a logical address assigned to a device on a network. It uniquely identifies the source and destination of data packets during communication."
      },
      {
        title: "Why IP Addresses are Important",
        content: "Without IP addresses, devices would not know where to send or receive data. IP addresses act similarly to postal addresses, ensuring that information reaches the correct destination."
      },
      {
        title: "IPv4 Addressing",
        content: "IPv4 is the most widely used version of the Internet Protocol. It uses a 32-bit addressing scheme and represents addresses in dotted decimal format, such as 192.168.1.1."
      },
      {
        title: "Structure of an IPv4 Address",
        content: "An IPv4 address consists of four octets separated by periods. Each octet contains 8 bits and ranges from 0 to 255. Together, the four octets form a 32-bit address."
      },
      {
        title: "IPv6 Addressing",
        content: "IPv6 was developed to solve IPv4 address exhaustion. It uses a 128-bit addressing scheme and supports an enormous number of unique addresses. IPv6 addresses are represented using hexadecimal notation."
      },
      {
        title: "IPv4 vs IPv6",
        content: "IPv4 uses 32 bits and provides approximately 4.3 billion addresses, while IPv6 uses 128 bits and provides virtually unlimited addresses. IPv6 also offers improved security, efficiency, and scalability."
      },
      {
        title: "Public IP Addresses",
        content: "Public IP addresses are globally unique addresses assigned by Internet Service Providers. Devices using public IPs can communicate directly over the Internet."
      },
      {
        title: "Private IP Addresses",
        content: "Private IP addresses are used within local networks and cannot be routed directly over the Internet. Common private ranges include 10.0.0.0/8, 172.16.0.0–172.31.255.255, and 192.168.0.0/16."
      },
      {
        title: "IP Address Classes",
        content: "IPv4 addresses are traditionally divided into Class A, Class B, Class C, Class D, and Class E. Each class supports different network sizes and addressing requirements."
      },
      {
        title: "Class A Addresses",
        content: "Class A addresses range from 1.0.0.0 to 126.255.255.255. They are designed for very large networks and provide a large number of host addresses."
      },
      {
        title: "Class B Addresses",
        content: "Class B addresses range from 128.0.0.0 to 191.255.255.255. They are commonly used by medium-sized organizations and enterprises."
      },
      {
        title: "Class C Addresses",
        content: "Class C addresses range from 192.0.0.0 to 223.255.255.255. They are typically used by small businesses and local area networks."
      },
      {
        title: "Class D and Class E Addresses",
        content: "Class D addresses are used for multicast communication, while Class E addresses are reserved for research and experimental purposes."
      },
      {
        title: "Network ID and Host ID",
        content: "Every IP address consists of two parts: the Network ID and the Host ID. The Network ID identifies the network, while the Host ID identifies a specific device within that network."
      },
      {
        title: "Subnet Masks",
        content: "A subnet mask is used to separate the network portion and host portion of an IP address. It helps devices determine whether a destination device is on the same network or a different network."
      },
      {
        title: "Default Subnet Masks",
        content: "Class A uses 255.0.0.0, Class B uses 255.255.0.0, and Class C uses 255.255.255.0 as default subnet masks."
      },
      {
        title: "Introduction to Subnetting",
        content: "Subnetting is the process of dividing a large network into smaller logical networks called subnets. It improves security, performance, and efficient IP address utilization."
      },
      {
        title: "Benefits of Subnetting",
        content: "Subnetting reduces network congestion, improves security, simplifies management, and optimizes IP address allocation."
      },
      {
        title: "CIDR Notation",
        content: "Classless Inter-Domain Routing (CIDR) uses slash notation such as /24, /16, and /8 to represent subnet masks. CIDR provides more flexible and efficient IP address allocation than traditional class-based addressing."
      },
      {
        title: "Subnetting Calculations",
        content: "Subnetting calculations involve determining network addresses, broadcast addresses, valid host ranges, and the number of available hosts. These calculations are among the most frequently tested networking interview topics."
      },
      {
        title: "Default Gateway",
        content: "A default gateway is the router used by devices to communicate with devices outside their local network. It serves as the exit point for external communication."
      },
      {
        title: "Network Address Translation (NAT)",
        content: "NAT allows multiple private IP addresses to share a single public IP address. It conserves IPv4 addresses and improves security by hiding internal network structures."
      },
      {
        title: "Real-World Example of IP Communication",
        content: "When a user opens a website, the device uses its private IP address, sends traffic through a router, NAT translates the address into a public IP, and packets are routed across the Internet to the destination server."
      },
      {
        title: "IP Addressing in Technical Interviews",
        content: "Interviewers frequently ask about IPv4, IPv6, subnet masks, CIDR notation, private IP ranges, NAT, default gateways, and subnetting calculations. Mastering these concepts is essential for networking and cybersecurity roles."
      }
    ],
    quiz: {
      title: "IP Addressing and Subnetting Quiz",
      passingScore: 70,
      questions: [
        {
          questionText: "How many bits are present in an IPv4 address?",
          options: ["16", "32", "64", "128"],
          correctAnswerIndex: 1
        },
        {
          questionText: "How many bits are present in an IPv6 address?",
          options: ["32", "64", "128", "256"],
          correctAnswerIndex: 2
        },
        {
          questionText: "Which private IP range belongs to Class C?",
          options: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "127.0.0.0/8"],
          correctAnswerIndex: 2
        },
        {
          questionText: "What does CIDR stand for?",
          options: ["Classless Inter-Domain Routing", "Central Internet Data Routing", "Computer Integrated Data Routing", "Class Internet Domain Routing"],
          correctAnswerIndex: 0
        },
        {
          questionText: "What is the purpose of NAT?",
          options: ["Increase bandwidth", "Translate private IPs to public IPs", "Encrypt network traffic", "Block websites"],
          correctAnswerIndex: 1
        }
      ]
    },
    questions: [
      { question: "What is Subnetting?", answer: "Subnetting is the practice of dividing a network into two or more smaller networks. It improves network security and performance by reducing broadcast traffic.", difficulty: "Medium", companyTags: ["Accenture", "Infosys"] },
      { question: "What is NAT?", answer: "Network Address Translation (NAT) maps multiple private IP addresses into a single public IP address before transferring the information over the Internet.", difficulty: "Advanced", companyTags: ["Wipro", "TCS"] }
    ]
  }
];

const runSeeder = async () => {
  await connectDB();
  try {
    console.log('Clearing old Computer Networks Interview Data...');
    await NetworkSubject.deleteMany({});
    await NetworkTopic.deleteMany({});
    await NetworkNotes.deleteMany({});
    await NetworkQuestion.deleteMany({});
    await NetworkQuiz.deleteMany({});

    console.log('Inserting Computer Networks Subject...');
    const subject = await NetworkSubject.create({
      title: "Computer Networks Interview Preparation",
      description: "Prepare for technical interviews by mastering Computer Networks concepts from beginner to advanced level.",
      difficulty: "Beginner to Advanced"
    });

    let order = 1;
    for (const mod of networkData) {
      console.log(`Processing Topic: ${mod.title}`);
      
      const topic = await NetworkTopic.create({
        subjectId: subject._id,
        title: mod.title,
        description: mod.description,
        estimatedDuration: mod.estimatedDuration,
        difficulty: mod.difficulty,
        learningObjectives: mod.learningObjectives,
        order: order++
      });

      // Insert Notes
      const formattedSections = mod.lessons.map(lesson => ({
        title: lesson.title,
        content: lesson.content
      }));

      const notes = await NetworkNotes.create({
        topicId: topic._id,
        content: `# ${mod.title}\n\n${mod.description}`, // Basic markdown wrapper
        sections: formattedSections
      });
      topic.notes = notes._id;

      // Insert Quiz
      if (mod.quiz) {
        const quiz = await NetworkQuiz.create({
          topicId: topic._id,
          title: mod.quiz.title,
          passingScore: mod.quiz.passingScore,
          questions: mod.quiz.questions
        });
        topic.quiz = quiz._id;
      }

      // Insert Questions
      if (mod.questions) {
        for (const q of mod.questions) {
          await NetworkQuestion.create({
            topicId: topic._id,
            question: q.question,
            answer: q.answer,
            difficulty: q.difficulty,
            companyTags: q.companyTags
          });
        }
      }

      await topic.save();
      subject.topics.push(topic._id);
    }
    await subject.save();

    console.log('Computer Networks Interview Data Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed CN data:', error);
    process.exit(1);
  }
};

runSeeder();
