const ProblemService = require('../services/problemService');
const PistonService = require('../services/pistonService');
const SavedCode = require('../models/SavedCode');
const {
  runAllTestCases,
  sanitizeResultsForClient,
} = require('../services/dsaExecutionService');

const getProblems = async (req, res, next) => {
  try {
    const problems = await ProblemService.getAllProblems();
    res.json(problems);
  } catch (error) {
    next(error);
  }
};

const getProblemById = async (req, res, next) => {
  try {
    const problem = await ProblemService.getProblemByIdPublic(req.params.id);
    res.json(problem);
  } catch (error) {
    if (error.message === 'Problem not found') {
      res.status(404);
    }
    next(error);
  }
};

const runCode = async (req, res, next) => {
  try {
    const { language, code, stdin, problemId } = req.body;

    if (!code || !String(code).trim()) {
      return res.status(400).json({
        success: false,
        status: 'Invalid',
        error: 'Please write some code before running.',
        mode: 'run',
      });
    }

    if (problemId && !stdin) {
      // Run against sample test cases
      const problem = await ProblemService.getProblemByIdForExecution(problemId);
      // Create a cloned problem object that only contains public test cases
      const sampleProblem = {
        ...problem.toObject ? problem.toObject() : problem,
        testCases: problem.testCases.filter(tc => !tc.isHidden)
      };
      
      const verdict = await runAllTestCases(sampleProblem, language, code);
      return res.json({
        mode: 'run',
        success: verdict.success,
        status: verdict.status,
        output: verdict.lastOutput,
        error: verdict.firstError,
        executionTime: verdict.executionTime,
        passedCases: verdict.passedCases,
        totalCases: verdict.totalCases,
        results: sanitizeResultsForClient(verdict.results),
      });
    }

    // Run against custom stdin
    const result = await PistonService.execute(language, code, stdin ?? '');
    res.json({
      mode: 'run',
      success: result.success,
      status: result.status,
      output: (result.output || '').trimEnd(),
      error: result.error,
      executionTime: result.executionTime,
    });
  } catch (error) {
    if (error.message?.includes('Unsupported language')) {
      res.status(400);
    }
    next(error);
  }
};

/** Submit against all test cases (public + hidden). */
const submitCode = async (req, res, next) => {
  try {
    const { language, code, problemId } = req.body;

    if (!code || !String(code).trim()) {
      return res.status(400).json({
        success: false,
        status: 'Invalid',
        error: 'Please write some code before submitting.',
        mode: 'submit',
      });
    }

    const problem = await ProblemService.getProblemByIdForExecution(problemId);
    const verdict = await runAllTestCases(problem, language, code);

    const userId = req.session?.userId || req.body.userId;
    if (userId) {
      await ProblemService.saveSubmission({
        userId,
        problemId,
        language,
        code,
        status: verdict.status,
        executionTime: verdict.executionTime,
        runtime: verdict.executionTime,
        output: verdict.lastOutput,
        passedCases: verdict.passedCases,
        totalCases: verdict.totalCases,
        results: verdict.results,
      });
    }

    res.json({
      mode: 'submit',
      success: verdict.success,
      status: verdict.status,
      output: verdict.lastOutput,
      error: verdict.firstError,
      executionTime: verdict.executionTime,
      passedCases: verdict.passedCases,
      totalCases: verdict.totalCases,
      results: sanitizeResultsForClient(verdict.results),
    });
  } catch (error) {
    if (error.message === 'Problem not found') {
      res.status(404);
    }
    next(error);
  }
};

const getSubmissions = async (req, res, next) => {
  try {
    const { problemId } = req.query;
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Sign in to view submission history.' });
    }

    const submissions = await ProblemService.getSubmissions(userId, problemId);
    res.json(submissions);
  } catch (error) {
    next(error);
  }
};

const getSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Sign in to view submission.' });
    }

    const Submission = require('../models/Submission');
    const submission = await Submission.findOne({ _id: id, userId }).lean();
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found or unauthorized.' });
    }
    
    res.json(submission);
  } catch (error) {
    next(error);
  }
};

const getSavedCode = async (req, res, next) => {
  try {
    const { problemId, language } = req.query;
    const userId = req.session?.userId;
    if (!userId) return res.json({ code: null });
    
    const saved = await SavedCode.findOne({ userId, problemId, language });
    res.json({ code: saved ? saved.code : null });
  } catch (error) {
    next(error);
  }
};

const saveCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;
    const userId = req.session?.userId;
    if (!userId) return res.status(401).json({ message: 'Sign in to save code.' });
    if (!problemId || !language || code == null) return res.status(400).json({ message: 'Missing required fields.' });

    await SavedCode.findOneAndUpdate(
      { userId, problemId, language },
      { code },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Code saved successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProblems,
  getProblemById,
  runCode,
  submitCode,
  getSubmissions,
  getSubmissionById,
  getSavedCode,
  saveCode,
};
