const User = require('../models/User');
const HttpException = require('../exceptions/http-exception');
const createToken = require('../util/token').createToken;

async function createUser(username, password) {
    if (!username || !password) {
        throw new HttpException(400, 'Should input username and password');
    }

    const user = await User.findOne({username: username.toLowerCase()}).exec()
    if (user) {
        throw new HttpException(400, 'User already exists');
    }

    const newUser = new User({username, password});
    newUser.save();
}

async function login(username, password) {
    if (!username || !password) {
        throw new HttpException(400, 'Should input username and password');
    }

    const user = await User.findOne({ username: username.toLowerCase() }).exec();
    if (!user) {
        throw new HttpException(400, 'User not found');
    }

    const match = await user.comparePassword(password);
    if (!match) {
        throw new HttpException(401, 'Incorrect password');
    }

    return createToken(user);
}

module.exports = {
    createUser,
    login
}