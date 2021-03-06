const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../models/User');
const Post = require('../models/Post');
require('../models/Post');

exports.fetchUsers = () => User.find({}, { password: 0 }).exec();

exports.fetchUser = (username) =>
  User.findOne({ username }, { password: 0 }).exec();

exports.fetchUserById = (userId) =>
  User.findById(userId, { password: 0 }).exec();

exports.createUser = async (userData) => {
  const hash = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hash,
    created_at: new Date(),
  });
  await user.save();
};

exports.updateUser = async (userId, userData) => {
  const user = await User.findById(userId).exec();
  if (!user) return false;
  return await User.updateOne({ _id: userId }, userData).exec();
};

exports.deleteUser = async (userId) =>
  await User.deleteOne({ _id: userId }).exec();

exports.fetchUserFeed = async (username) => {
  const user = await User.findOne({ username }, { friends: 1 }).exec();
  const connections = [user._id, ...user.friends];
  const feed = await Post.find({ user_id: { $in: connections } })
    .populate({
      path: 'user_id',
      select: 'first_name last_name profile_pic username',
    })
    .sort({ created_at: -1 })
    .exec();
  return feed;
};

exports.fetchUserFriends = async (username) => {
  try {
    const user = await User.findOne({ username }, { friends: 1 }).exec();
    if (!user) throw new Error('User not found');

    const friendlist = await User.find(
      { _id: { $in: user.friends } },
      { first_name: 1, last_name: 1, profile_pic: 1, username: 1 },
    ).exec();
    return friendlist;
  } catch (error) {
    throw error;
  }
};

exports.validateUserInput = (fields) => {
  const validations = {
    username: body('username', 'Username required')
      .trim()
      .isLength({ min: 3, max: 20 })
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
      .isLength({ min: 8, max: 128 })
      .withMessage('Password is too short'),

    confirmPassword: body('password_confirmation').custom(
      (passwordConfirmation, { req }) => {
        if (passwordConfirmation !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      },
    ),

    firstName: body('first_name', 'First name required')
      .trim()
      .notEmpty()
      .isLength({ max: 50 }),

    lastName: body('last_name', 'Last name required')
      .trim()
      .notEmpty()
      .isLength({ max: 50 }),

    dateOfBirth: body('date_of_birth', 'Date of birth required')
      .trim()
      .notEmpty()
      .custom((value) => {
        const now = moment();
        const age = now.diff(moment(value), 'years');
        if (age < 13) {
          throw new Error('You must be at least 13 years old to sign up.');
        }
        return true;
      }),

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
