const User = require('../models/User');
require('../models/Post');
const { body } = require('express-validator');

const fetchUsers = () =>
  User.find({}, { password: 0 }).populate('posts').populate('friends').exec();

const fetchUser = (username) =>
  User.findOne({ username }, { password: 0 })
    .populate('posts')
    .populate('friends')
    .exec();

// TODO: bcrypt
const createUser = async (userData) => {
  const user = new User({ ...userData, created_at: new Date() });
  await user.save();
};

const updateUser = async (userId, userData) => {
  await User.findById(userId);
  await User.updateOne({ _id: userId }, userData).exec();
};

const validateUser = (fields) => {
  const validations = {
    username: body('username', 'Username required')
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

    password: body('password', 'Password required')
      .isLength({ min: 8 })
      .withMessage('Password is too short'),

    confirmPassword: body('confirm_password').custom(
      (passwordConfirmation, { req }) => {
        if (passwordConfirmation !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      },
    ),

    firstName: body('first_name', 'First name required').trim().notEmpty(),

    lastName: body('last_name', 'Last name required').trim().notEmpty(),

    dateOfBirth: body('date_of_birth', 'Date of birth required')
      .trim()
      .notEmpty(),

    country: body('location.country', 'Country required').trim().notEmpty(),
  };

  // Validate all fields (usually on user creation)
  if (!fields) {
    return [Object.values(validations)];
  }

  // Validate only the fields displayed on the current page
  if (fields) {
    const filteredFields = Object.keys(validations)
      .filter((key) => fields.includes(key))
      .reduce((arr, key) => arr.concat(validations[key]), []);

    return filteredFields;
  }
};

module.exports = {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  validateUser,
};
