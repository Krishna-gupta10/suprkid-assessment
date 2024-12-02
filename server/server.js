const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

dotenv.config();
const app = express();

mongoose.connect("mongodb://localhost:27017/taskify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); // Body parser

app.use('/auth', authRoutes);  // Authentication routes
app.use('/tasks', taskRoutes); // Task routes

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
