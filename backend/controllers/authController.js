const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { sub, email, name } = ticket.getPayload();

  let user = await User.findOne({ googleId: sub });
  if (!user) {
    user = new User({ googleId: sub, email, name });
    await user.save();
  }

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ user, token: jwtToken });
};

module.exports = { registerUser };