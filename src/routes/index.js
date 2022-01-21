const router = require('express').Router();
const userRouter = require('./users');
const postRouter = require('./posts');
const loginRouter = require('./login');

router.get('/', (req, res) => res.json('Odinbook'));
router.get('/api', (req, res) => res.json('Odinbook API'));
router.use('/login', loginRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/posts', postRouter);

module.exports = router;
