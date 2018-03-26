var express = require('express');
var router = express.Router();
const {threadVote, getThreadVote, deleteThreadVote, AnswerVote, getAnswerVote, deleteAnswerVote} = require('../controllers/VoteController.js')
const JWT = require('../middleware/jwt.js');

// /vote
// jwt ahs username, email
// threads
router.post('/vote/:threadId/:userId/:voteVal', JWT.authJWT, threadVote)
router.delete('unvote/:threadId/:userId', JWT.authJWT, deleteThreadVote)
router.get('/:threadId', getThreadVote)

// answers
router.post('/vote/:answerId/:voteVal', JWT.authJWT, AnswerVote)
router.delete('unvote/:answerId/:userId', JWT.authJWT, deleteAnswerVote)
router.get('/:answerId', getAnswerVote)


module.exports = router;
