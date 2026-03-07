// middleware/authMiddleware.js — JWT verification for protected routes
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Accept token from Authorization header: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — no token provided',
    });
  }

  try {
    // Verify token signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (exclude password field)
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists',
      });
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired — please log in again' });
    }
    return res.status(401).json({ success: false, message: 'Not authorized — invalid token' });
  }
};

module.exports = { protect };
