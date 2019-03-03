const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function createToken(user) {
    return {
        accessToken: jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: 60 * 5 }),
        refreshToken: user.refreshToken
    };
}

module.exports = {
    createToken
}
