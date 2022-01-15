const { fetchUsers, fetchUser, createUser } = require('../services/users');

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
