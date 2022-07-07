const express = require('express');
const router = express.Router();

const { createBlog, getAllBlogs,getBlogById,deleteBlog, editBlogById, updateBlog,  categories } = require('../controllers/blogController');


router.route('').get(getAllBlogs);
router.route('/blogsListScreen').get(getAllBlogs);
router.route('/new').post(createBlog);
router.route('/blogDetails/:id').get(getBlogById);
router.route('/blogDelete/:id').delete(deleteBlog);
router.route('/categories').get(categories);
router.route('/blogUpdate/:id').put(updateBlog);



module.exports = router;