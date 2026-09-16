const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getMe,
  logout,
} = require('../controllers/authController');

const {
  validateRegister,
  validateLogin,
} = require('../middleware/validationMiddleware');

const { protect } = require('../middleware/authMiddleware');

// Public endpoints
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

// Protected endpoint
router.get('/me', protect, getMe);

module.exports = router;
