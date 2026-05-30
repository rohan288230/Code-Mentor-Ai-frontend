const GeminiService = require('../services/geminiService');

const handleAIApi = async (req, res, next, serviceMethod, type) => {
  try {
    const { code, problemDescription, language } = req.body;
    
    if (!code || !String(code).trim()) {
      return res.status(400).json({ success: false, error: 'Code is required for analysis.' });
    }

    const responseText = await GeminiService[serviceMethod](code, problemDescription, language);
    
    res.json({
      success: true,
      type: type,
      response: responseText
    });
  } catch (error) {
    if (error.message && error.message.includes('AI service not configured')) {
      return res.status(503).json({ success: false, error: 'AI service not configured. Check API Key.' });
    }
    next(error);
  }
};

const explainCode = (req, res, next) => handleAIApi(req, res, next, 'explainCode', 'explain');
const optimizeCode = (req, res, next) => handleAIApi(req, res, next, 'optimizeCode', 'optimize');
const analyzeComplexity = (req, res, next) => handleAIApi(req, res, next, 'analyzeComplexity', 'complexity');
const generateHint = (req, res, next) => handleAIApi(req, res, next, 'generateHint', 'hint');

module.exports = {
  explainCode,
  optimizeCode,
  analyzeComplexity,
  generateHint
};
