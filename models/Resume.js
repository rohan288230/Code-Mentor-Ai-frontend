const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  template: { 
    type: String, 
    enum: ['Modern Software Engineer', 'ATS Friendly', 'Creative Dark', 'Student Fresher', 'Corporate Professional'], 
    default: 'Modern Software Engineer' 
  },
  themeConfig: {
    themeColor: { type: String, default: '#3b82f6' }, // e.g. blue-500
    fontFamily: { type: String, default: 'Inter' }
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    linkedin: String,
    github: String,
    photoUrl: String
  },
  summary: String,
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: [String]
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String
  }],
  projects: [{
    name: String,
    technologies: [String],
    link: String,
    description: [String]
  }],
  skills: {
    languages: [String],
    frameworks: [String],
    tools: [String]
  },
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    link: String
  }],
  achievements: [String],
  atsScore: { type: Number, default: 0 },
  aiSuggestions: [String]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
