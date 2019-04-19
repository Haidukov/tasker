const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const uuid = require('uuid');
const Roles = require('../constants/user-roles');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    lastVisit: Date,
    role: {
        type: String,
        enum: [Roles.TEACHER, Roles.STUDENT],
        default: Roles.TEACHER
    },
    avatar: {
        type: String,
        default: 'images/user.svg'
    },
    refreshToken: String
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.refreshToken = uuid();
    this.password = await bCrypt.hash(this.password, 7);
    next();
});

userSchema.methods.comparePassword = async function (potentialPassword) {
    return await bCrypt.compare(potentialPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
