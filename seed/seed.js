require('../config/env');
const Problem = require('../models/Problem');
const { connectMongoForScript, disconnectMongo } = require('../utils/mongoScript');
const {
  buildStarters,
  pythonTwoSum,
  pythonValidParentheses,
  pythonClimbingStairs,
  pythonLongestSubstring,
  pythonJumpGame,
} = require('../utils/dsaStarterTemplates');

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const problems = [
  {
    title: 'Two Sum',
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume each input has exactly one solution.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i], target <= 10^9'],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] == 9',
      },
    ],
    hints: ['Use a hash map to store complements.'],
    difficulty: 'Easy',
    topic: 'Arrays',
    starterCode: buildStarters(pythonTwoSum()),
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0, 1]', isHidden: false },
      { input: '[3,2,4]\n6', expectedOutput: '[1, 2]', isHidden: false },
      { input: '[3,3]\n6', expectedOutput: '[0, 1]', isHidden: true },
    ],
  },
  {
    title: 'Valid Parentheses',
    description:
      'Given a string `s` containing only `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
    constraints: ['1 <= s.length <= 10^4'],
    examples: [{ input: 's = "()"', output: 'true', explanation: 'Open brackets closed in order.' }],
    hints: ['Use a stack.'],
    difficulty: 'Easy',
    topic: 'Strings',
    starterCode: buildStarters(pythonValidParentheses()),
    testCases: [
      { input: '()', expectedOutput: 'true', isHidden: false },
      { input: '()[]{}', expectedOutput: 'true', isHidden: false },
      { input: '(]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Climbing Stairs',
    description:
      'You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 <= n <= 45'],
    examples: [{ input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' }],
    hints: ['Fibonacci / DP.'],
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    starterCode: buildStarters(pythonClimbingStairs()),
    testCases: [
      { input: '2', expectedOutput: '2', isHidden: false },
      { input: '3', expectedOutput: '3', isHidden: false },
      { input: '5', expectedOutput: '8', isHidden: true },
    ],
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    constraints: ['0 <= s.length <= 5 * 10^4'],
    examples: [{ input: 's = "abcabcbb"', output: '3', explanation: '"abc" has length 3.' }],
    hints: ['Sliding window with a set or map.'],
    difficulty: 'Medium',
    topic: 'Sliding Window',
    starterCode: buildStarters(pythonLongestSubstring()),
    testCases: [
      { input: 'abcabcbb', expectedOutput: '3', isHidden: false },
      { input: 'bbbbb', expectedOutput: '1', isHidden: false },
      { input: 'pwwkew', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: 'Jump Game',
    description:
      'Given an integer array `nums`, you start at index 0. Each element is your max jump length from that index. Return `true` if you can reach the last index.',
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    examples: [{ input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 from 0 to 1, then 3 to the end.' }],
    hints: ['Track farthest reachable index (greedy).'],
    difficulty: 'Medium',
    topic: 'Greedy',
    starterCode: buildStarters(pythonJumpGame()),
    testCases: [
      { input: '[2,3,1,1,4]', expectedOutput: 'true', isHidden: false },
      { input: '[3,2,1,0,4]', expectedOutput: 'false', isHidden: false },
      { input: '[2,0,0]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Maximum Subarray',
    description:
      'Given an integer array `nums`, find the contiguous subarray with the largest sum and return that sum.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] sums to 6.' }],
    hints: ["Kadane's algorithm."],
    difficulty: 'Medium',
    topic: 'Arrays',
    starterCode: buildStarters(`import sys
import json

def maxSubArray(nums):
    best = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best

if __name__ == '__main__':
    nums = json.loads(sys.stdin.read().strip())
    print(maxSubArray(nums))
`),
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false },
      { input: '[1]', expectedOutput: '1', isHidden: false },
      { input: '[5,4,-1,7,8]', expectedOutput: '23', isHidden: true },
    ],
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    description:
      'Given an array `prices` where `prices[i]` is the stock price on day `i`, return the maximum profit from one buy and one sell.',
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy at 1, sell at 6.' }],
    hints: ['Track minimum price seen so far.'],
    difficulty: 'Easy',
    topic: 'Arrays',
    starterCode: buildStarters(`import sys
import json

def maxProfit(prices):
    min_p = float('inf')
    best = 0
    for p in prices:
        min_p = min(min_p, p)
        best = max(best, p - min_p)
    return best

if __name__ == '__main__':
    prices = json.loads(sys.stdin.read().strip())
    print(maxProfit(prices))
`),
    testCases: [
      { input: '[7,1,5,3,6,4]', expectedOutput: '5', isHidden: false },
      { input: '[7,6,4,3,1]', expectedOutput: '0', isHidden: false },
      { input: '[2,4,1]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Binary Search',
    description:
      'Given a sorted array `nums` and `target`, return the index of `target` or `-1` if not found.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i], target <= 10^4', 'nums is sorted ascending'],
    examples: [{ input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists at index 4.' }],
    hints: ['Classic binary search.'],
    difficulty: 'Easy',
    topic: 'Binary Search',
    starterCode: buildStarters(`import sys
import json

def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

if __name__ == '__main__':
    lines = sys.stdin.read().strip().split('\\n')
    nums = json.loads(lines[0])
    target = int(lines[1])
    print(search(nums, target))
`),
    testCases: [
      { input: '[-1,0,3,5,9,12]\n9', expectedOutput: '4', isHidden: false },
      { input: '[-1,0,3,5,9,12]\n2', expectedOutput: '-1', isHidden: false },
      { input: '[5]\n5', expectedOutput: '0', isHidden: true },
    ],
  },
];

const seedDB = async () => {
  try {
    await connectMongoForScript();
    console.log('MongoDB Connected for Seeding...');

    await Problem.deleteMany();
    console.log('Existing problems cleared');

    const docs = problems.map((p) => ({
      ...p,
      slug: slugify(p.title),
    }));

    await Problem.insertMany(docs);
    console.log(`Seeded ${docs.length} DSA problems with multi-language starters`);

    process.exitCode = 0;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await disconnectMongo().catch(() => {});
  }
  process.exit(process.exitCode ?? 0);
};

seedDB();
