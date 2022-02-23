const Post = require('../models/Post');
const User = require('../models/User');
const { body } = require('express-validator');

exports.fetchPosts = async (author) => {
  if (author) {
    let user = await User.findOne({ username: author }, { _id: 1 }).exec();
    if (!user) return;
    return await Post.find({ user_id: user._id })
      .sort({ created_at: -1 })
      .exec();
  }

  return await Post.find({}).exec();
};

exports.fetchPost = (postId) => Post.findOne({ _id: postId }).exec();

exports.createPost = async (user, postData) => {
  const post = new Post({
    user_id: user.id,
    created_at: new Date(),
    ...postData,
  });
  await post.save();
  await User.findOneAndUpdate(
    { _id: user.id },
    { $inc: { total_posts: 1 } },
  ).exec();
};

exports.updatePost = (post) => Post.updateOne({ _id: post._id }, post).exec();

exports.deletePost = async (id) => {
  const post = await Post.findOneAndDelete({ _id: id }).exec();
  if (!post) return { deletedCount: 0 };
  await User.updateOne(
    { _id: post.user_id },
    { $inc: { total_posts: -1 } },
  ).exec();
  return { deletedCount: 1 };
};

exports.validatePost = [
  body('body', 'Post required')
    .trim()
    .notEmpty()
    .isLength({ max: 2000 })
    .withMessage('Post too long'),
];
