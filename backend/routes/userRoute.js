const express = require('express');
const router = express.Router();
var multer = require('multer');

const {getUser, getUsers ,SignUp, SignUp_verification, SignIn, ResetPassword, ResetPasswordVerification, UpdatePassword} = require('../controllers/userController');

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

router.route('').get(getUsers);  
router.route('/userDetails/:id').get(getUser);
router.route('/signUp').post(upload.single('profile_pic'),SignUp);
router.route('/SignUp_verification/:id/:token').get(SignUp_verification)
router.route('/signIn').post(SignIn);
router.route('/resetPassword').post(ResetPassword);
router.route('/resetPassword_verification/:id/:token').get(ResetPasswordVerification);
router.route('/updatePassword/:id/:token').put(UpdatePassword)


module.exports = router;