const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    // Create user (password will be automatically hashed in pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT token for seamless authentication
    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Retrieve user including password hash for bcrypt comparison
    const user = await User.findOne({ email }).select('+password');

    // Return 401 with generic message to prevent user enumeration
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Verify candidate password with stored bcrypt hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate JWT
    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private (Requires valid JWT Bearer token)
 */
const getMe = async (req, res, next) => {
  try {
    // req.user is populated by the authMiddleware (protect)
    res.status(200).json({
      success: true,
      message: 'Authenticated user profile retrieved successfully.',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Logout user / invalidate client session
 * @route   POST /api/auth/logout
 * @access  Public
 */
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User logged out successfully. Client session destroyed.',
  });
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
