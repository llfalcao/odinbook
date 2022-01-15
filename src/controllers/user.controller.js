const {
  fetchUsers,
  fetchUser,
  createUser,
  validateUser,
  updateUser,
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
  validateUser(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    try {
      const userData = req.body;
      await createUser(userData);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
];

// TODO: Validate
exports.userUpdate = [
  async (req, res, next) => {
    try {
      const inputFields = Object.keys(req.body);
      validateUser(inputFields);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(errors);
      }

      const { user: userId } = req.params;
      const { body: userData } = req;
      await updateUser(userId, userData);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
];
