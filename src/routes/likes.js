const { Router } = require('express');
const Like = require('../models/Like');
const { verifyAccessToken, verifyUser } = require('../services/auth');
const router = Router();

router.get('/:post', async (req, res, next) => {
  const post = req.params.post;
  try {
    const likes = await Like.find({ post_id: post }).exec();
    res.json(likes);
  } catch (error) {
    next(error);
  }
});

router.post('/:post', [
  verifyAccessToken,
  async (req, res, next) => {
    try {
      const { user } = req;
      const { post } = req.params;
      const { active } = req.body;

      if (!active) {
        await Like.deleteOne({ post_id: post, user_id: user.id }).exec();
        return res.sendStatus(204);
      }

      await Like.updateOne(
        { post_id: post, user_id: user.id },
        {},
        { upsert: true },
      ).exec();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
]);

module.exports = router;
