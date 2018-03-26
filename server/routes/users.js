const express = require('express');
const router = express.Router();
const {createUserData, getUserData, confirmSignIn} = require('../controllers/UserController.js')
const bcrypt = require('../middleware/bcrypt.js')
const JWT = require('../middleware/jwt.js');


// /users
// jwt ahs username, email
router.post('/signup', bcrypt.hash, createUserData)
router.post('/signin', getUserData, bcrypt.check, JWT.getJWT, confirmSignIn)
module.exports = router;
