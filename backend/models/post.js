const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },

    tags: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    image:{
        type: String
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
      }],
    update_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('post', postsSchema);