const {
  fetchUsers,
  fetchUser,
  createUser,
} = require('../services/users');

exports.userList = async (req, res) => {
  const users = await fetchUsers();
  res.status(200).json(users);
};
