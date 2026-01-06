class User {
    constructor(email, prenom, nom, dateDeNaissance) {
        this.email = email;
        this.prenom = prenom;
        this.nom = nom;
        this.dateDeNaissance = dateDeNaissance;
    }

    getEmail() {
        return this.email;
    }

    getPrenom() {
        return this.prenom;
    }

    getNom() {
        return this.nom;
    }

    getDateDeNaissance() {
        return this.dateDeNaissance;
    }
}

module.exports = User;
