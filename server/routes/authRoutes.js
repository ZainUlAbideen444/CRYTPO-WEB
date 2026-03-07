// routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 characters'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginRules = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerRules, register);

// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginRules, login);

// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, getMe);

module.exports = router;
