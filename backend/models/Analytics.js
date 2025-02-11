const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  alias: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: { type: String },
  ipAddress: { type: String },
  geolocation: { type: String },
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);