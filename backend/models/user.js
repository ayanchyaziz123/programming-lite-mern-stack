const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        Default: false  
    },
    profile_pic:{
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

module.exports = mongoose.model('user', usersSchema);