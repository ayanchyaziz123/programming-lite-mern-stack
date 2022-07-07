const express = require('express');
const router = express.Router();
var multer = require('multer');
const checkLogIn = require('../middleware/checkLogin');
const isAdminCheck = require('../middleware/isAdminCheck'); 

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
  
  
  // The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
  // You can create multiple middleware each with a different storage engine config so save different files in different locations on server
  const upload = multer({ storage: fileStorageEngine });

const { createBlog, getAllBlogs,getBlogById,deleteBlog, editBlogById, updateBlog,  categories } = require('../controllers/blogController');





router.route('').get(getAllBlogs);
router.route('/blogsListScreen').get( isAdminCheck, getAllBlogs);
router.route('/new').post(upload.single('thumbnil'), createBlog);
router.route('/blogDetails/:id').get(getBlogById);
router.route('/blogDelete/:id').delete(deleteBlog);
router.route('/categories').get(categories);
router.route('/blogUpdate/:id').put(updateBlog);



module.exports = router;