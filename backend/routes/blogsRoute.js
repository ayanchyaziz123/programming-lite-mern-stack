const express = require('express');
const router = express.Router();

const { blogsGet, blogCreate, blogGetById, blogDelete, blogUpdate, categories } = require('../controllers/blogsController');

router.route('').get(blogsGet);
router.route('/new').post(blogCreate);
router.route('/blogDetails/:id').get(blogGetById);
router.route('/blogDelete/:id').delete(blogDelete);
router.route('/categories').get(categories);
router.route('/blogUpdate/:id').put(blogUpdate);



module.exports = router;