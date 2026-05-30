require('../config/env');
const Module = require('../models/Module');
const Problem = require('../models/Problem');
const Lesson = require('../models/Lesson');
const { connectMongoForScript, disconnectMongo } = require('../utils/mongoScript');

const topics = [
  { title: "Arrays", desc: "Contiguous memory allocations and basic operations." },
  { title: "Strings", desc: "Character arrays, pattern matching, and ASCII." },
  { title: "Linked Lists", desc: "Nodes connected via pointers." },
  { title: "Stack", desc: "Last-In-First-Out (LIFO) data structure." },
  { title: "Queue", desc: "First-In-First-Out (FIFO) data structure." },
  { title: "Recursion", desc: "Functions calling themselves to solve sub-problems." },
  { title: "Searching", desc: "Finding elements in data structures." },
  { title: "Sorting", desc: "Arranging elements in a specific order." },
  { title: "Binary Search", desc: "O(log n) search on sorted arrays." },
  { title: "Hashing", desc: "Key-value mapping for O(1) lookups." },
  { title: "Trees", desc: "Hierarchical data structures." },
  { title: "Binary Trees", desc: "Trees with at most two children per node." },
  { title: "BST", desc: "Binary Search Trees with left < root < right property." },
  { title: "Heaps", desc: "Complete binary trees for priority queues." },
  { title: "Graphs", desc: "Nodes (vertices) connected by edges." },
  { title: "Greedy Algorithms", desc: "Making locally optimal choices." },
  { title: "Sliding Window", desc: "Maintaining a subset of items over a sequential data structure." },
  { title: "Two Pointer", desc: "Using two indices to traverse iterables." },
  { title: "Backtracking", desc: "Exploring all potential solutions and abandoning invalid ones." },
  { title: "Dynamic Programming", desc: "Solving complex problems by breaking them down into simpler subproblems." }
];

const problemsData = [
  {
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    desc: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }],
    hints: ["Can you use a hash map to store the complement?"],
    tc: [
      { i: "[2,7,11,15]\n9", o: "[0, 1]" },
      { i: "[3,2,4]\n6", o: "[1, 2]" },
      { i: "[3,3]\n6", o: "[0, 1]", h: true }
    ],
    code: {
      python: "def twoSum(nums, target):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    import sys, json\n    input_data = sys.stdin.read().strip().split('\\n')\n    if len(input_data) >= 2:\n        nums = json.loads(input_data[0])\n        target = int(input_data[1])\n        print(twoSum(nums, target))"
    }
  },
  {
    title: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    examples: [{ input: "s = \"()\"", output: "true", explanation: "" }, { input: "s = \"()[]{}\"", output: "true", explanation: "" }],
    hints: ["Use a stack to keep track of opening brackets."],
    tc: [
      { i: "()", o: "true" },
      { i: "()[]{}", o: "true" },
      { i: "(]", o: "false" },
      { i: "([)]", o: "false", h: true }
    ],
    code: {
      python: "def isValid(s):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    import sys\n    s = sys.stdin.read().strip()\n    print('true' if isValid(s) else 'false')"
    }
  },
  {
    title: "Maximum Subarray",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    desc: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum = 6." }],
    hints: ["Kadane's Algorithm"],
    tc: [
      { i: "[-2,1,-3,4,-1,2,1,-5,4]", o: "6" },
      { i: "[1]", o: "1" },
      { i: "[5,4,-1,7,8]", o: "23", h: true }
    ],
    code: {
      python: "def maxSubArray(nums):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    import sys, json\n    nums = json.loads(sys.stdin.read().strip())\n    print(maxSubArray(nums))"
    }
  },
  {
    title: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    difficulty: "Medium",
    desc: "Given a string `s`, find the length of the longest substring without repeating characters.",
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    examples: [{ input: "s = \"abcabcbb\"", output: "3", explanation: "The answer is \"abc\", with the length of 3." }],
    hints: ["Use a sliding window and a hash set."],
    tc: [
      { i: "abcabcbb", o: "3" },
      { i: "bbbbb", o: "1" },
      { i: "pwwkew", o: "3", h: true }
    ],
    code: {
      python: "def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    import sys\n    s = sys.stdin.read().strip()\n    print(lengthOfLongestSubstring(s))"
    }
  },
  {
    title: "Reverse String",
    topic: "Strings",
    difficulty: "Easy",
    desc: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
    constraints: ["1 <= s.length <= 10^5"],
    examples: [{ input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: "" }],
    hints: ["Use two pointers, one at the start and one at the end."],
    tc: [
      { i: '["h","e","l","l","o"]', o: '["o","l","l","e","h"]' }
    ],
    code: {
      python: "def reverseString(s):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    import sys, json\n    s = json.loads(sys.stdin.read().strip())\n    reverseString(s)\n    print(json.dumps(s))"
    }
  }
];

const seedData = async () => {
  try {
    console.log('Attempting to connect to MongoDB for seeding...');
    await connectMongoForScript();
    console.log('MongoDB Connected for Seeding DSA...');

    await Module.deleteMany({});
    await Problem.deleteMany({});
    await Lesson.deleteMany({});

    console.log('Cleared existing DSA data.');

    let order = 1;
    for (const t of topics) {
      const moduleDoc = new Module({
        title: t.title,
        description: t.desc,
        order: order++,
        isLocked: false
      });
      await moduleDoc.save();

      const lessonDoc = new Lesson({
        title: `Introduction to ${t.title}`,
        content: `<h3>What is ${t.title}?</h3><p>${t.desc}</p><p><strong>Core Concept:</strong> Focus on understanding the primary operations and edge cases.</p>`,
        module: moduleDoc._id,
        order: 1
      });
      await lessonDoc.save();

      moduleDoc.lessons.push(lessonDoc._id);

      // Find problems for this topic
      const topicProblems = problemsData.filter(p => p.topic === t.title);
      let pOrder = 1;
      for (const p of topicProblems) {
        const problemDoc = new Problem({
          title: p.title,
          slug: p.title.toLowerCase().replace(/\s+/g, '-'),
          description: p.desc,
          constraints: p.constraints,
          examples: p.examples,
          difficulty: p.difficulty,
          topic: p.topic,
          hints: p.hints,
          testCases: p.tc.map(tc => ({ input: tc.i, expectedOutput: tc.o, isHidden: tc.h || false })),
          starterCode: p.code,
          module: moduleDoc._id,
          order: pOrder++
        });
        await problemDoc.save();
        moduleDoc.problems.push(problemDoc._id);
      }

      await moduleDoc.save();
    }

    console.log('DSA modules and problems seeded successfully!');
    process.exitCode = 0;
  } catch (error) {
    console.error('Error seeding DSA data:', error);
    process.exitCode = 1;
  } finally {
    await disconnectMongo().catch(() => {});
  }
  process.exit(process.exitCode ?? 0);
};

seedData();
