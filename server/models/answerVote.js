const mongoose = require('mongoose')
const Schema = mongoose.Schema

var AnswerVoteSchema = new Schema({
    value : Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    },
}, {timestamps: true})

module.exports = mongoose.model('AnswerVote',AnswerVoteSchema)
