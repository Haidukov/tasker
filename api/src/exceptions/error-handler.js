const ValidationException = require('.//validation-exception');
const HttpException = require('.//http-exception');

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
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal Server Error' });
    }
};
