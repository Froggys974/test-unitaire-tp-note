class GlobalException extends Error {
    constructor(message = "", code = 0) {
        super(message);
        this.name = 'GlobalException';
        this.code = code;
    }
}

module.exports = GlobalException;
