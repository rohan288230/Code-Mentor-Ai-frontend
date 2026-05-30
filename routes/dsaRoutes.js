const express = require('express');
const {
  getProblems,
  getProblemById,
  runCode,
  submitCode,
  getSubmissions,
  getSubmissionById,
  getSavedCode,
  saveCode,
} = require('../controllers/dsaController');
const { validateRequest } = require('../middleware/validationMiddleware');
const { runValidation, submitValidation } = require('../validations/dsaValidations');

const router = express.Router();

router.get('/', getProblems);
router.get('/submissions', getSubmissions);
router.get('/submissions/:id', getSubmissionById);
router.get('/saved-code', getSavedCode);
router.get('/:id', getProblemById);
router.post('/run', runValidation, validateRequest, runCode);
router.post('/submit', submitValidation, validateRequest, submitCode);
router.post('/save-code', saveCode);

module.exports = router;
