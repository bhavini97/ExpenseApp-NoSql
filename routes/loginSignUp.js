const express = require("express");
const router = express.Router();
const loginSignUpCtrl = require('../controller/signupLogin');
const authMiddleware = require('../middleware/jwt')

router.get('/signup',loginSignUpCtrl.getSignUpPage)

router.post('/user/signup',loginSignUpCtrl.addUser);

router.get('/login',loginSignUpCtrl.getLoginPage);
router.post('/user/login',loginSignUpCtrl.loginUser);



module.exports = router;