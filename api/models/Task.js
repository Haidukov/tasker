const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    }
});

module.exports = mongoose.model('Task', taskSchema);

