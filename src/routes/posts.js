const { Router } = require('express');
const router = Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.postList);
router.get('/:post', postController.postDetail);
// create
// update
// delete

module.exports = router;
