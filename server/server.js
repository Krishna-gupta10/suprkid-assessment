const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

dotenv.config();
const app = express();

// Database Connection
mongoose.connect("mongodb://localhost:27017/taskify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes
app.use('/auth', authRoutes);  // Authentication routes
app.use('/tasks', taskRoutes); // Task routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal error occurred" });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
