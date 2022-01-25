const { validationResult } = require('express-validator');
const { verifyAccessToken } = require('../services/auth');
const {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  validatePost,
} = require('../services/posts');

exports.postList = async (req, res, next) => {
  try {
    const { author } = req.query;
    const posts = await fetchPosts(author);
    res.json(posts ? posts : 'Author does not exist');
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

exports.postCreate = [
  verifyAccessToken,
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    try {
      await createPost(req.user, req.body);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
];

// todo: auth
exports.postUpdate = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    try {
      const { post: id } = req.params;
      const { body: post } = req;
      const result = await updatePost(id, post);
      if (result.matchedCount === 0) {
        return res.json('Post not found');
      }

      res.sendStatus(200);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        res.json('Post not found');
      } else {
        next(error);
      }
    }
  },
];

// todo: auth
exports.postDelete = async (req, res, next) => {
  try {
    const { post } = req.params;
    const result = await deletePost(post);

    if (result.deletedCount === 0) {
      res.json('Post not found');
    }

    res.sendStatus(200);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.json('Post not found');
    } else {
      next(error);
    }
  }
};
