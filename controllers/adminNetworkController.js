const NetworkSubject = require('../models/NetworkSubject');
const NetworkTopic = require('../models/NetworkTopic');
const NetworkNotes = require('../models/NetworkNotes');
const NetworkQuestion = require('../models/NetworkQuestion');
const NetworkQuiz = require('../models/NetworkQuiz');

// Subject (Usually only one for CN, but keeping it flexible)
exports.getSubject = async (req, res) => {
  try {
    let subject = await NetworkSubject.findOne();
    if (!subject) {
      subject = await NetworkSubject.create({
        title: 'Computer Networks Interview Preparation',
        description: 'Prepare for technical interviews by mastering Computer Networks concepts.',
        difficulty: 'Beginner to Advanced'
      });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Topics CRUD
exports.getTopics = async (req, res) => {
  try {
    const topics = await NetworkTopic.find().sort('order');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const topic = await NetworkTopic.create(req.body);
    // Push to subject
    let subject = await NetworkSubject.findOne();
    subject.topics.push(topic._id);
    await subject.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const topic = await NetworkTopic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const topic = await NetworkTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    await NetworkNotes.deleteOne({ topicId: topic._id });
    await NetworkQuiz.deleteOne({ topicId: topic._id });
    await NetworkQuestion.deleteMany({ topicId: topic._id });
    await topic.deleteOne();
    
    res.json({ message: 'Topic and related data deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Notes CRUD
exports.getNotes = async (req, res) => {
  try {
    const notes = await NetworkNotes.findOne({ topicId: req.params.topicId });
    res.json(notes || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveNotes = async (req, res) => {
  try {
    let notes = await NetworkNotes.findOne({ topicId: req.params.topicId });
    if (notes) {
      notes.content = req.body.content;
      notes.sections = req.body.sections;
      await notes.save();
    } else {
      notes = await NetworkNotes.create({ topicId: req.params.topicId, ...req.body });
      await NetworkTopic.findByIdAndUpdate(req.params.topicId, { notes: notes._id });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Questions CRUD
exports.getQuestions = async (req, res) => {
  try {
    const questions = await NetworkQuestion.find({ topicId: req.params.topicId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const question = await NetworkQuestion.create({ topicId: req.params.topicId, ...req.body });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await NetworkQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await NetworkQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quiz CRUD
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await NetworkQuiz.findOne({ topicId: req.params.topicId });
    res.json(quiz || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveQuiz = async (req, res) => {
  try {
    let quiz = await NetworkQuiz.findOne({ topicId: req.params.topicId });
    if (quiz) {
      quiz.title = req.body.title;
      quiz.passingScore = req.body.passingScore;
      quiz.questions = req.body.questions;
      await quiz.save();
    } else {
      quiz = await NetworkQuiz.create({ topicId: req.params.topicId, ...req.body });
      await NetworkTopic.findByIdAndUpdate(req.params.topicId, { quiz: quiz._id });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
