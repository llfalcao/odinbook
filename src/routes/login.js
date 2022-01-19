const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../services/auth');
const { fetchUser } = require('../services/users');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res, next) => {
  try {
    let user = await fetchUser(req.body.username);
    if (!user) res.sendStatus(404);

    const hash = await bcrypt.hash(req.body.password, 10);
    user = { id: user._id, username: user.username, password: hash };

    const accessToken = generateAccessToken(user);
    res.locals.accessToken = accessToken;
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
