const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
    name : String,
    email : String,
    password: String,
    threadId: [{
      type: Schema.Types.ObjectId,
      ref: 'Thread'
    }],
    threadVoteId: [{
      type: Schema.Types.ObjectId,
      ref: 'ThreadVote'
    }],
    answerId: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }],
    answerVoteId: [{
      type: Schema.Types.ObjectId,
      ref: 'AnswerVote'
    }],
}, {timestamps: true})

module.exports = mongoose.model('User',UserSchema)
