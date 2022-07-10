const express = require('express');
const router = express.Router();

const {createComment, createReply} = require('../controllers/commentController');

router.route('/createComment').post(createComment)
router.route('/createReply').post(createReply)



module.exports = router;