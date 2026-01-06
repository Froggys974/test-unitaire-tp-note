const CreditException = require('./exception/CreditException');
const DebitException = require('./exception/DebitException');
const CompteRenduOperationBuilder = require('./CompteRenduOperationBuilder');

class CompteBancaire {
    static MAX = 1000;
    static MIN = 0;

    constructor() {
        this.id = null;
        this.montant = 0;
        this.dateHeureDerniereMAJ = null;
    }

    credit(montantACrediter) {
        if (montantACrediter <= 0) {
            throw new CreditException("Mauvais montant");
        } else if (!this.estValide()) {
            throw new CreditException("Le compte bancaire n'est pas dans un état correct");
        }

        const nouveauSolde = Math.min(this.montant + montantACrediter, CompteBancaire.MAX);
        const montantCredite = this.montant + montantACrediter <= CompteBancaire.MAX
            ? montantACrediter
            : nouveauSolde - this.montant;

        this.save(nouveauSolde);

        const builder = new CompteRenduOperationBuilder(nouveauSolde);
        builder.montantCredite(montantCredite);
        builder.montantNonCredite(montantACrediter - montantCredite);

        return builder.build();
    }

    debit(montantADebiter) {
        if (montantADebiter <= 0) {
            throw new DebitException("Mauvais montant");
        } else if (!this.estValide()) {
            throw new DebitException("Le compte bancaire n'est pas dans un état correct");
        }

        const nouveauSolde = Math.max(this.montant - montantADebiter, CompteBancaire.MIN);
        const montantDedite = this.montant - montantADebiter >= CompteBancaire.MIN
            ? montantADebiter
            : this.montant;

        this.save(nouveauSolde);

        const builder = new CompteRenduOperationBuilder(nouveauSolde);
        builder.montantDebite(montantDedite);
        builder.montantNonDebite(montantADebiter - montantDedite);

        return builder.build();
    }

    estValide() {
        return this.montant >= CompteBancaire.MIN && this.montant <= CompteBancaire.MAX;
    }

    save(nouveauSolde) {
        // SAVE IN DB
        this.montant = nouveauSolde;
    }

    getId() {
        return this.id;
    }

    getMontant() {
        return this.montant;
    }

    getDateHeureDerniereMAJ() {
        return this.dateHeureDerniereMAJ;
    }

    setMontant(montant) {
        this.montant = montant;
    }

    setId(id) {
        this.id = id;
    }
}

module.exports = CompteBancaire;
