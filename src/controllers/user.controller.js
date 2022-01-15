const {
  fetchUsers,
  fetchUser,
  createUser,
  validateUser,
} = require('../services/users');
const { validationResult } = require('express-validator');

exports.userList = (req, res, next) => {
  fetchUsers()
    .then((users) => res.json(users))
    .catch((error) => next(error));
};

exports.userDetail = (req, res, next) => {
  fetchUser(req.params.user)
    .then((user) => res.json(user))
    .catch((error) => next(error));
};

exports.userCreate = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    try {
      const user = req.body;
      await createUser(user);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
];
