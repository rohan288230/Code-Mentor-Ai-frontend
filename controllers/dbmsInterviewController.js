const DBMSSubject = require('../models/DBMSSubject');
const DBMSTopic = require('../models/DBMSTopic');
const DBMSNotes = require('../models/DBMSNotes');
const DBMSQuestion = require('../models/DBMSQuestion');
const DBMSQuiz = require('../models/DBMSQuiz');
const DBMSProgress = require('../models/DBMSProgress');

// Get all topics for the DBMS syllabus
exports.getTopics = async (req, res) => {
  try {
    const subject = await DBMSSubject.findOne();
    if (!subject) return res.status(404).json({ message: 'DBMS subject not found' });
    
    const topics = await DBMSTopic.find({ subjectId: subject._id }).sort({ order: 1 });
    res.json({ subject, topics });
  } catch (error) {
    console.error('Error fetching DBMS topics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get specific topic details including notes, questions, and quiz
exports.getTopicDetails = async (req, res) => {
  try {
    const topic = await DBMSTopic.findById(req.params.id)
      .populate('notes')
      .populate('quiz');
      
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    const questions = await DBMSQuestion.find({ topicId: topic._id });
    
    res.json({ topic, questions });
  } catch (error) {
    console.error('Error fetching DBMS topic details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user progress
exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    let progress = await DBMSProgress.findOne({ userId });
    
    if (!progress) {
      progress = await DBMSProgress.create({ userId });
    }
    
    res.json(progress);
  } catch (error) {
    console.error('Error fetching DBMS progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark topic as complete / submit quiz
exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId } = req.body;
    
    let progress = await DBMSProgress.findOne({ userId });
    if (!progress) {
      progress = new DBMSProgress({ userId });
    }
    
    if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
      await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    console.error('Error updating DBMS progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit quiz score
exports.submitQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId, score } = req.body;
    
    let progress = await DBMSProgress.findOne({ userId });
    if (!progress) {
      progress = new DBMSProgress({ userId });
    }
    
    progress.quizScores.set(topicId, score);
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    console.error('Error submitting DBMS quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle bookmark on a question
exports.toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, itemId } = req.body; // type can be 'question'
    
    let progress = await DBMSProgress.findOne({ userId });
    if (!progress) {
      progress = new DBMSProgress({ userId });
    }
    
    if (type === 'question') {
      const index = progress.bookmarkedQuestions.indexOf(itemId);
      if (index === -1) {
        progress.bookmarkedQuestions.push(itemId);
      } else {
        progress.bookmarkedQuestions.splice(index, 1);
      }
    }
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    console.error('Error toggling DBMS bookmark:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Generate a mock interview session
exports.getMockInterview = async (req, res) => {
  try {
    const { difficulty, count = 3 } = req.query;
    
    // Simple random selection
    const questions = await DBMSQuestion.aggregate([
      { $match: difficulty ? { difficulty } : {} },
      { $sample: { size: parseInt(count) } }
    ]);
    
    res.json(questions);
  } catch (error) {
    console.error('Error generating mock interview:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save mock interview score
exports.submitMockInterviewScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score, difficulty } = req.body;
    
    let progress = await DBMSProgress.findOne({ userId });
    if (!progress) {
      progress = new DBMSProgress({ userId });
    }
    
    progress.mockInterviewScores.push({ score, difficulty, date: new Date() });
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    console.error('Error saving mock interview score:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
