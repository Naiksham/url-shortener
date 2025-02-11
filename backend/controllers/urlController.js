const Url = require('../models/Url');
const Analytics = require('../models/Analytics');
const { generateAlias } = require('../utils/generateAlias');
const client = require('../config/redis');

const shortenUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const alias = customAlias || generateAlias();
  const shortUrl = `${req.protocol}://${req.get('host')}/api/shorten/${alias}`;

  const url = new Url({ longUrl, shortUrl, customAlias: alias, topic, userId: req.user._id });
  await url.save();

  // Cache the URL in Redis
  client.set(alias, longUrl);

  res.status(201).json({ shortUrl, createdAt: url.createdAt });
};

const redirectUrl = async (req, res) => {
  const { alias } = req.params;

  // Check Redis cache first
  const cachedUrl = await client.get(alias);
  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }

  const url = await Url.findOne({ customAlias: alias });
  if (!url) return res.status(404).json({ error: 'URL not found' });

  // Log analytics
  const analytics = new Analytics({
    alias,
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
    geolocation: req.geo,
  });
  await analytics.save();

  res.redirect(url.longUrl);
};

module.exports = { shortenUrl, redirectUrl };