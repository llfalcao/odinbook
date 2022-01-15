const { Router } = require('express');
const router = Router();
const postController = require('../controllers/post.controller');

// get posts
router.get('/', postController.postList);
// get post
// create
// update
// delete

module.exports = router;
