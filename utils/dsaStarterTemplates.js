/**
 * Runnable starter templates (stdin → stdout) for Piston execution.
 * Each reads stdin and prints the answer on stdout.
 */

const PY_IO = `import sys
import json

def solve():
    # Write your solution here
    pass

if __name__ == '__main__':
    data = sys.stdin.read().strip()
    if not data:
        sys.exit(0)
    solve()
`;

function pythonTwoSum() {
  return `import sys
import json

def twoSum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []

if __name__ == '__main__':
    lines = sys.stdin.read().strip().split('\\n')
    nums = json.loads(lines[0])
    target = int(lines[1])
    print(twoSum(nums, target))
`;
}

function pythonValidParentheses() {
  return `import sys

def isValid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return len(stack) == 0

if __name__ == '__main__':
    s = sys.stdin.read().strip()
    if s.startswith('"') and s.endswith('"'):
        s = s[1:-1]
    print('true' if isValid(s) else 'false')
`;
}

function pythonClimbingStairs() {
  return `import sys

def climbStairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

if __name__ == '__main__':
    n = int(sys.stdin.read().strip())
    print(climbStairs(n))
`;
}

function pythonLongestSubstring() {
  return `import sys

def lengthOfLongestSubstring(s):
    seen = {}
    start = 0
    best = 0
    for i, ch in enumerate(s):
        if ch in seen and seen[ch] >= start:
            start = seen[ch] + 1
        seen[ch] = i
        best = max(best, i - start + 1)
    return best

if __name__ == '__main__':
    s = sys.stdin.read().strip()
    if s.startswith('"') and s.endswith('"'):
        s = s[1:-1]
    print(lengthOfLongestSubstring(s))
`;
}

function pythonJumpGame() {
  return `import sys
import json

def canJump(nums):
    reach = 0
    for i, n in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + n)
    return True

if __name__ == '__main__':
    nums = json.loads(sys.stdin.read().strip())
    print('true' if canJump(nums) else 'false')
`;
}

function javaTemplate() {
  return `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\\n");
        }
        String input = sb.toString().trim();
        // TODO: parse input and print result
        System.out.println(input);
    }
}
`;
}

function cppTemplate() {
  return `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string input, line;
    while (getline(cin, line)) {
        if (!input.empty()) input += "\\n";
        input += line;
    }
    // TODO: solve and print
    cout << input << endl;
    return 0;
}
`;
}

function cTemplate() {
  return `#include <stdio.h>
#include <string.h>

int main() {
    char buf[4096] = {0};
    int c, i = 0;
    while ((c = getchar()) != EOF && i < (int)sizeof(buf) - 1) {
        buf[i++] = (char)c;
    }
    // TODO: solve and print
    printf("%s", buf);
    return 0;
}
`;
}

function buildStarters(pythonBody) {
  return {
    python: pythonBody,
    java: javaTemplate(),
    cpp: cppTemplate(),
    c: cTemplate(),
  };
}

module.exports = {
  PY_IO,
  buildStarters,
  pythonTwoSum,
  pythonValidParentheses,
  pythonClimbingStairs,
  pythonLongestSubstring,
  pythonJumpGame,
  javaTemplate,
  cppTemplate,
  cTemplate,
};
