const HttpException = require('../exceptions/http-exception');

function roleGuard(allowedRole) {
    return (req, res, next) => {
        console.log('hello');
        if (!req.decoded) {
            next(new HttpException(401));
        }
        const { role } = req.decoded;
        if (allowedRole === role) {
            next();
        }
        else {
            next(new HttpException(403));
        }
    }
}

module.exports = roleGuard;
