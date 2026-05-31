const express = require('express');
const { validateRequest } = require('../middleware/validationMiddleware');
const { registerValidation, loginValidation } = require('../validations/authValidations');
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.post('/logout', protect, logoutUser);
// router.get('/profile', protect, getUserProfile);
router.get('/profile', getUserProfile);

module.exports = router;
