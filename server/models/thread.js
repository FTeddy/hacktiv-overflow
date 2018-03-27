const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ThreadSchema = new Schema({
    question : String,
    desc : String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    answerId: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }],
    threadVoteId: [{
      type: Schema.Types.ObjectId,
      ref: 'ThreadVote'
    }]
}, {timestamps: true})

module.exports = mongoose.model('Thread',ThreadSchema)
