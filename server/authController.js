// authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task'); // Assuming a Task model

const login = async (req, res) => {
  const { email, password } = req.body;
  // Validate user credentials (use bcrypt to compare password)
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Get tasks from the database
  const tasks = await Task.find({ userId: user._id });

  res.json({
    token,
    tasks,
  });
};

module.exports = { login };
