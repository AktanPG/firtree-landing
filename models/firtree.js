const mongoose = require('mongoose');

const firtreeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: ''
    },
    image: {
        type: String
    },
    prices: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('firtree', firtreeSchema);