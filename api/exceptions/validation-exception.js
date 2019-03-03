class ValidationException extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.name = 'ValidationException';
    }
}

module.exports = ValidationException;
