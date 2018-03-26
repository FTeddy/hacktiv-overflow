const ThreadVote = require('../models/threadVote.js')
const AnswerVote = require('../models/answerVote.js')

module.exports = {

  threadVote (req, res) {
    let val = req.params.voteVal
    let threadId = req.params.threadId
    let userId = req.params.userId

    let newThreadVote = new ThreadVote({
      value: val,
      userId: userId
      threadId: threadId
    })

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
        }
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },
  // =========== answer votes ===============
  AnswerVote (req, res) {
    let val = req.params.voteVal
    let answerId = req.params.answerId
    let userId = req.params.userId

    let newAnswerVote = new AnswerVote({
      value: val,
      userId: userId
      answerId: answerId
    })

    newAnswerVote.save((err, createdAnswerVote) => {
      if (err) {
        return res.status(500).json({
          message: "AnswerVote failed to be created"
        })
      }
      return res.status(200).json({
        message: 'AnswerVote Successfully Created',
        answerVote: createdAnswerVote
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
        }
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  }

};
