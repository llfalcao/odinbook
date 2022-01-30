const { Router } = require('express');
const router = Router();
const commentController = require('../controllers/comment.controller');

router.get('/', commentController.commentList);
router.post('/create', commentController.commentCreate);

// todo: update and delete comments
// router.put('/:comment/update', commentController.commentUpdate);
// router.delete('/:comment/delete', commentController.commentDelete);

module.exports = router;
