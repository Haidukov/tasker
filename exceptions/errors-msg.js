const ValidationException = require('../exceptions/validation-exception');

module.exports = err => {
    const errorsList = err.array();
    const message = errorsList
        .map(e => e.param + ' - ' + e.msg)
        .join(',');
    const exception = new ValidationException(message);
    return exception;
};
