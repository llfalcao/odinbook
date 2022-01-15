const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.userList);
router.get('/:user', userController.userDetail);
router.post('/', userController.userCreate);

module.exports = router;
