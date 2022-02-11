const {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  fetchUserFeed,
  validateUserInput,
  fetchUserById,
  fetchUserFriends,
} = require('../services/users');
const { validationResult } = require('express-validator');
const { verifyAccessToken } = require('../services/auth');
const { verifyUser } = require('../services/auth');
const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.userList = (req, res, next) => {
  if (typeof req.query.id !== 'undefined') {
    fetchUserById(req.query.id)
      .then((user) => res.json(user ? user : 'User not found.'))
      .catch((error) => next(error));
  } else {
    fetchUsers()
      .then((users) => res.json(users))
      .catch((error) => next(error));
  }
};

exports.userDetail = (req, res, next) => {
  fetchUser(req.params.user)
    .then((user) => res.json(user ? user : 'User not found'))
    .catch((error) => next(error));
};

exports.userFeed = [
  verifyAccessToken,
  (req, res, next) =>
    fetchUserFeed(req.params.user)
      .then((feed) => res.json(feed ? feed : 'Something went wrong'))
      .catch((error) => next(error)),
];

exports.userFriends = (req, res, next) =>
  fetchUserFriends(req.params.user)
    .then((friends) => res.json(friends || 'Something went wrong'))
    .catch((error) => next(error));

exports.userCreate = [
  validateUserInput(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
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

// Get friend requests sent by and to an user
exports.userFriendRequests = [
  verifyAccessToken,
  verifyUser,
  async (req, res, next) => {
    try {
      const { user } = req;
      const friendRequests = await FriendRequest.find({
        $or: [{ from: user.id }, { to: user.id }],
      })
        .lean()
        .exec();

      for await (const request of friendRequests) {
        let userInfo;
        if (request.from.toString() === user.id) {
          userInfo = await User.findOne(
            { _id: request.to },
            { first_name: 1, last_name: 1, profile_pic: 1, _id: 0 },
          ).exec();
        } else {
          userInfo = await User.findOne(
            { _id: request.from },
            { first_name: 1, last_name: 1, profile_pic: 1, _id: 0 },
          ).exec();
        }
        request.user_info = userInfo;
      }
      res.json(friendRequests);
    } catch (error) {
      next(error);
    }
  },
];

exports.newFriend = [
  verifyAccessToken,
  verifyUser,
  async (req, res, next) => {
    try {
      const currentUser = req.params.user;
      const { friendId, requestId } = req.body;
      await User.findOneAndUpdate(
        { _id: currentUser },
        { $push: { friends: friendId } },
      ).exec();
      await User.findOneAndUpdate(
        { _id: friendId },
        { $push: { friends: currentUser } },
      ).exec();
      await FriendRequest.findOneAndDelete({ _id: requestId }).exec();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
];
