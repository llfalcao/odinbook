const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.userList);
router.get('/:user', userController.userDetail);
router.get('/:user/feed', userController.userFeed);
router.get('/:user/friends', userController.userFriends);
router.post('/create', userController.userCreate);
router.put('/:user/update', userController.userUpdate);
router.delete('/:user/delete', userController.userDelete);

module.exports = router;
