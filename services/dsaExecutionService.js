const PistonService = require('./pistonService');

function normalizeText(s) {
  if (s == null) return '';
  return String(s)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim().replace(/\s+/g, ' '))
    .filter(line => line.length > 0)
    .join('\n')
    .trim();
}

/** Compare user stdout to expected; supports JSON arrays/objects loosely. */
function outputsEqual(actualRaw, expectedRaw) {
  const a = String(actualRaw == null ? '' : actualRaw).trim();
  const b = String(expectedRaw == null ? '' : expectedRaw).trim();
  if (a === b) return true;
  const na = normalizeText(a);
  const nb = normalizeText(b);
  if (na === nb) return true;
  try {
    const ja = JSON.parse(a.replace(/'/g, '"'));
    const jb = JSON.parse(b.replace(/'/g, '"'));
    return JSON.stringify(ja) === JSON.stringify(jb);
  } catch {
    // ignore
  }
  try {
    const ja = JSON.parse(a);
    const jb = JSON.parse(b);
    return JSON.stringify(ja) === JSON.stringify(jb);
  } catch {
    return false;
  }
}

function parseTotalMs(executionTimeStr) {
  const m = String(executionTimeStr || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

/**
 * Run all test cases (internal; full problem doc).
 * @returns {{ status, success, executionTime, passedCases, totalCases, results, lastOutput, firstError }}
 */
async function runAllTestCases(problem, langKey, code) {
  console.log(`[DSA Engine] Executing Problem: ${problem.title} (ID: ${problem._id}) in ${langKey}`);
  console.log(`[DSA Engine] Loaded ${problem.testCases?.length || 0} total test cases`);
  
  const results = [];
  let passed = 0;
  let overallStatus = 'Accepted';
  let firstError = '';
  let lastOutput = '';
  let totalTimeMs = 0;

  const tests = problem.testCases || [];

  for (let i = 0; i < tests.length; i++) {
    const tc = tests[i];
    const result = await PistonService.execute(langKey, code, tc.input);
    lastOutput = (result.output || '').trim();
    totalTimeMs += parseTotalMs(result.executionTime);
    
    console.log(`[DSA Engine] Test Case ${i + 1}:`);
    console.log(`  Expected: ${tc.expectedOutput}`);
    console.log(`  Actual  : ${lastOutput}`);
    console.log(`  Status  : ${result.status}`);

    if (!result.success) {
      if (overallStatus === 'Accepted') {
        overallStatus = result.status;
        firstError = result.error || result.status;
      }
      results.push({
        testCase: i + 1,
        passed: false,
        isHidden: !!tc.isHidden,
        output: lastOutput,
        expected: tc.isHidden ? 'Hidden' : String(tc.expectedOutput).trim(),
        error: result.error,
        status: result.status,
      });
      continue;
    }

    const ok = outputsEqual(result.output, tc.expectedOutput);
    if (ok) {
      passed++;
    } else {
      if (overallStatus === 'Accepted') {
        overallStatus = 'Wrong Answer';
        firstError = 'Wrong Answer';
      }
    }

    results.push({
      testCase: i + 1,
      passed: ok,
      isHidden: !!tc.isHidden,
      output: lastOutput,
      expected: tc.isHidden ? 'Hidden' : String(tc.expectedOutput).trim(),
      error: ok ? '' : 'Output mismatch',
      status: ok ? 'Accepted' : 'Wrong Answer',
    });
    
    // Evaluate all test cases, do not break early.
  }

  const executionTimeStr = `${totalTimeMs}ms`;

  return {
    success: overallStatus === 'Accepted',
    status: overallStatus,
    executionTime: executionTimeStr,
    passedCases: passed,
    totalCases: tests.length,
    results,
    lastOutput,
    firstError,
  };
}

/**
 * Shape test rows for API responses (hide I/O for hidden cases on failures).
 */
function sanitizeResultsForClient(rows) {
  return (rows || []).map((r) => ({
    testCase: r.testCase,
    passed: r.passed,
    isHidden: r.isHidden,
    output: r.isHidden && !r.passed ? '(hidden)' : r.output,
    expected: r.expected,
    error: r.error,
    status: r.status,
  }));
}

module.exports = {
  outputsEqual,
  normalizeText,
  runAllTestCases,
  sanitizeResultsForClient,
};
