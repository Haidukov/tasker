module.exports = class HttpException {

    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}