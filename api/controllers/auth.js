const User = require('../models/User');
const HttpException = require('../exceptions/http-exception');
const { createToken } = require('../util/token');
const { validationResult } = require('express-validator/check');
const generateError = require('../exceptions/errors-msg');

async function createUser(req, res, next) {
    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username: username.toLowerCase() }).exec();
    if (user) {
        next(new HttpException(400, 'User already exists'));
    }

    const newUser = new User({ username, password, role: 'Teacher' });
    await newUser.save();
    res.sendStatus(201);
}

async function login(req, res, next) {
    const { username, password } = req.body;

    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        next(generateError(errors));
    }

    const user = await User.findOne({ username: username.toLowerCase() }).exec();
    if (!user) {
        next(new HttpException(401, 'Invalid username or password'));
    }

    const match = await user.comparePassword(password);
    if (!match) {
        next(new HttpException(401, 'Invalid username or password'));
    }

    const token = createToken(user);
    res.status(200);
    res.json(token);
}

async function userData(req, res, next) {
    const userId = req.decoded.userId;
    const user = await User.findById(userId);
    const userDto = {
      role: user.role,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    res.json(userDto);
}

async function logout(req, res, next) {

}

async function refresh(req, res, next) {

}

module.exports = {
    createUser,
    login,
    logout,
    refresh,
    userData
}
