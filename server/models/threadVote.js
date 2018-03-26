const mongoose = require('mongoose')
const Schema = mongoose.Schema

var threadVoteSchema = new Schema({
    value : Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    threadId: {
      type: Schema.Types.ObjectId,
      ref: 'Thread'
    },
}, {timestamps: true})

module.exports = mongoose.model('threadVote',threadVoteSchema)
