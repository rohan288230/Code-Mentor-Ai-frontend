const AuthService = require('../services/authService');
const ActivityService = require('../services/activityService');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthService.registerUser(name, email, password);

    req.session.userId = user._id;
    req.session.userRole = user.role;
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    if (error.message === 'User already exists' || error.message === 'Invalid user data') {
      res.status(400);
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    console.log("LOGIN CONTROLLER HIT");
    const { email, password, rememberMe } = req.body;
    const user = await AuthService.loginUser(email, password);

    req.session.userId = user._id;
    req.session.userRole = user.role;

    if (rememberMe) {
      // Set to 30 days
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      // Default browser session or 1 day depending on server config
      req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    }
    
    await ActivityService.updateStreak(user._id);
    console.log("RETURNING USER");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      res.status(401);
    }
    next(error);
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out.' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};

const getUserProfile = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.status(401);
      throw new Error('Not authorized, no session');
    }
    await ActivityService.updateStreak(req.session.userId);
    const user = await AuthService.getUserById(req.session.userId);
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404);
    }
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile };
