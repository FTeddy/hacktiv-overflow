var express = require('express');
var router = express.Router();
const {threadVote, getThreadVote, deleteThreadVote, AnswerVote, getAnswerVote, deleteAnswerVote} = require('../controllers/VoteController.js')
const JWT = require('../middleware/jwt.js');

// /vote
// jwt ahs username, email
// threads
router.post('/thread/:threadId/:userId/:voteVal', JWT.authJWT, threadVote)
router.delete('/thread/:threadId/:userId', JWT.authJWT, deleteThreadVote)
router.get('/thread/:threadId', getThreadVote)

// answers
router.post('/answer/:answerId/:userId/:voteVal', JWT.authJWT, AnswerVote)
router.delete('/answer/:answerId/:userId', JWT.authJWT, deleteAnswerVote)
router.get('/answer/:answerId', getAnswerVote)


module.exports = router;
