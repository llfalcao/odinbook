const router = require('express').Router();
const loginRouter = require('./login');
const userRouter = require('./users');
const postRouter = require('./posts');
const likeRouter = require('./likes.js');
const commentRouter = require('./comments.js');
const { verifyAccessToken } = require('../services/auth');
const { fetchUser } = require('../services/users');

router.get('/', (req, res) => res.json('Odinbook'));
router.get('/auth', verifyAccessToken, async (req, res, next) => {
  const { username } = req.user;
  const user = await fetchUser(username);
  res.json(user);
});
router.get('/api', (req, res) => res.json('Odinbook API'));
router.use('/login', loginRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/posts', postRouter);
router.use('/api/v1/likes', likeRouter);
router.use('/api/v1/comments', commentRouter);

module.exports = router;
