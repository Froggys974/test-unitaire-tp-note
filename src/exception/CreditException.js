class CreditException extends Error {
    constructor(message = "", code = 0) {
        super(message);
        this.name = 'CreditException';
        this.code = code;
    }
}

module.exports = CreditException;
