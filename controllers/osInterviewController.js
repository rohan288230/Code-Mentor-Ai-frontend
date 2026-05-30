const OSSubject = require('../models/OSSubject');
const OSTopic = require('../models/OSTopic');
const OSNotes = require('../models/OSNotes');
const OSQuestion = require('../models/OSQuestion');
const OSQuiz = require('../models/OSQuiz');
const OSProgress = require('../models/OSProgress');

// Student APIs
exports.getSubject = async (req, res) => {
  try {
    const subject = await OSSubject.findOne();
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopics = async (req, res) => {
  try {
    const subject = await OSSubject.findOne();
    if (!subject) return res.status(404).json({ message: 'OS subject not found' });
    
    const topics = await OSTopic.find().sort('order');
    res.json({ subject, topics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopicDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await OSTopic.findById(id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    const notes = await OSNotes.findOne({ topicId: id });
    const questions = await OSQuestion.find({ topicId: id });
    const quiz = await OSQuiz.findOne({ topicId: id });

    res.json({ topic, notes, questions, quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    let progress = await OSProgress.findOne({ userId });
    if (!progress) {
      progress = await OSProgress.create({ userId });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markTopicCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topicId } = req.body;
    let progress = await OSProgress.findOne({ userId });
    if (!progress) {
      progress = new OSProgress({ userId, completedTopics: [topicId] });
    } else if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
    }
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const userId = req.user._id;
    const { quizId, score, passed } = req.body;
    
    let progress = await OSProgress.findOne({ userId });
    if (!progress) progress = new OSProgress({ userId });
    
    progress.quizScores.push({ quizId, score, passed });
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveMockInterviewResult = async (req, res) => {
  try {
    const userId = req.user._id;
    const { score, feedback } = req.body;
    let progress = await OSProgress.findOne({ userId });
    if (!progress) progress = new OSProgress({ userId });
    
    progress.mockInterviewScores.push({ score, feedback });
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMockQuestions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const questions = await OSQuestion.aggregate([{ $sample: { size: limit } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
