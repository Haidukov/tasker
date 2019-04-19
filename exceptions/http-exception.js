class HttpException extends Error {

    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
        this.name = 'HttpException';
    }
}

module.exports = HttpException;


