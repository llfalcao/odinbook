const { login } = require('../services/auth');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const router = Router();

router.post('/', [
  body('username', 'Username required').trim().notEmpty(),
  body('password', 'Password required').notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
  login,
]);

module.exports = router;
