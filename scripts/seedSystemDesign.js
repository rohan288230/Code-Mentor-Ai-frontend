require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');
const SystemDesignSubject = require('../models/SystemDesignSubject');
const SystemDesignTopic = require('../models/SystemDesignTopic');
const SystemDesignNotes = require('../models/SystemDesignNotes');
const SystemDesignQuestion = require('../models/SystemDesignQuestion');
const SystemDesignQuiz = require('../models/SystemDesignQuiz');

// Load Data
const modules = [
  // Module 1
  {
    "title": "Introduction to System Design",
    "description": "This module introduces the fundamentals of System Design. Learners will understand what system design is, why it is important, how modern software systems are built, and the key principles used to design scalable, reliable, and maintainable applications. This module serves as the foundation for all advanced system design concepts.",
    "estimatedDuration": "60 Minutes",
    "difficulty": "Beginner",
    "lessons": [
      {
        "title": "What is System Design?",
        "content": "System Design is the process of defining the architecture, components, modules, interfaces, and data flow of a software system. It helps developers create applications that are scalable, reliable, efficient, and easy to maintain."
      },
      {
        "title": "Why System Design is Important",
        "content": "Modern applications such as YouTube, Netflix, WhatsApp, Instagram, and Amazon serve millions of users daily. Without proper system design, these applications would experience performance issues, downtime, and scalability problems."
      },
      {
        "title": "Goals of System Design",
        "content": "The primary goals of system design include scalability, reliability, availability, maintainability, performance, fault tolerance, and security. These goals ensure that applications continue to perform efficiently as user demand grows."
      },
      {
        "title": "What is a Software System?",
        "content": "A software system is a collection of components that work together to solve a business problem or provide a service. Examples include social media platforms, e-commerce websites, banking applications, and cloud platforms."
      },
      {
        "title": "Components of Modern Applications",
        "content": "Most modern applications consist of clients, servers, databases, APIs, caches, storage systems, authentication services, monitoring tools, and networking infrastructure. Each component performs a specific role in delivering services to users."
      },
      {
        "title": "Client-Server Architecture",
        "content": "Client-server architecture is the foundation of most modern applications. Clients send requests to servers, and servers process those requests before returning responses. Web applications and mobile applications commonly use this architecture."
      },
      {
        "title": "Frontend and Backend Systems",
        "content": "Frontend systems handle user interfaces and user interactions, while backend systems manage business logic, databases, authentication, APIs, and data processing."
      },
      {
        "title": "Monolithic Architecture",
        "content": "In a monolithic architecture, all application components are combined into a single codebase and deployed together. Monolithic applications are simple to develop initially but can become difficult to scale and maintain as they grow."
      },
      {
        "title": "Microservices Architecture",
        "content": "Microservices architecture divides applications into smaller independent services. Each service performs a specific function and can be developed, deployed, and scaled independently."
      },
      {
        "title": "High-Level Design (HLD)",
        "content": "High-Level Design focuses on the overall architecture of a system. It identifies major components, services, databases, APIs, and communication patterns without focusing on implementation details."
      },
      {
        "title": "Low-Level Design (LLD)",
        "content": "Low-Level Design focuses on implementation details such as classes, methods, database schemas, object relationships, APIs, and algorithms. LLD helps developers understand how individual components are built."
      },
      {
        "title": "Scalability Basics",
        "content": "Scalability refers to the ability of a system to handle increasing numbers of users, requests, and data while maintaining acceptable performance. It is one of the most important goals in system design."
      },
      {
        "title": "Reliability and Availability",
        "content": "Reliability ensures that a system performs correctly under expected conditions. Availability measures how often a system remains operational and accessible to users."
      },
      {
        "title": "Performance and Latency",
        "content": "Performance refers to how quickly a system responds to requests. Latency measures the time delay between a request and a response. Reducing latency improves user experience."
      },
      {
        "title": "System Design Process",
        "content": "A typical system design process includes requirement gathering, estimating scale, identifying components, choosing databases, defining APIs, planning scalability strategies, addressing security concerns, and evaluating trade-offs."
      },
      {
        "title": "Real-World Example: Designing a URL Shortener",
        "content": "A URL shortener converts long URLs into shorter links. Designing such a system requires databases, APIs, unique ID generation, caching, load balancing, and scalability considerations. This simple example introduces many core system design concepts."
      },
      {
        "title": "Common System Design Terminology",
        "content": "Important terms include scalability, throughput, latency, fault tolerance, replication, sharding, load balancing, caching, consistency, availability, and partition tolerance. These concepts appear frequently in interviews and real-world projects."
      },
      {
        "title": "System Design Interviews",
        "content": "System design interviews evaluate a candidate's ability to design scalable and reliable applications. Common interview questions include designing YouTube, WhatsApp, Uber, Twitter, URL Shortener, Netflix, and Instagram."
      }
    ],
    "quiz": {
      "title": "Introduction to System Design Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is the primary purpose of System Design?",
          "options": [
            "Writing code only",
            "Designing scalable and reliable systems",
            "Testing software",
            "Creating databases only"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "What does HLD stand for?",
          "options": [
            "High-Level Design",
            "Hybrid Layer Design",
            "Host-Level Design",
            "Hardware Logic Design"
          ],
          "correctAnswerIndex": 0
        },
        {
          "questionText": "Which architecture divides applications into independent services?",
          "options": [
            "Monolithic",
            "Microservices",
            "Bus",
            "Ring"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "What measures how quickly a system responds to requests?",
          "options": [
            "Availability",
            "Latency",
            "Reliability",
            "Scalability"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "Which of the following is a common System Design interview question?",
          "options": [
            "Design WhatsApp",
            "Design YouTube",
            "Design URL Shortener",
            "All of the Above"
          ],
          "correctAnswerIndex": 3
        }
      ]
    }
  },
  // Module 2
  {
    "title": "Scalability",
    "description": "This module introduces Scalability, one of the most important concepts in System Design. Learners will understand how applications handle increasing traffic, users, and data while maintaining performance. The module covers vertical scaling, horizontal scaling, bottlenecks, throughput, latency, availability, reliability, and capacity planning used in real-world large-scale systems.",
    "estimatedDuration": "90 Minutes",
    "difficulty": "Beginner to Intermediate",
    "lessons": [
      {
        "title": "Introduction to Scalability",
        "content": "Scalability is the ability of a system to handle increasing numbers of users, requests, and data without significantly affecting performance. Modern applications such as YouTube, Netflix, Instagram, and Amazon depend heavily on scalable architectures."
      },
      {
        "title": "Why Scalability Matters",
        "content": "Applications often start with a small user base but grow over time. Without scalability, systems may become slow, unresponsive, or unavailable when traffic increases."
      },
      {
        "title": "Understanding System Growth",
        "content": "As user traffic increases, applications must process more requests, store more data, and serve more content. Scalability ensures that systems can adapt to these growing demands."
      },
      {
        "title": "Vertical Scaling",
        "content": "Vertical Scaling, also known as scaling up, involves increasing the resources of a single server by adding more CPU, RAM, or storage. It is simple to implement but has hardware limitations."
      },
      {
        "title": "Advantages of Vertical Scaling",
        "content": "Vertical scaling is easier to manage, requires fewer architectural changes, and works well for small and medium-sized applications."
      },
      {
        "title": "Limitations of Vertical Scaling",
        "content": "Hardware upgrades have limits. A single server becomes a single point of failure and eventually cannot handle unlimited growth."
      },
      {
        "title": "Horizontal Scaling",
        "content": "Horizontal Scaling, also known as scaling out, involves adding more servers to distribute workload. This approach is commonly used by large-scale applications serving millions of users."
      },
      {
        "title": "Advantages of Horizontal Scaling",
        "content": "Horizontal scaling improves fault tolerance, increases system capacity, reduces risk of downtime, and supports virtually unlimited growth."
      },
      {
        "title": "Challenges of Horizontal Scaling",
        "content": "Distributed systems introduce challenges such as data synchronization, load balancing, network communication, and consistency management."
      },
      {
        "title": "System Bottlenecks",
        "content": "A bottleneck is any component that limits overall system performance. Common bottlenecks include databases, application servers, storage systems, network bandwidth, and third-party services."
      },
      {
        "title": "Identifying Bottlenecks",
        "content": "Monitoring tools help engineers identify components experiencing high CPU usage, memory consumption, slow queries, or excessive response times."
      },
      {
        "title": "Throughput",
        "content": "Throughput measures the number of requests or operations a system can process within a specific period. Higher throughput generally indicates better system capacity."
      },
      {
        "title": "Latency",
        "content": "Latency refers to the time taken for a request to travel from the user to the server and back. Low latency improves user experience and application responsiveness."
      },
      {
        "title": "Availability",
        "content": "Availability measures how often a system remains operational and accessible. High availability systems aim to minimize downtime through redundancy and failover mechanisms."
      },
      {
        "title": "Reliability",
        "content": "Reliability refers to a system's ability to perform correctly and consistently under expected workloads and operating conditions."
      },
      {
        "title": "Fault Tolerance",
        "content": "Fault tolerance enables systems to continue functioning even when certain components fail. Redundant servers, backups, and replication techniques help achieve fault tolerance."
      },
      {
        "title": "Capacity Planning",
        "content": "Capacity planning involves estimating future resource requirements based on expected growth in users, traffic, and data. Proper planning prevents performance issues and unexpected outages."
      },
      {
        "title": "Traffic Spikes",
        "content": "Applications often experience sudden increases in traffic during product launches, sales events, or viral content. Scalable systems are designed to handle these spikes efficiently."
      },
      {
        "title": "Real-World Example: Netflix",
        "content": "Netflix serves millions of users worldwide. To handle massive traffic, it uses horizontal scaling, distributed systems, content delivery networks, caching, and cloud infrastructure."
      },
      {
        "title": "Real-World Example: Instagram",
        "content": "Instagram scales by distributing workloads across multiple servers, using caching mechanisms, database replication, and cloud-based infrastructure to handle billions of interactions daily."
      },
      {
        "title": "Scalability Trade-Offs",
        "content": "Scalable systems often require additional complexity, infrastructure costs, and operational overhead. Engineers must balance performance, reliability, cost, and maintainability."
      },
      {
        "title": "Scalability in System Design Interviews",
        "content": "Interviewers frequently ask candidates how they would scale systems such as YouTube, WhatsApp, Twitter, Uber, and Netflix. Understanding scaling strategies is essential for software engineering interviews."
      }
    ],
    "quiz": {
      "title": "Scalability Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is scalability?",
          "options": [
            "Writing code faster",
            "Handling increasing traffic and data efficiently",
            "Creating databases",
            "Testing applications"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "What is Vertical Scaling?",
          "options": [
            "Adding more servers",
            "Increasing resources of a single server",
            "Adding databases",
            "Reducing traffic"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "What is Horizontal Scaling?",
          "options": [
            "Upgrading RAM only",
            "Adding more servers",
            "Reducing storage",
            "Removing bottlenecks"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "What does latency measure?",
          "options": [
            "Storage capacity",
            "Response time",
            "Database size",
            "Network cables"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "Which company is commonly used as an example of large-scale systems?",
          "options": [
            "Netflix",
            "Instagram",
            "YouTube",
            "All of the Above"
          ],
          "correctAnswerIndex": 3
        }
      ]
    }
  },
  // Module 3
  {
    "title": "Load Balancing",
    "description": "This module introduces Load Balancing, a critical concept in System Design used to distribute incoming traffic across multiple servers. Learners will understand load balancer architecture, load balancing algorithms, health checks, reverse proxies, failover mechanisms, and real-world implementations used by large-scale systems such as Netflix, Amazon, and Google.",
    "estimatedDuration": "90 Minutes",
    "difficulty": "Intermediate",
    "lessons": [
      {
        "title": "Introduction to Load Balancing",
        "content": "Load Balancing is the process of distributing incoming user requests across multiple servers to ensure optimal resource utilization, improve performance, and prevent any single server from becoming overloaded."
      },
      {
        "title": "Why Load Balancing is Important",
        "content": "As applications grow, a single server cannot handle all incoming traffic efficiently. Load balancing helps distribute requests evenly, improving performance, reliability, and scalability."
      },
      {
        "title": "The Problem with Single Server Architecture",
        "content": "When all traffic is directed to one server, high demand can cause slow response times, downtime, and resource exhaustion. This creates a single point of failure in the system."
      },
      {
        "title": "What is a Load Balancer?",
        "content": "A Load Balancer is a component that sits between clients and backend servers. It receives incoming requests and forwards them to appropriate servers based on predefined algorithms and health conditions."
      },
      {
        "title": "Load Balancer Architecture",
        "content": "In a typical architecture, users send requests to a load balancer. The load balancer distributes requests across multiple application servers, ensuring no individual server receives excessive traffic."
      },
      {
        "title": "Benefits of Load Balancing",
        "content": "Load balancing improves scalability, availability, reliability, fault tolerance, performance, and user experience. It also simplifies infrastructure management."
      },
      {
        "title": "Load Balancing Algorithms",
        "content": "Load balancers use algorithms to determine which server should receive incoming requests. Different algorithms are suitable for different workloads and application requirements."
      },
      {
        "title": "Round Robin Algorithm",
        "content": "Round Robin distributes requests sequentially across all available servers. Each server receives requests in turn, ensuring equal traffic distribution under similar server capacities."
      },
      {
        "title": "Weighted Round Robin",
        "content": "Weighted Round Robin assigns different weights to servers based on their capacity. More powerful servers receive a larger share of incoming traffic."
      },
      {
        "title": "Least Connections Algorithm",
        "content": "Least Connections sends new requests to the server with the fewest active connections. This method works well when requests vary significantly in processing time."
      },
      {
        "title": "Least Response Time Algorithm",
        "content": "This algorithm directs traffic to the server with the lowest response time and fewest active connections, improving overall system performance."
      },
      {
        "title": "IP Hash Algorithm",
        "content": "IP Hash uses the client's IP address to determine which server will handle requests. This helps maintain session consistency for individual users."
      },
      {
        "title": "Health Checks",
        "content": "Load balancers continuously monitor backend servers through health checks. If a server becomes unavailable, traffic is automatically redirected to healthy servers."
      },
      {
        "title": "Failover Mechanism",
        "content": "Failover ensures service continuity during server failures. When one server becomes unavailable, requests are automatically routed to backup servers."
      },
      {
        "title": "High Availability",
        "content": "High Availability systems minimize downtime by using redundant servers, failover mechanisms, and multiple load balancers to ensure continuous service."
      },
      {
        "title": "Reverse Proxy",
        "content": "A reverse proxy receives requests from clients and forwards them to backend servers. Modern load balancers often function as reverse proxies while providing additional security and caching features."
      },
      {
        "title": "Nginx as a Load Balancer",
        "content": "Nginx is one of the most popular load balancing solutions. It supports reverse proxying, load balancing, caching, SSL termination, and high-performance request handling."
      },
      {
        "title": "HAProxy",
        "content": "HAProxy is a high-performance load balancer widely used in enterprise environments. It provides advanced traffic distribution, monitoring, and failover capabilities."
      },
      {
        "title": "Load Balancing in Cloud Platforms",
        "content": "Cloud providers such as AWS, Google Cloud, and Microsoft Azure offer managed load balancing services that automatically distribute traffic and scale infrastructure."
      },
      {
        "title": "Real-World Example: Netflix",
        "content": "Netflix uses multiple load balancers across regions to distribute millions of requests every second. This ensures high availability, scalability, and uninterrupted streaming experiences."
      },
      {
        "title": "Real-World Example: Amazon",
        "content": "Amazon uses load balancing to distribute traffic across thousands of servers and data centers, ensuring customers experience reliable shopping and fast response times."
      },
      {
        "title": "Load Balancing in System Design Interviews",
        "content": "Interviewers frequently ask how load balancing improves scalability, reliability, and availability. Understanding load balancer architecture and algorithms is essential for system design interviews."
      }
    ],
    "quiz": {
      "title": "Load Balancing Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is the primary purpose of Load Balancing?",
          "options": [
            "Store data",
            "Distribute traffic across servers",
            "Create databases",
            "Write code"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "Which algorithm distributes requests sequentially across servers?",
          "options": [
            "Least Connections",
            "IP Hash",
            "Round Robin",
            "Weighted Routing"
          ],
          "correctAnswerIndex": 2
        },
        {
          "questionText": "What is the purpose of Health Checks?",
          "options": [
            "Increase storage",
            "Monitor server availability",
            "Create APIs",
            "Reduce memory"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "Which tool is commonly used as a Load Balancer?",
          "options": [
            "MySQL",
            "MongoDB",
            "Nginx",
            "Git"
          ],
          "correctAnswerIndex": 2
        },
        {
          "questionText": "What happens when a server fails in a properly configured load balancing system?",
          "options": [
            "Application stops",
            "Traffic is redirected to healthy servers",
            "Database is deleted",
            "Users are logged out"
          ],
          "correctAnswerIndex": 1
        }
      ]
    }
  },
  // Module 4
  {
    "title": "Caching",
    "description": "This module introduces Caching, one of the most important performance optimization techniques in System Design. Learners will understand how caching reduces latency, decreases database load, improves scalability, and enhances user experience. The module covers cache architectures, cache strategies, Redis, Memcached, cache eviction policies, CDN, cache invalidation, and real-world implementations used by large-scale applications.",
    "estimatedDuration": "100 Minutes",
    "difficulty": "Intermediate",
    "lessons": [
      {
        "title": "Introduction to Caching",
        "content": "Caching is the process of storing frequently accessed data in a temporary storage layer so that future requests can be served faster. Instead of repeatedly fetching data from slow databases or external services, applications retrieve data from the cache."
      },
      {
        "title": "Why Caching is Important",
        "content": "As applications grow, databases and backend services can become overloaded. Caching reduces the number of expensive operations, improves response times, lowers infrastructure costs, and increases system scalability."
      },
      {
        "title": "How Caching Works",
        "content": "When a user requests data, the application first checks whether the data exists in the cache. If the data is found, it is returned immediately. If not, the application retrieves the data from the database, stores it in the cache, and then returns it to the user."
      },
      {
        "title": "Cache Hit",
        "content": "A Cache Hit occurs when requested data is found in the cache. Cache hits provide extremely fast responses because the system avoids querying the database."
      },
      {
        "title": "Cache Miss",
        "content": "A Cache Miss occurs when requested data is not available in the cache. The system must retrieve the data from the database or backend service before storing it in the cache."
      },
      {
        "title": "Benefits of Caching",
        "content": "Caching improves performance, reduces latency, decreases database load, lowers infrastructure costs, improves scalability, and enhances user experience."
      },
      {
        "title": "Types of Caching",
        "content": "Caching can be implemented at multiple levels including browser caching, application caching, database caching, server-side caching, and content delivery network caching."
      },
      {
        "title": "Browser Caching",
        "content": "Browser caching stores static resources such as images, CSS files, and JavaScript files locally on a user's device. This reduces repeated downloads and improves website loading speed."
      },
      {
        "title": "Application-Level Caching",
        "content": "Application-level caching stores frequently requested business data in memory. This prevents repetitive database queries and improves application performance."
      },
      {
        "title": "Database Caching",
        "content": "Database caching stores query results to reduce repeated database operations. Frequently executed queries can be served directly from cache instead of performing expensive database lookups."
      },
      {
        "title": "In-Memory Caching",
        "content": "In-memory caching stores data directly in RAM, allowing extremely fast data retrieval. It is much faster than accessing data from traditional disk-based storage systems."
      },
      {
        "title": "Redis",
        "content": "Redis is one of the most popular in-memory data stores used for caching. It supports strings, lists, sets, hashes, and advanced data structures while providing high performance and scalability."
      },
      {
        "title": "Memcached",
        "content": "Memcached is a distributed memory caching system designed to speed up dynamic web applications. It stores simple key-value pairs and is widely used to reduce database load."
      },
      {
        "title": "Redis vs Memcached",
        "content": "Redis supports persistence, replication, advanced data structures, and clustering, while Memcached focuses on simple high-speed caching. Redis is generally preferred for modern applications due to its flexibility."
      },
      {
        "title": "Cache Eviction Policies",
        "content": "Since cache storage is limited, systems must decide which data to remove when the cache becomes full. Cache eviction policies help manage memory efficiently."
      },
      {
        "title": "Least Recently Used (LRU)",
        "content": "LRU removes data that has not been accessed recently. This is one of the most commonly used cache eviction strategies in modern systems."
      },
      {
        "title": "Least Frequently Used (LFU)",
        "content": "LFU removes data that is accessed least frequently. Frequently used data remains in cache for longer periods."
      },
      {
        "title": "First In First Out (FIFO)",
        "content": "FIFO removes the oldest cached data first, regardless of access frequency. It is simple to implement but may not always provide optimal performance."
      },
      {
        "title": "Cache Invalidation",
        "content": "Cache invalidation ensures outdated data is removed or updated when underlying data changes. It is often considered one of the most challenging problems in system design."
      },
      {
        "title": "Write-Through Caching",
        "content": "In Write-Through Caching, data is written to both the cache and database simultaneously. This ensures consistency but may increase write latency."
      },
      {
        "title": "Write-Back Caching",
        "content": "In Write-Back Caching, data is written to the cache first and updated in the database later. This improves performance but introduces consistency challenges."
      },
      {
        "title": "Content Delivery Network (CDN)",
        "content": "A CDN is a globally distributed network of servers that caches static content closer to users. CDNs reduce latency and improve website performance by serving content from nearby locations."
      },
      {
        "title": "Popular CDN Providers",
        "content": "Popular CDN providers include Cloudflare, Akamai, Amazon CloudFront, Fastly, and Google Cloud CDN. These services help applications deliver content efficiently across the globe."
      },
      {
        "title": "Real-World Example: Netflix",
        "content": "Netflix uses extensive caching and CDN infrastructure to deliver video content efficiently to millions of users worldwide while minimizing latency and bandwidth costs."
      },
      {
        "title": "Real-World Example: Instagram",
        "content": "Instagram uses Redis and caching layers to serve user profiles, feeds, and media content quickly while reducing database load."
      },
      {
        "title": "Caching in System Design Interviews",
        "content": "Caching is one of the most frequently discussed topics in system design interviews. Candidates are expected to understand cache architecture, cache strategies, eviction policies, CDN usage, and cache consistency trade-offs."
      }
    ],
    "quiz": {
      "title": "Caching Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "What is the primary purpose of caching?",
          "options": [
            "Increase database size",
            "Reduce latency and improve performance",
            "Delete data",
            "Create APIs"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "What is a Cache Hit?",
          "options": [
            "Data found in cache",
            "Database failure",
            "Cache deletion",
            "Network timeout"
          ],
          "correctAnswerIndex": 0
        },
        {
          "questionText": "Which tool is widely used for in-memory caching?",
          "options": [
            "MySQL",
            "MongoDB",
            "Redis",
            "Git"
          ],
          "correctAnswerIndex": 2
        },
        {
          "questionText": "Which cache eviction policy removes least recently used data?",
          "options": [
            "FIFO",
            "LFU",
            "LRU",
            "Random"
          ],
          "correctAnswerIndex": 2
        },
        {
          "questionText": "What is the purpose of a CDN?",
          "options": [
            "Store source code",
            "Deliver content closer to users",
            "Create databases",
            "Manage operating systems"
          ],
          "correctAnswerIndex": 1
        }
      ]
    }
  },
  // Module 5
  {
    "title": "Database Fundamentals",
    "description": "This module introduces Database Fundamentals, one of the most important components of System Design. Learners will understand how databases store, manage, and retrieve data efficiently. The module covers SQL and NoSQL databases, ACID properties, indexing, replication, partitioning, sharding, read replicas, and database scaling strategies used in modern large-scale applications.",
    "estimatedDuration": "110 Minutes",
    "difficulty": "Intermediate",
    "lessons": [
      {
        "title": "Introduction to Databases",
        "content": "A database is an organized collection of data that allows applications to store, retrieve, update, and manage information efficiently. Databases are the backbone of modern applications including social media platforms, banking systems, e-commerce websites, and cloud services."
      },
      {
        "title": "Why Databases are Important",
        "content": "Applications generate and process large amounts of data. Databases provide a structured way to manage this information while ensuring reliability, consistency, security, and efficient access."
      },
      {
        "title": "Types of Databases",
        "content": "Databases are broadly classified into Relational Databases (SQL) and Non-Relational Databases (NoSQL). Each type is designed to solve different business and scalability requirements."
      },
      {
        "title": "Relational Databases (SQL)",
        "content": "Relational databases store data in tables consisting of rows and columns. Relationships between tables are maintained using keys. SQL databases provide strong consistency and structured data management."
      },
      {
        "title": "Popular SQL Databases",
        "content": "Common SQL databases include MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database, and MariaDB. These databases are widely used in enterprise applications and transactional systems."
      },
      {
        "title": "Structured Query Language (SQL)",
        "content": "SQL is the standard language used to interact with relational databases. It allows developers to create, retrieve, update, and delete data while managing database structures."
      },
      {
        "title": "NoSQL Databases",
        "content": "NoSQL databases are designed to handle large-scale, distributed, and unstructured data. They provide flexibility and scalability for modern applications dealing with massive datasets."
      },
      {
        "title": "Types of NoSQL Databases",
        "content": "NoSQL databases can be categorized as Document Databases, Key-Value Stores, Column-Family Databases, and Graph Databases. Each category is optimized for specific use cases."
      },
      {
        "title": "Popular NoSQL Databases",
        "content": "Popular NoSQL databases include MongoDB, Cassandra, Redis, DynamoDB, Couchbase, and Neo4j. These databases are commonly used in large-scale distributed systems."
      },
      {
        "title": "SQL vs NoSQL",
        "content": "SQL databases provide strong consistency and structured schemas, while NoSQL databases offer greater scalability, flexibility, and performance for distributed systems. Choosing between them depends on application requirements."
      },
      {
        "title": "ACID Properties",
        "content": "ACID properties ensure reliable transaction processing in relational databases. ACID stands for Atomicity, Consistency, Isolation, and Durability."
      },
      {
        "title": "Atomicity",
        "content": "Atomicity ensures that a transaction is treated as a single unit of work. Either all operations succeed, or none of them are applied."
      },
      {
        "title": "Consistency",
        "content": "Consistency ensures that a transaction moves the database from one valid state to another while maintaining data integrity and business rules."
      },
      {
        "title": "Isolation",
        "content": "Isolation ensures that concurrent transactions do not interfere with each other. Each transaction behaves as if it is executing independently."
      },
      {
        "title": "Durability",
        "content": "Durability guarantees that once a transaction is committed, the data remains permanently stored even in the event of system failures."
      },
      {
        "title": "Database Indexing",
        "content": "Indexes improve query performance by allowing databases to locate data quickly without scanning entire tables. Proper indexing significantly reduces query execution time."
      },
      {
        "title": "Advantages of Indexing",
        "content": "Indexing improves search performance, accelerates query execution, and enhances application responsiveness. However, excessive indexing can increase storage requirements and write overhead."
      },
      {
        "title": "Database Replication",
        "content": "Replication involves maintaining copies of the same database across multiple servers. Replication improves availability, fault tolerance, and read performance."
      },
      {
        "title": "Master-Slave Architecture",
        "content": "In a Master-Slave architecture, the master database handles write operations while replica databases handle read operations. This improves scalability and reduces load on the primary database."
      },
      {
        "title": "Read Replicas",
        "content": "Read replicas are duplicate database instances used to serve read requests. They help distribute traffic and improve application performance."
      },
      {
        "title": "Database Partitioning",
        "content": "Partitioning divides a large database table into smaller segments. This improves performance, manageability, and query efficiency."
      },
      {
        "title": "Sharding",
        "content": "Sharding distributes data across multiple database servers. Each shard contains a subset of the data, allowing the system to scale horizontally as data volume grows."
      },
      {
        "title": "Challenges of Sharding",
        "content": "Sharding introduces complexity in query routing, data consistency, joins, and maintenance. Proper shard key selection is critical for successful implementation."
      },
      {
        "title": "Database Scaling Strategies",
        "content": "Database scaling can be achieved through vertical scaling, replication, partitioning, sharding, caching, and read replicas. Large-scale applications often combine multiple strategies."
      },
      {
        "title": "MySQL vs PostgreSQL vs MongoDB",
        "content": "MySQL is widely used for web applications, PostgreSQL offers advanced SQL features and reliability, while MongoDB provides flexible document-based storage suitable for large-scale distributed applications."
      },
      {
        "title": "Real-World Example: Instagram",
        "content": "Instagram uses database replication, caching, sharding, and distributed storage systems to support billions of user interactions while maintaining high performance."
      },
      {
        "title": "Real-World Example: Amazon",
        "content": "Amazon employs multiple database technologies, replication strategies, caching layers, and distributed architectures to manage massive amounts of customer and transaction data."
      },
      {
        "title": "Databases in System Design Interviews",
        "content": "Interviewers frequently ask about SQL vs NoSQL, ACID properties, indexing, replication, sharding, partitioning, and database scaling. Strong database knowledge is essential for system design interviews."
      }
    ],
    "quiz": {
      "title": "Database Fundamentals Quiz",
      "passingScore": 70,
      "questions": [
        {
          "questionText": "Which type of database stores data in tables?",
          "options": [
            "NoSQL",
            "Graph Database",
            "Relational Database",
            "Document Database"
          ],
          "correctAnswerIndex": 2
        },
        {
          "questionText": "What does ACID stand for?",
          "options": [
            "Atomicity, Consistency, Isolation, Durability",
            "Availability, Consistency, Integrity, Durability",
            "Atomicity, Control, Isolation, Data",
            "Availability, Control, Integrity, Data"
          ],
          "correctAnswerIndex": 0
        },
        {
          "questionText": "Which database is a popular NoSQL database?",
          "options": [
            "MySQL",
            "PostgreSQL",
            "MongoDB",
            "Oracle"
          ],
          "correctAnswerIndex": 2
        },
        {
          "questionText": "What is the purpose of database indexing?",
          "options": [
            "Increase storage",
            "Improve query performance",
            "Reduce security",
            "Delete records"
          ],
          "correctAnswerIndex": 1
        },
        {
          "questionText": "What is sharding?",
          "options": [
            "Deleting data",
            "Backing up data",
            "Distributing data across multiple servers",
            "Compressing data"
          ],
          "correctAnswerIndex": 2
        }
      ]
    }
  }
];

const mockInterviewQuestions = [
  { question: "What is scalability?", answer: "Scalability is the ability of a system to handle increasing load without affecting performance.", difficulty: "Beginner", companyTags: ["Google", "Amazon"] },
  { question: "Difference between horizontal and vertical scaling?", answer: "Vertical is adding more CPU/RAM to a single machine. Horizontal is adding more machines.", difficulty: "Beginner", companyTags: ["Microsoft", "Meta"] },
  { question: "What is caching?", answer: "Caching stores frequently accessed data in a fast memory layer (like RAM/Redis) to reduce latency.", difficulty: "Beginner", companyTags: ["Netflix"] },
  { question: "Explain database sharding.", answer: "Sharding is horizontal partitioning of a database where rows are distributed across multiple databases.", difficulty: "Intermediate", companyTags: ["Uber"] },
  { question: "What is CAP theorem?", answer: "CAP theorem states a distributed data store can only guarantee two of: Consistency, Availability, Partition Tolerance.", difficulty: "Intermediate", companyTags: ["Airbnb"] },
  { question: "What is eventual consistency?", answer: "Eventual consistency guarantees that if no new updates are made, all reads will eventually return the last updated value.", difficulty: "Intermediate", companyTags: ["Amazon"] },
  { question: "How does a CDN work?", answer: "A CDN caches static assets in edge servers distributed globally so users download them from geographically close locations.", difficulty: "Intermediate", companyTags: ["Netflix", "Meta"] },
  { question: "When would you choose SQL over NoSQL?", answer: "Choose SQL when you need strong ACID guarantees, structured schema, and complex joins.", difficulty: "Intermediate", companyTags: ["LinkedIn"] },
  { question: "Explain load balancing.", answer: "Load balancing distributes incoming network traffic across multiple servers to prevent overload and ensure high availability.", difficulty: "Beginner", companyTags: ["Google"] },
  { question: "What is a message queue?", answer: "A message queue is an asynchronous service-to-service communication used in serverless and microservices architectures.", difficulty: "Intermediate", companyTags: ["Flipkart", "Paytm"] }
];

const seedData = async () => {
  try {
    console.log('--- MongoDB Connection Config ---');
    console.log(`Using URI: ${process.env.MONGO_URI}`);
    console.log('Attempting to connect to MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected successfully to: ${mongoose.connection.host}`);
    
    console.log('Clearing old System Design Data...');
    await SystemDesignSubject.deleteMany();
    await SystemDesignTopic.deleteMany();
    await SystemDesignNotes.deleteMany();
    await SystemDesignQuestion.deleteMany();
    await SystemDesignQuiz.deleteMany();
    
    console.log('Inserting System Design Subject...');
    let subject = await SystemDesignSubject.create({
      title: 'System Design Interview Preparation',
      description: 'Prepare for software engineering interviews by mastering System Design concepts from beginner to advanced level. Cover scalability, distributed systems, databases, caching, load balancing, architecture patterns, and real-world system design interviews.'
    });

    for (let i = 0; i < modules.length; i++) {
      const mod = modules[i];
      console.log(`Processing Topic: ${mod.title}`);
      
      const topic = await SystemDesignTopic.create({
        subjectId: subject._id,
        title: mod.title,
        description: mod.description,
        order: i + 1,
        estimatedDuration: mod.estimatedDuration,
        difficulty: mod.difficulty
      });

      // Construct Markdown Notes from Lessons
      let mdContent = `# ${mod.title}\n\n`;
      let sections = [];
      mod.lessons.forEach(l => {
        mdContent += `### ${l.title}\n${l.content}\n\n`;
        sections.push({ title: l.title, content: l.content });
      });

      const notes = await SystemDesignNotes.create({
        topicId: topic._id,
        content: mdContent,
        sections: sections
      });
      topic.notes = notes._id;

      // Quiz
      const quiz = await SystemDesignQuiz.create({
        topicId: topic._id,
        title: mod.quiz.title,
        passingScore: mod.quiz.passingScore,
        questions: mod.quiz.questions
      });
      topic.quiz = quiz._id;
      
      await topic.save();
      
      subject.topics.push(topic._id);
    }
    
    await subject.save();

    console.log('Inserting Mock Interview Questions...');
    // Distribute mock questions randomly among topics for structure
    const allTopics = await SystemDesignTopic.find();
    for (const q of mockInterviewQuestions) {
      const randTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
      await SystemDesignQuestion.create({
        topicId: randTopic._id,
        question: q.question,
        answer: q.answer,
        difficulty: q.difficulty === 'Beginner' ? 'Easy' : (q.difficulty === 'Intermediate' ? 'Medium' : 'Advanced'),
        companyTags: q.companyTags
      });
    }

    console.log('System Design Data Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
