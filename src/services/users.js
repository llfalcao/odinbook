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

const createUser = ({ username, password }) => {
  const user = new User({
    username,
    password,
  });
  return user.save();
};

module.exports = {
  fetchUsers,
  fetchUser,
  createUser,
};
