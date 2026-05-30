const DBMSSubject = require('../models/DBMSSubject');
const DBMSTopic = require('../models/DBMSTopic');
const DBMSNotes = require('../models/DBMSNotes');
const DBMSQuestion = require('../models/DBMSQuestion');
const DBMSQuiz = require('../models/DBMSQuiz');

// Get the main subject
exports.getSubject = async (req, res) => {
  try {
    let subject = await DBMSSubject.findOne();
    if (!subject) {
      subject = await DBMSSubject.create({
        title: 'Database Management System (DBMS)',
        description: 'Prepare for technical interviews by mastering Database Management System concepts.'
      });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await DBMSTopic.find().sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new topic
exports.createTopic = async (req, res) => {
  try {
    const topic = await DBMSTopic.create(req.body);
    // Add to subject
    await DBMSSubject.findByIdAndUpdate(req.body.subjectId, {
      $push: { topics: topic._id }
    });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a topic
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await DBMSTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    await DBMSNotes.findOneAndDelete({ topicId: topic._id });
    await DBMSQuestion.deleteMany({ topicId: topic._id });
    await DBMSQuiz.findOneAndDelete({ topicId: topic._id });
    
    await DBMSTopic.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Notes operations
exports.getNotes = async (req, res) => {
  try {
    const notes = await DBMSNotes.findOne({ topicId: req.params.topicId });
    res.json(notes || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.saveNotes = async (req, res) => {
  try {
    const { topicId } = req.params;
    let notes = await DBMSNotes.findOne({ topicId });
    
    if (notes) {
      notes.content = req.body.content;
      notes.sections = req.body.sections || [];
      await notes.save();
    } else {
      notes = await DBMSNotes.create({
        topicId,
        content: req.body.content,
        sections: req.body.sections || []
      });
      await DBMSTopic.findByIdAndUpdate(topicId, { notes: notes._id });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Questions operations
exports.getQuestions = async (req, res) => {
  try {
    const questions = await DBMSQuestion.find({ topicId: req.params.topicId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const question = await DBMSQuestion.create({
      ...req.body,
      topicId: req.params.topicId
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await DBMSQuestion.findByIdAndDelete(req.params.questionId);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Quiz operations
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await DBMSQuiz.findOne({ topicId: req.params.topicId });
    res.json(quiz || { questions: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.saveQuiz = async (req, res) => {
  try {
    const { topicId } = req.params;
    let quiz = await DBMSQuiz.findOne({ topicId });
    
    if (quiz) {
      quiz.title = req.body.title;
      quiz.passingScore = req.body.passingScore;
      quiz.questions = req.body.questions;
      await quiz.save();
    } else {
      quiz = await DBMSQuiz.create({
        topicId,
        title: req.body.title,
        passingScore: req.body.passingScore,
        questions: req.body.questions
      });
      await DBMSTopic.findByIdAndUpdate(topicId, { quiz: quiz._id });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
