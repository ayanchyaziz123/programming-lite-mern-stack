const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('category', categorySchema);