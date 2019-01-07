const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    lastName: {
        type: String
    },
    lastVisit: Date
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 7);
    next();
});

userSchema.methods.comparePassword = async function (potentialPassword) {
    return await bcrypt.compare(potentialPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
