const Problem = require('../models/Problem');
const Submission = require('../models/Submission');

function sanitizeProblemForClient(problemDoc) {
  const p = problemDoc.toObject ? problemDoc.toObject() : { ...problemDoc };
  if (p.testCases) {
    p.testCases = p.testCases.map((tc) => ({
      input: tc.isHidden ? undefined : tc.input,
      expectedOutput: tc.isHidden ? undefined : tc.expectedOutput,
      isHidden: !!tc.isHidden,
      _id: tc._id,
    }));
  }
  return p;
}

class ProblemService {
  static async getAllProblems() {
    return Problem.find({})
      .select('-testCases')
      .sort({ topic: 1, order: 1, title: 1 })
      .lean();
  }

  static async getProblemByIdPublic(id) {
    const problem = await Problem.findById(id);
    if (!problem) {
      throw new Error('Problem not found');
    }
    return sanitizeProblemForClient(problem);
  }

  /** Full document including hidden tests — server only. */
  static async getProblemByIdForExecution(id) {
    const problem = await Problem.findById(id);
    if (!problem) {
      throw new Error('Problem not found');
    }
    return problem;
  }

  static async saveSubmission(submissionData) {
    return Submission.create(submissionData);
  }

  static async getSubmissions(userId, problemId) {
    const filter = { userId };
    if (problemId) filter.problemId = problemId;
    return Submission.find(filter)
      .sort({ submittedAt: -1 })
      .limit(25)
      .select('language status executionTime runtime passedCases totalCases submittedAt createdAt')
      .lean();
  }
}

module.exports = ProblemService;
