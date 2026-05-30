const NetworkSubject = require('../models/NetworkSubject');
const NetworkTopic = require('../models/NetworkTopic');
const NetworkNotes = require('../models/NetworkNotes');
const NetworkQuestion = require('../models/NetworkQuestion');
const NetworkQuiz = require('../models/NetworkQuiz');
const NetworkProgress = require('../models/NetworkProgress');

// Get the main CN subject (which contains topics)
exports.getNetworkSubject = async (req, res) => {
  try {
    const subject = await NetworkSubject.findOne().populate('topics');
    if (!subject) return res.status(404).json({ message: 'Computer Networks subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all topics (basic info)
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await NetworkTopic.find().sort('order');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific topic fully loaded with notes, quiz, questions
exports.getTopicDetails = async (req, res) => {
  try {
    const topic = await NetworkTopic.findById(req.params.id)
      .populate('notes')
      .populate('quiz');
      
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    // fetch related questions
    const questions = await NetworkQuestion.find({ topicId: topic._id });

    res.json({ topic, questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user progress
exports.getUserProgress = async (req, res) => {
  try {
    let progress = await NetworkProgress.findOne({ userId: req.user._id });
    if (!progress) {
      progress = await NetworkProgress.create({ userId: req.user._id });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update progress (mark topic complete)
exports.updateProgress = async (req, res) => {
  try {
    const { topicId } = req.body;
    let progress = await NetworkProgress.findOne({ userId: req.user._id });
    if (!progress) progress = new NetworkProgress({ userId: req.user._id });

    if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
    }
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit Quiz
exports.submitQuiz = async (req, res) => {
  try {
    const { topicId, score } = req.body;
    let progress = await NetworkProgress.findOne({ userId: req.user._id });
    if (!progress) progress = new NetworkProgress({ userId: req.user._id });

    progress.quizScores.set(topicId.toString(), score);
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle Bookmark
exports.toggleBookmark = async (req, res) => {
  try {
    const { type, itemId } = req.body; // type = 'note' or 'question'
    let progress = await NetworkProgress.findOne({ userId: req.user._id });
    if (!progress) progress = new NetworkProgress({ userId: req.user._id });

    if (type === 'note') {
      const idx = progress.bookmarkedNotes.indexOf(itemId);
      if (idx > -1) progress.bookmarkedNotes.splice(idx, 1);
      else progress.bookmarkedNotes.push(itemId);
    } else if (type === 'question') {
      const idx = progress.bookmarkedQuestions.indexOf(itemId);
      if (idx > -1) progress.bookmarkedQuestions.splice(idx, 1);
      else progress.bookmarkedQuestions.push(itemId);
    }
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Mock Interview Questions (randomized)
exports.getMockInterview = async (req, res) => {
  try {
    const { difficulty, count = 10 } = req.query;
    let filter = {};
    if (difficulty) {
      if (difficulty === 'Beginner') filter.difficulty = 'Easy';
      else if (difficulty === 'Intermediate') filter.difficulty = 'Medium';
      else if (difficulty === 'Advanced') filter.difficulty = { $in: ['Advanced', 'Scenario'] };
    }
    
    const questions = await NetworkQuestion.aggregate([
      { $match: filter },
      { $sample: { size: parseInt(count) } }
    ]);
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save Mock Interview Score
exports.saveMockInterviewScore = async (req, res) => {
  try {
    const { score, difficulty } = req.body;
    let progress = await NetworkProgress.findOne({ userId: req.user._id });
    if (!progress) progress = new NetworkProgress({ userId: req.user._id });

    progress.mockInterviewScores.push({ score, difficulty });
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
