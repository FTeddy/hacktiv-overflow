const express = require('express');
const router = express.Router();
const {}
const JWT = require('../middleware/jwt.js');

// /answer
// jwt ahs username, email
router.post('/new/:threadId/:userId', JWT.authJWT, createNewAnswer)
router.get('/:threadId', getAnswer)
router.put('/edit/:answerId/:userId', JWT.authJWT, editAnswer)
router.delete('/delete/:answerId/:userId', JWT.authJWT, deleteAnswer)

module.exports = router;
