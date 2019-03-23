const mongoose = require('mongoose');
const { Schema } = mongoose;

const workspaceSchema = new Schema({
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
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Workspace', workspaceSchema);
