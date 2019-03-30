const mongoose = require('mongoose');
const { Schema } = mongoose;

const sprintSchema = new Schema({
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
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});

module.exports = mongoose.model('Sprint', sprintSchema);
