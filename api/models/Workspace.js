const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
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
    authorId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Workspace', workspaceSchema);
