const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(400);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err || user.id !== req.params.user) {
      return res.sendStatus(403);
    }
    next();
  });
};

const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(404).json({
        errors: { username: 'Username not found.' },
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        errors: { password: "The password you've entered is incorrect." },
      });
    }

    user = { id: user._id, username: user.username };
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyAccessToken,
  verifyUser,
  login,
};
