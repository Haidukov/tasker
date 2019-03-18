const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    workspaceId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sprint', sprintSchema);
