const express = require('express');
const { explainCode, optimizeCode, analyzeComplexity, generateHint } = require('../controllers/aiController');

const router = express.Router();

router.post('/explain', explainCode);
router.post('/optimize', optimizeCode);
router.post('/complexity', analyzeComplexity);
router.post('/hint', generateHint);

module.exports = router;
