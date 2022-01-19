const {
  fetchUsers,
  fetchUser,
  createUser,
  deleteUser,
  validateUserInput,
  updateUser,
} = require('../services/users');
const { validationResult } = require('express-validator');
const { verifyAccessToken } = require('../services/auth');
const { verifyUser } = require('../services/auth');

exports.userList = (req, res, next) => {
  fetchUsers()
    .then((users) => res.json(users))
    .catch((error) => next(error));
};

exports.userDetail = (req, res, next) => {
  fetchUser(req.params.user)
    .then((user) => res.json(user ? user : 'User not found'))
    .catch((error) => next(error));
};

exports.userCreate = [
  validateUserInput(),
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

exports.userUpdate = [
  verifyAccessToken,
  verifyUser,
  async (req, res, next) => {
    const inputFields = Object.keys(req.body);
    validateUserInput(inputFields);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    try {
      const { user: userId } = req.params;
      const { body: userData } = req;
      const result = await updateUser(userId, userData);
      if (!result) {
        return res.json('User not found');
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
];

exports.userDelete = [
  verifyAccessToken,
  verifyUser,
  async (req, res, next) => {
    try {
      const { user } = req.params;
      const result = await deleteUser(user);

      if (result.deletedCount === 0) {
        res.json('User not found');
      }

      res.sendStatus(200);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.json('User not found');
      } else {
        next(error);
      }
    }
  },
];
