const SystemDesignSubject = require('../models/SystemDesignSubject.js');
const SystemDesignTopic = require('../models/SystemDesignTopic.js');
const SystemDesignNotes = require('../models/SystemDesignNotes.js');
const SystemDesignQuestion = require('../models/SystemDesignQuestion.js');
const SystemDesignQuiz = require('../models/SystemDesignQuiz.js');

// --- SUBJECT & TOPICS ---

const getSubject = async (req, res) => {
  try {
    let subject = await SystemDesignSubject.findOne({ title: 'System Design Interview Preparation' });
    if (!subject) {
      subject = await SystemDesignSubject.create({
        title: 'System Design Interview Preparation',
        description: 'Prepare for software engineering interviews by mastering System Design concepts from beginner to advanced level.'
      });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTopics = async (req, res) => {
  try {
    const topics = await SystemDesignTopic.find().sort('order');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTopic = async (req, res) => {
  try {
    const { title, subjectId, order, description, estimatedDuration, difficulty } = req.body;
    
    const topic = await SystemDesignTopic.create({
      title,
      subjectId,
      order,
      description,
      estimatedDuration,
      difficulty
    });
    
    // Add to subject
    await SystemDesignSubject.findByIdAndUpdate(subjectId, {
      $push: { topics: topic._id }
    });
    
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const topic = await SystemDesignTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    // Delete associated notes, quiz, and questions
    if (topic.notes) await SystemDesignNotes.findByIdAndDelete(topic.notes);
    if (topic.quiz) await SystemDesignQuiz.findByIdAndDelete(topic.quiz);
    await SystemDesignQuestion.deleteMany({ topicId: topic._id });
    
    // Remove from subject
    await SystemDesignSubject.findByIdAndUpdate(topic.subjectId, {
      $pull: { topics: topic._id }
    });
    
    await topic.deleteOne();
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- NOTES ---

const getTopicNotes = async (req, res) => {
  try {
    const topic = await SystemDesignTopic.findById(req.params.topicId).populate('notes');
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    if (topic.notes) {
      return res.json(topic.notes);
    }
    res.json({ content: '', sections: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTopicNotes = async (req, res) => {
  try {
    const { content, sections } = req.body;
    const topic = await SystemDesignTopic.findById(req.params.topicId);
    
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    if (topic.notes) {
      const updated = await SystemDesignNotes.findByIdAndUpdate(
        topic.notes,
        { content, sections },
        { new: true }
      );
      return res.json(updated);
    } else {
      const newNotes = await SystemDesignNotes.create({
        topicId: topic._id,
        content,
        sections
      });
      topic.notes = newNotes._id;
      await topic.save();
      return res.status(201).json(newNotes);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- QUESTIONS ---

const getTopicQuestions = async (req, res) => {
  try {
    const questions = await SystemDesignQuestion.find({ topicId: req.params.topicId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createQuestion = async (req, res) => {
  try {
    const { question, answer, difficulty, companyTags } = req.body;
    const newQuestion = await SystemDesignQuestion.create({
      topicId: req.params.topicId,
      question,
      answer,
      difficulty,
      companyTags
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const updated = await SystemDesignQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    await SystemDesignQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- QUIZ ---

const getTopicQuiz = async (req, res) => {
  try {
    const topic = await SystemDesignTopic.findById(req.params.topicId).populate('quiz');
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    if (topic.quiz) {
      return res.json(topic.quiz);
    }
    res.json({ title: 'Topic Quiz', passingScore: 70, questions: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTopicQuiz = async (req, res) => {
  try {
    const { title, passingScore, questions } = req.body;
    const topic = await SystemDesignTopic.findById(req.params.topicId);
    
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    if (topic.quiz) {
      const updated = await SystemDesignQuiz.findByIdAndUpdate(
        topic.quiz,
        { title, passingScore, questions },
        { new: true }
      );
      return res.json(updated);
    } else {
      const newQuiz = await SystemDesignQuiz.create({
        topicId: topic._id,
        title,
        passingScore,
        questions
      });
      topic.quiz = newQuiz._id;
      await topic.save();
      return res.status(201).json(newQuiz);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getSubject,
  getTopics,
  createTopic,
  deleteTopic,
  getTopicNotes,
  updateTopicNotes,
  getTopicQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getTopicQuiz,
  updateTopicQuiz
};
