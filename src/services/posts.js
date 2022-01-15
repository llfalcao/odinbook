const Post = require('../models/Post');
const User = require('../models/User');

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
