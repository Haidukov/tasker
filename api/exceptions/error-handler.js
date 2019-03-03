const ValidationException = require('../exceptions/validation-exception');
const HttpException = require('../exceptions/http-exception');

module.exports = (err, req, res, next) => {
    if (err instanceof ValidationException) {
        res.status(400);
        res.json({ message: err.message });
    }
    if (err instanceof HttpException) {
        res.status(err.code);
        res.json({ message: err.message })
    }
    else {
        res.status(500);
        res.json({ message: 'Internal Server Error' });
    }
};
