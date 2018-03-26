const Answer = require('../models/answer.js')

module.exports = {

  createNewAnswer (req, res) {
    let newAnswer = new Answer({
      answer: req.body.answer,
      userId: req.params.userId,
      threadId: req.params.threadId
    })

    newAnswer.save((err, createdAnswer) => {
      if (err) {
        return res.status(500).json({
          message: "Answer failed to be created"
        })
      }
      return res.status(200).json({
        message: 'Answer Successfully Created',
        answer: createdAnswer
      })
    })
  },

  getAnswer (req, res) {
    let threadId = req.params.threadId
    Answer.find({threadId: threadId})
      .limit(50)
      .exec()
      .then(foundAnswers => {
        res.status(200).json({
          message: 'Found all threads.',
          answers: foundAnswers
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },

  editAnswer (req, res) {
    let userId = req.params.userId
    let answerId = req.params.answerId
    let updateData = {}
    if (req.body.answer) {updateData.answer = req.body.answer}

    Answer.findOne({_id: answerId})
      .exec()
      .then(foundAnswer => {
        if (foundAnswer._id !== userId) {
          res.status(401).json({
            message: 'User is not authorized'
          })
        } else {
          Answer.findOneAndUpdate({_id: answerId}, updateData, {new: true})
            .exec()
            .then(updatedAnswer => {
              res.status(200).json({
                message:'Successfully updated Answer',
                answer: updatedAnswer
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

  deleteAnswer (req, res) {
    let userId = req.params.userId
    let answerId = req.params.answerId

    Answer.findOne({_id: answerId})
      .exec()
      .then(foundAnswer => {
        if (foundAnswer._id !== userId) {
          res.status(401).json({
            message: 'User is not authorized'
          })
        } else {
          Answer.findOne({_id: answerId})
            .exec()
            .then(foundAnswer => {
              foundAnswer.remove()
                .then(deletedAnswer => {
                  res.status(200).json({
                    message: 'Successfully deleted Answer',
                    thread: deletedAnswer
                  })
                }).catch(err => {
                  res.status(500).json({
                    message: 'Something went wrong'
                  })
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
