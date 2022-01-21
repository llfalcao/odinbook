const { login } = require('../services/auth');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const router = Router();

router.post('/', [
  body('username').notEmpty(),
  body('password').notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }
    next();
  },
  login,
]);

module.exports = router;
