const express = require('express');
const router = express.Router();

const {SignUp, SignUp_verification, SignIn, ResetPassword, ResetPasswordVerification, UpdatePassword} = require('../controllers/userController');

router.route('/signUp').post(SignUp);
router.route('/SignUp_verification/:id/:token').get(SignUp_verification)
router.route('/signIn').post(SignIn);
router.route('/resetPassword').post(ResetPassword);
router.route('/resetPassword_verification/:id/:token').get(ResetPasswordVerification);
router.route('/updatePassword/:id/:token').put(UpdatePassword)


module.exports = router;