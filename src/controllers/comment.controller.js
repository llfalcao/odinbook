const { body, validationResult } = require('express-validator');
const { verifyAccessToken } = require('../services/auth');
const { fetchComments, createComment } = require('../services/comments');

exports.commentList = async (req, res, next) => {
  try {
    const { post } = req.query;
    const comments = await fetchComments(post);
    res.json(comments);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json('Invalid post ID format.');
    }
    next(error);
  }
};

exports.commentCreate = [
  verifyAccessToken,
  body('post', 'Post ID must not be empty.').trim().notEmpty(),
  body('text', 'Empty comment not allowed.').trim().notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { post, text } = req.body;
      await createComment(post, req.user.id, text);
      res.json();
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json('Post does not exist.');
      }
      next(error);
    }
  },
];
