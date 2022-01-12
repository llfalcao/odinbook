const User = require('../models/User');

const fetchUsers = () =>
  User.find({})
    .populate('posts')
    .populate('friends')
    .exec();

const fetchUser = (id) =>
  User.findById(id)
    .populate('posts')
    .populate('friends')
    .exec();

const createUser = (user) => new User(user).save();

module.exports = {
  fetchUsers,
  fetchUser,
  createUser,
};
