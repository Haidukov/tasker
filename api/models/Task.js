const mongoose = require('mongoose');
const { Schema } = mongoose;
const Statuses = require('../constants/task-statuses');

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String
    },
    sprint: {
        type: Schema.Types.ObjectId,
        ref: 'Sprint',
        required: true
    },
    status: {
        type: String,
        enum: [Statuses.TODO, Statuses.IN_PROGRESS, Statuses.DONE, Statuses.CLOSED],
        default: Statuses.TODO
    }
});

module.exports = mongoose.model('Task', taskSchema);

