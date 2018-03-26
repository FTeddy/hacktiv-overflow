var express = require('express');
var router = express.Router();
const {createNewThread, getThread, editThread, deleteThread} = require('../controllers/ThreadController.js')
const JWT = require('../middleware/jwt.js');

// /thread
// jwt ahs username, email
router.post('/new/:userId', JWT.authJWT, createNewThread)
router.get('/', getThread)
router.put('/edit/:threadId', JWT.authJWT, editThread)
router.delete('/delete/:threadId', JWT.authJWT, deleteThread)

module.exports = router;
