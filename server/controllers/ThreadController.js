const Thread = require('../models/thread.js')

module.exports = {

  createNewThread (req, res) {
    let newThread = new Thread({
      question: req.body.question,
      desc: req.body.desc,
      userId: req.params.userId
    })

    newThread.save((err, createdThread) => {
      if (err) {
        return res.status(500).json({
          message: "Thread failed to be created"
        })
      }
      return res.status(200).json({
        message: 'Thread Successfully Created',
        thread: createdThread
      })
    })
  },

  getThread (req, res) {
    Thread.find()
      .limit(50)
      .exec()
      .then(foundThreads => {
        res.status(200).json({
          message: 'Found all threads.',
          threads: foundThreads
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },

  editThread (req, res) {
    let threadId = req.params.threadId
    let updateData = {}
    if (req.body.desc) {updateData.desc = req.body.desc}

    Thread.findOneAndUpdate({_id: threadId}, updateData, {new: true})
      .exec()
      .then(updatedThread => {
        res.status(200).json({
          message:'Successfully updated Thread',
          thread: updatedThread
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  },

  deleteThread (req, res) {
    let threadId = req.params.threadId
    Thread.findOne({_id: threadId})
      .exec()
      .then(foundThread => {
        foundThread.remove()
          .then(deletedThread => {
            res.status(200).json({
              message: 'Successfully deleted Thread',
              thread: deletedThread
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

};
