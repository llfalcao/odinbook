const router = require('express').Router();
const userRouter = require('./users');

router.get('/', (req, res) => res.json('Odinbook API'));
router.use('/v1/users', userRouter);

module.exports = router;
