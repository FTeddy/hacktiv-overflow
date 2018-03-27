const ThreadVote = require('../models/threadVote.js')
const AnswerVote = require('../models/answerVote.js')
const Answer = require('../models/answer.js')
const Thread = require('../models/thread.js')
const User = require('../models/user.js')

module.exports = {

  threadVote (req, res) {
    let val
    if (Number(req.params.voteVal) === 1) {
      val = 1
    } else if (Number(req.params.voteVal) === 0) {
      val = -1
    }
    // console.log(val);
    let threadId = req.params.threadId
    let userId = req.params.userId

    let newThreadVote = new ThreadVote({
      value: val,
      userId: userId,
      threadId: threadId
    })

    User.findOne({_id: userId})
      .then(foundUser => {
        foundUser.threadVoteId.push(newThreadVote._id)
        foundUser.save((err, updatedUser) => {
          Thread.findOne({_id: threadId})
            .then(foundThread => {
              foundThread.threadVoteId.push(newThreadVote._id)
              foundThread.save((err, updatedThread) => {

                newThreadVote.save((err, createdThreadVote) => {
                  if (err) {
                    return res.status(500).json({
                      message: "ThreadVote failed to be created"
                    })
                  }
                  return res.status(200).json({
                    message: 'ThreadVote Successfully Created',
                    threadVote: createdThreadVote
                  })
                })
              })
            })
        })
      })


  },

  getThreadVote (req, res) {
    let threadId = req.params.threadId
    ThreadVote.find({threadId: threadId})
      .exec()
      .then(foundThreadVotes => {
        res.status(200).json({
          message: 'Found thread votes',
          threadVotes: foundThreadVotes
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },

  deleteThreadVote (req, res) {
    let threadId = req.params.threadId
    let userId = req.params.userId
    ThreadVote.findOne({
      userId: userId,
      threadId: threadId
    }).exec()
      .then(foundThreadVote => {

        if (!foundThreadVote) {
          res.status(200).json({
            message: 'Vote was already deleted'
          })
        } else {
          let voteId = foundThreadVote._id
          Thread.findByIdAndUpdate(threadId, {$pull: {threadVoteId: voteId}})
            .exec()
            .then(updatedThread => {
              User.findByIdAndUpdate(userId, {$pull: {threadVoteId: voteId}})
                .exec()
                .then(updatedUser => {

                  foundThreadVote.remove()
                    .then(removedVote => {
                      res.status(200).json({
                        message: 'Successfully deleted Vote',
                        vote: removedVote
                      })
                    }).catch(err => {
                      res.status(500).json({
                        message: 'Something went wrong'
                      })
                    })
                })
            })
        }
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },
  // =========== answer votes ===============
  AnswerVote (req, res) {
    let val
    if (Number(req.params.voteVal) === 1) {
      val = 1
    } else if (Number(req.params.voteVal) === 0) {
      val = -1
    }
    let answerId = req.params.answerId
    let userId = req.params.userId

    let newAnswerVote = new AnswerVote({
      value: val,
      userId: userId,
      answerId: answerId
    })

    User.findOne({_id: userId})
      .then(foundUser => {
        foundUser.answerVoteId.push(newAnswerVote._id)
        foundUser.save((err, updatedUser) => {
          Answer.findOne({_id: answerId})
            .then(foundAnswer => {
              foundAnswer.answerVoteId.push(newAnswerVote._id)
              foundAnswer.save((err, updatedThread) => {

                newAnswerVote.save((err, createdThreadVote) => {
                  if (err) {
                    return res.status(500).json({
                      message: "ThreadVote failed to be created"
                    })
                  }
                  return res.status(200).json({
                    message: 'ThreadVote Successfully Created',
                    threadVote: createdThreadVote
                  })
                })
              })
            })
        })
      })
  },

  getAnswerVote (req, res) {
    let answerId = req.params.answerId
    AnswerVote.find({answerId: answerId})
      .exec()
      .then(foundAnswerVotes => {
        res.status(200).json({
          message: 'Found answer votes',
          answerVotes: foundAnswerVotes
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },

  deleteAnswerVote (req, res) {
    let answerId = req.params.answerId
    let userId = req.params.userId
    AnswerVote.findOne({
      userId: userId,
      answerId: answerId
    }).exec()
      .then(foundAnswerVote => {
        if (!foundAnswerVote) {
          res.status(200).json({
            message: 'Vote was already deleted'
          })
        } else {
          let voteId = foundAnswerVote._id
          Answer.findByIdAndUpdate(answerId, {$pull: {answerVoteId: voteId}})
            .exec()
            .then(updatedThread => {
              User.findByIdAndUpdate(userId, {$pull: {answerVoteId: voteId}})
                .exec()
                .then(updatedUser => {

                  foundAnswerVote.remove()
                    .then(removedVote => {
                      res.status(200).json({
                        message: 'Successfully deleted Vote',
                        vote: removedVote
                      })
                    }).catch(err => {
                      res.status(500).json({
                        message: 'Something went wrong'
                      })
                    })
                })
            })
        }
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  }

};
