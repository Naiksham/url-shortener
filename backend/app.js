require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shorten', urlRoutes);

// Database Connection
connectDB();
process.on('warning', (warning) => {
    if (warning.name !== 'DeprecationWarning') {
      console.warn(warning);
    }
  });

module.exports = app;