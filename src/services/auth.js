const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

exports.verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(400);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) res.sendStatus(403);
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err || user.id !== req.params.user) {
      return res.sendStatus(403);
    }
    next();
  });
};
