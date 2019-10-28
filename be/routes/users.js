var express = require('express');
var router = express.Router();
const {register,hasUser} = require('../controllers/register')
const {check,signin,signOut}  = require('../controllers/login')
const {mailBoom,setPassword} = require('../controllers/mail')
router.post('/login',check);
router.post('/register', hasUser,register);
router.post('/mail',mailBoom)
router.post('/set',setPassword)
router.get('/signin',signin)
router.get('/signOut',signOut)
module.exports = router;
