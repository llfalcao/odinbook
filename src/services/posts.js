const Post = require('../models/Post');
const User = require('../models/User');
const { body } = require('express-validator');

exports.fetchPosts = async (author) => {
  if (author) {
    let user = await User.findOne(
      { username: author },
      { _id: 1 },
    ).exec();

    if (!user) return;
    return await Post.find({ user_id: user._id }).exec();
  }

  return await Post.find({}).exec();
};

exports.fetchPost = (postId) => Post.findOne({ _id: postId }).exec();

// todo: link author
exports.createPost = async (postData) => {
  const post = new Post({ ...postData, created_at: new Date() });
  await post.save();
};

exports.updatePost = (id, post) =>
  Post.updateOne({ _id: id }, post).exec();

exports.deletePost = (id) => Post.deleteOne({ _id: id }).exec();

exports.validatePost = [
  body('body', 'Post required')
    .trim()
    .notEmpty()
    .isLength({ max: 2000 })
    .withMessage('Post too long'),
];
