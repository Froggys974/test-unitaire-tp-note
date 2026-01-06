const User = require('./User');
const GlobalException = require('./exception/GlobalException');

class Client extends User {
    constructor(email, prenom, nom, dateDeNaissance, compteBancaires, interditBancaire) {
        super(email, prenom, nom, dateDeNaissance);
        this.compteBancaires = compteBancaires;
        this.interditBancaire = interditBancaire;
    }

    verifierSiCompteValide(compteBancaireId) {
        if (this.interditBancaire) {
            return false;
        }

        let bonCompteBancaire = null;
        for (const compteBancaire of this.compteBancaires) {
            if (compteBancaire.getId() === compteBancaireId) {
                bonCompteBancaire = compteBancaire;
                break;
            }
        }

        if (!bonCompteBancaire) {
            throw new GlobalException("Compte non trouvé");
        }

        return bonCompteBancaire.estValide();
    }

    getCompteBancaires() {
        return this.compteBancaires;
    }

    isInterditBancaire() {
        return this.interditBancaire;
    }
}

module.exports = Client;
