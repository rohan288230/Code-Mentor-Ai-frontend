const { body } = require('express-validator');

const SUPPORTED_LANGS = ['python', 'java', 'cpp', 'c'];

const codeBodyRules = [
  body('language')
    .trim()
    .isIn(SUPPORTED_LANGS)
    .withMessage('language must be python, java, cpp, or c'),
  body('code')
    .isString()
    .withMessage('code is required')
    .isLength({ min: 1, max: 100_000 })
    .withMessage('code must be between 1 and 100000 characters'),
];

const runValidation = [
  ...codeBodyRules,
  body('stdin').optional().isString().withMessage('stdin must be a string'),
];

const submitValidation = [
  ...codeBodyRules,
  body('problemId')
    .notEmpty()
    .withMessage('problemId is required')
    .isMongoId()
    .withMessage('problemId must be a valid id'),
];

module.exports = { runValidation, submitValidation, SUPPORTED_LANGS };
