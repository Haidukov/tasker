const mongoose = require('mongoose');

const userInviteSchema = new mongoose.Schema({
    invitedEmail: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    workspaceId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserInvite', userInviteSchema);
