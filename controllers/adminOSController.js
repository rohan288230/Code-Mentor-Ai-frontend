const OSSubject = require('../models/OSSubject');
const OSTopic = require('../models/OSTopic');
const OSNotes = require('../models/OSNotes');
const OSQuestion = require('../models/OSQuestion');
const OSQuiz = require('../models/OSQuiz');

// Admin CRUD APIs
exports.getSubject = async (req, res) => {
  try {
    let subject = await OSSubject.findOne();
    if (!subject) {
      subject = await OSSubject.create({
        title: 'Operating System Interview Preparation',
        description: 'Prepare for technical interviews by mastering OS concepts from beginner to advanced level.',
        difficulty: 'Intermediate'
      });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopics = async (req, res) => {
  try {
    const topics = await OSTopic.find().sort('order').lean();
    for (let topic of topics) {
      topic.notes = !!await OSNotes.findOne({ topicId: topic._id });
      topic.quiz = !!await OSQuiz.findOne({ topicId: topic._id });
    }
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const { subjectId, title, description, order, estimatedDuration, difficulty } = req.body;
    const topic = await OSTopic.create({ subjectId, title, description, order, estimatedDuration, difficulty });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await OSTopic.findByIdAndDelete(id);
    await OSNotes.deleteMany({ topicId: id });
    await OSQuestion.deleteMany({ topicId: id });
    await OSQuiz.deleteMany({ topicId: id });
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { topicId } = req.params;
    let notes = await OSNotes.findOne({ topicId });
    if (!notes) {
      notes = { topicId, content: '', sections: [] };
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveNotes = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { content, sections } = req.body;
    let notes = await OSNotes.findOne({ topicId });
    if (notes) {
      notes.content = content;
      notes.sections = sections;
      await notes.save();
    } else {
      notes = await OSNotes.create({ topicId, content, sections });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const { topicId } = req.params;
    const questions = await OSQuestion.find({ topicId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { topicId } = req.params;
    const question = await OSQuestion.create({ ...req.body, topicId });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await OSQuestion.findByIdAndDelete(id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const { topicId } = req.params;
    let quiz = await OSQuiz.findOne({ topicId });
    if (!quiz) {
      quiz = { topicId, title: 'Topic Quiz', passingScore: 70, questions: [] };
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveQuiz = async (req, res) => {
  try {
    const { topicId } = req.params;
    let quiz = await OSQuiz.findOne({ topicId });
    if (quiz) {
      quiz.title = req.body.title;
      quiz.passingScore = req.body.passingScore;
      quiz.questions = req.body.questions;
      await quiz.save();
    } else {
      quiz = await OSQuiz.create({ ...req.body, topicId });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
