const express = require('express');
const router = express.Router();
const multer  = require('multer')


const { blogsGet, blogCreate, blogGetById, blogDelete, blogUpdate, categories } = require('../controllers/blogsController');

// image upload

const storage = multer.diskStorage(
    {
    destination: function (req, file, cb) {
      cb(null, '../public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


const upload = multer({ dest: storage })


router.route('').get(blogsGet);
router.route('/blogsListScreen').get(blogsGet);
router.route('/new',).post(blogCreate);
router.route('/blogDetails/:id').get(blogGetById);
router.route('/blogDelete/:id').delete(blogDelete);
router.route('/categories').get(categories);
router.route('/blogUpdate/:id').put(blogUpdate);



module.exports = router;