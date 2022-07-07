const express = require('express');
const router = express.Router();

const {SignUp, SignUp_verification, SignIn} = require('../controllers/userController');

router.route('/signUp').post(SignUp);
router.route('/SignUp_verification/:id/:token').get(SignUp_verification)
router.route('/signIn').post(SignIn);


module.exports = router;