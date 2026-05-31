const SystemDesignSubject = require('../models/SystemDesignSubject.js');
const SystemDesignTopic = require('../models/SystemDesignTopic.js');
const SystemDesignNotes = require('../models/SystemDesignNotes.js');
const SystemDesignQuestion = require('../models/SystemDesignQuestion.js');
const SystemDesignQuiz = require('../models/SystemDesignQuiz.js');
const SystemDesignProgress = require('../models/SystemDesignProgress.js');

// @desc    Get System Design Subject Info
// @route   GET /api/interview/system-design
// @access  Private
const getSystemDesignSubject = async (req, res) => {
  try {
    const subject = await SystemDesignSubject.findOne({ title: 'System Design Interview Preparation' }).populate({
      path: 'topics',
      options: { sort: { 'order': 1 } }
    });
    
    if (!subject) {
      return res.status(404).json({ message: 'System Design Subject not found' });
    }
    
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get System Design Topic by ID (with all content)
// @route   GET /api/interview/system-design/topic/:id
// @access  Private
const getSystemDesignTopic = async (req, res) => {
  try {
    const topic = await SystemDesignTopic.findById(req.params.id)
      .populate('notes')
      .populate('quiz');
      
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    const questions = await SystemDesignQuestion.find({ topicId: req.params.id });
    
    res.json({ topic, questions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user progress
// @route   GET /api/interview/system-design/progress
// @access  Private
const getProgress = async (req, res) => {
  console.log("req.user =", req.user);
console.log("session =", req.session);
  try {
    let progress = await SystemDesignProgress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await SystemDesignProgress.create({ userId: req.user._id });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update progress (mark topic complete)
// @route   POST /api/interview/system-design/progress
// @access  Private
const updateProgress = async (req, res) => {
  const { topicId } = req.body;
  
  try {
    let progress = await SystemDesignProgress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await SystemDesignProgress.create({ userId: req.user._id });
    }
    
    if (topicId && !progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
      await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit Quiz
// @route   POST /api/interview/system-design/quiz
// @access  Private
const submitQuiz = async (req, res) => {
  const { topicId, score } = req.body;
  
  try {
    let progress = await SystemDesignProgress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await SystemDesignProgress.create({ userId: req.user._id });
    }
    
    progress.quizScores.set(topicId.toString(), score);
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Toggle Bookmark
// @route   POST /api/interview/system-design/bookmark
// @access  Private
const toggleBookmark = async (req, res) => {
  const { type, itemId } = req.body; // type: 'question'
  
  try {
    let progress = await SystemDesignProgress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await SystemDesignProgress.create({ userId: req.user._id });
    }
    
    if (type === 'question') {
      const index = progress.bookmarkedQuestions.indexOf(itemId);
      if (index > -1) {
        progress.bookmarkedQuestions.splice(index, 1);
      } else {
        progress.bookmarkedQuestions.push(itemId);
      }
    }
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get Mock Interview Questions
// @route   GET /api/interview/system-design/mock-interview
// @access  Private
const getMockInterview = async (req, res) => {
  const { difficulty = 'Medium', count = 5 } = req.query;
  try {
    const questions = await SystemDesignQuestion.aggregate([
      { $match: { difficulty: difficulty } },
      { $sample: { size: parseInt(count) } }
    ]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Save Mock Interview Score
// @route   POST /api/interview/system-design/mock-interview/score
// @access  Private
const saveMockScore = async (req, res) => {
  const { score, difficulty } = req.body;
  try {
    let progress = await SystemDesignProgress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await SystemDesignProgress.create({ userId: req.user._id });
    }
    progress.mockInterviewScores.push({ score, difficulty });
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getSystemDesignSubject,
  getSystemDesignTopic,
  getProgress,
  updateProgress,
  submitQuiz,
  toggleBookmark,
  getMockInterview,
  saveMockScore
};
