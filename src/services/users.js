const User = require('../models/User');
require('../models/Post');
const { body } = require('express-validator');

const fetchUsers = () =>
  User.find({}).populate('posts').populate('friends').exec();

const fetchUser = (id) =>
  User.findById(id).populate('posts').populate('friends').exec();

const createUser = (user) => {
  user.created_at = new Date();
  const newUser = new User(user);
  console.log(newUser);
  return newUser.save();
};

const validateUser = [
  body('username', 'Username required')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username is too short')
    .custom(async (username) => {
      if (!username.match(/^[A-Za-z0-9]+$/)) {
        throw new Error('Username must not contain special characters');
      }
      const isMatch = await User.findOne({ username }).exec();
      if (isMatch) throw new Error('Username unavailable');

      return true;
    }),

  body('password', 'Password required')
    .isLength({ min: 8 })
    .withMessage('Password is too short'),

  body('confirm_password').custom((passwordConfirmation, { req }) => {
    if (passwordConfirmation !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  body('first_name', 'First name required').trim().notEmpty(),
  body('last_name', 'Last name required').trim().notEmpty(),
  body('date_of_birth', 'Date of birth required').trim().notEmpty(),
  body('location.country', 'Country required').trim().notEmpty(),
];

module.exports = {
  fetchUsers,
  fetchUser,
  createUser,
  validateUser,
};
