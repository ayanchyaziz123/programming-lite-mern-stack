const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // each comment can only relates to one blog, so it's not in array
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
})

module.exports = mongoose.model('reply', replySchema);