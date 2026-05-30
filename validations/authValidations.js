const { body } = require('express-validator');

const registerValidation = [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
];

module.exports = {
  registerValidation,
  loginValidation
};
