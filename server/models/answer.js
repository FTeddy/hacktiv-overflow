const mongoose = require('mongoose')
const Schema = mongoose.Schema

var AnswerSchema = new Schema({
    answer : String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    threadId: {
      type: Schema.Types.ObjectId,
      ref: 'Thread'
    },
    answerVoteId: [{
      type: Schema.Types.ObjectId,
      ref: 'AnswerVote'
    }]
}, {timestamps: true})

module.exports = mongoose.model('Answer',AnswerSchema)
