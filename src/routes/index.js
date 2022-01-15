const router = require('express').Router();
const userRouter = require('./users');
const postRouter = require('./posts');

router.get('/', (req, res) => res.json('Odinbook API'));
router.use('/v1/users', userRouter);
router.use('/v1/posts', postRouter);

module.exports = router;
