const User = require('./User');
const GlobalException = require('./exception/GlobalException');

class Banquier extends User {
    static DELAI_AVANT_BANQUIER_CONTACTE_CLIENT = 90;

    constructor(email, prenom, nom, dateDeNaissance, dateArrivee, clients) {
        super(email, prenom, nom, dateDeNaissance);
        this.dateArrivee = dateArrivee;
        this.clients = clients;
    }

    clientAContacter() {
        const now = new Date();
        const delaiDate = new Date(now);
        delaiDate.setDate(delaiDate.getDate() - Banquier.DELAI_AVANT_BANQUIER_CONTACTE_CLIENT);

        if (delaiDate < this.dateArrivee) {
            throw new GlobalException("Veuillez valider votre période d'essai avant de contacter des clients");
        }

        const clientAContacter = [];
        for (const client of this.clients) {
            for (const compteBancaire of client.getCompteBancaires()) {
                if (!compteBancaire.estValide()) {
                    clientAContacter.push(client);
                    break;
                }
            }
        }

        return clientAContacter;
    }

    setDateArrivee(dateArrivee) {
        this.dateArrivee = dateArrivee;
    }

    setClients(clients) {
        this.clients = clients;
    }
}

module.exports = Banquier;
