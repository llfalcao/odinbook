const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.fetchComments = async (postId) =>
  await Comment.find({ post_id: postId }).exec();

exports.createComment = async (postId, userId, text) => {
  const post = await Post.findOne({ _id: postId }).exec();
  if (!post) {
    const error = new Error('Post not found.');
    error.kind = 'ObjectId';
    throw error;
  }

  const comment = new Comment({
    post_id: postId,
    user_id: userId,
    body: text,
    created_at: new Date(),
  });
  await comment.save();
};
