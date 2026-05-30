const User = require('../models/User');

const protect = async (req, res, next) => {
  let userId = req.session.userId;

  if (userId) {
    try {
      req.user = await User.findById(userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      next(new Error('Not authorized, user not found'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no session'));
  }
};
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    next(new Error('Not authorized as an admin'));
  }
};

module.exports = { protect, admin };
