const CompteRenduOperation = require('./CompteRenduOperation');

class CompteRenduOperationBuilder {
    constructor(nouveauSolde) {
        this.nouveauSolde = nouveauSolde;
        this._montantCredite = 0;
        this._montantNonCredite = 0;
        this._montantDebite = 0;
        this._montantNonDebite = 0;
    }

    montantCredite(montantCredite) {
        this._montantCredite = montantCredite;
        return this;
    }

    montantNonCredite(montantNonCredite) {
        this._montantNonCredite = montantNonCredite;
        return this;
    }

    montantDebite(montantDebite) {
        this._montantDebite = montantDebite;
        return this;
    }

    montantNonDebite(montantNonDebite) {
        this._montantNonDebite = montantNonDebite;
        return this;
    }

    build() {
        return new CompteRenduOperation(
            this.nouveauSolde,
            this._montantCredite,
            this._montantNonCredite,
            this._montantDebite,
            this._montantNonDebite
        );
    }
}

module.exports = CompteRenduOperationBuilder;
