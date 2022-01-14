const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', (req, res) => res.json('Odinbook API'));

router.get('/v1/users', userController.userList);

module.exports = router;
