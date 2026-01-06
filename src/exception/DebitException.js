class DebitException extends Error {
    constructor(message = "", code = 0) {
        super(message);
        this.name = 'DebitException';
        this.code = code;
    }
}

module.exports = DebitException;
