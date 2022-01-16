const { Router } = require('express');
const router = Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.postList);
router.get('/:post', postController.postDetail);
// create
router.post('/create', postController.postCreate);
// update
// delete

module.exports = router;
