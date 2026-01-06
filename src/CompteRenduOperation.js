class CompteRenduOperation {
    constructor(nouveauSolde, montantCredite, montantNonCredite, montantDebite, montantNonDebite) {
        this.nouveauSolde = nouveauSolde;
        this.montantCredite = montantCredite;
        this.montantNonCredite = montantNonCredite;
        this.montantDebite = montantDebite;
        this.montantNonDebite = montantNonDebite;
    }

    getNouveauSolde() {
        return this.nouveauSolde;
    }

    getMontantCredite() {
        return this.montantCredite;
    }

    getMontantNonCredite() {
        return this.montantNonCredite;
    }

    getMontantDebite() {
        return this.montantDebite;
    }

    getMontantNonDebite() {
        return this.montantNonDebite;
    }
}

module.exports = CompteRenduOperation;
