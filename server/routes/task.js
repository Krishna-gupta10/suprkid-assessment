const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, "your_jwt_secret_key", (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.userId = decoded.userId; // Attach userId to the request object
        console.log("Decoded Token:", decoded); // Log decoded token for debugging
        next();
    });
};

router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId }); 
        res.json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description, userId: req.userId });
        await task.save();
        res.status(201).json({ task });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ message: "Failed to create task" });
    }
});

module.exports = router;
