const { Router } = require('express');
const router = Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.postList);
router.get('/:post', postController.postDetail);
router.post('/create', postController.postCreate);
router.put('/:post/update', postController.postUpdate);
router.delete('/:post/delete', postController.postDelete);

module.exports = router;
