const { validationResult } = require('express-validator');
const { fetchPosts, fetchPost } = require('../services/posts');

exports.postList = async (req, res, next) => {
  try {
    const { author } = req.query;
    const posts = await fetchPosts(author);
    if (!posts) return res.json('Author does not exist');

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.postDetail = async (req, res, next) => {
  try {
    const post = await fetchPost(req.params.post);
    res.json(post);
  } catch (error) {
    next(error);
  }
};
