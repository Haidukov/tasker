const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function createToken(user) {
    return {
        accessToken: jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: 3600 }),
        refreshToken: user.refreshToken
    };
}

module.exports = {
    createToken
};
