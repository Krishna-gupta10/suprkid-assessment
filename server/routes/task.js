const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.userId = decoded.userId; // Attach userId to the request object
      next();
    });
  };
  

// Get tasks for logged-in user
router.get('/', verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json({ tasks });
});

// Create task for logged-in user
router.post('/', verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, userId: req.userId });
  await task.save();
  res.status(201).json({ task });
});

module.exports = router;
