const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    treeName: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('offer', offerSchema);