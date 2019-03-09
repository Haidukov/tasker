const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const HttpException = require('../exceptions/http-exception');

function auth(req, res, next) {
    if (req.headers.authorization) {
        const [prefix, token] = req.headers.authorization.split(' ');
        if (prefix === 'Bearer') {
            return jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    return next(new HttpException(401));
                }

                req.decoded = decoded;
                return next();
            })
        }
    }

    res.sendStatus(401);
}

module.exports = auth;

