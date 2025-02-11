const express = require('express');
const { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get analytics for a specific short URL
router.get('/:alias', authMiddleware, getUrlAnalytics);

// Get analytics for all URLs under a specific topic
router.get('/topic/:topic', authMiddleware, getTopicAnalytics);

// Get overall analytics for all URLs created by the user
router.get('/overall', authMiddleware, getOverallAnalytics);

module.exports = router;