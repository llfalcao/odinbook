const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.userList);
router.get('/:user', userController.userDetail);
router.get('/:user/feed', userController.userFeed);
router.get('/:user/friends', userController.userFriends);
router.get('/:user/friend-requests', userController.userFriendRequests);
router.post('/:user/friend-requests/confirm', userController.newFriend);
router.post('/create', userController.userCreate);
router.put('/:user/update', userController.userUpdate);
router.delete('/:user/delete', userController.userDelete);

module.exports = router;
