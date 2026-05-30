const Resume = require('../models/Resume');
const GeminiService = require('../services/geminiService');

const getMyResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    next(error);
  }
};

const createResume = async (req, res, next) => {
  try {
    const resume = new Resume({ ...req.body, user: req.user._id });
    const createdResume = await resume.save();
    res.status(201).json(createdResume);
  } catch (error) {
    next(error);
  }
};

const updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      res.status(404);
      throw new Error('Resume not found');
    }
    if (resume.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to edit this resume');
    }
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResume);
  } catch (error) {
    next(error);
  }
};

const analyzeResumeWithAI = async (req, res, next) => {
  try {
    const { resumeData, jobDescription } = req.body;
    const analysis = await GeminiService.analyzeATS(resumeData, jobDescription);
    res.json(analysis);
  } catch (error) {
    next(error);
  }
};

const generateSummary = async (req, res, next) => {
  try {
    const { resumeData } = req.body;
    const summary = await GeminiService.generateResumeSummary(resumeData);
    res.json({ summary });
  } catch (error) {
    next(error);
  }
};

const improveBullets = async (req, res, next) => {
  try {
    const { bulletPoints, role } = req.body;
    const improved = await GeminiService.improveBulletPoints(bulletPoints, role);
    res.json({ improvedBullets: improved });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyResumes, createResume, updateResume, analyzeResumeWithAI, generateSummary, improveBullets };
