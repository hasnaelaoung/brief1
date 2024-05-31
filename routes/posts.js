const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.post('/', postsController.createPosts);
router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPostById);

module.exports = router;
