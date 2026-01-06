const Banquier = require("../Banquier");
const Client = require("../Client");
const CompteBancaire = require("../CompteBancaire");
const GlobalException = require("../exception/GlobalException");

describe("Tests de la classe Banquier", () => {
  let banquier;
  
  beforeEach(() => {
    let compteBancaire1 = new CompteBancaire();
    compteBancaire1.save(500);
    compteBancaire1.setId(1);
    let client = new Client(
      "client@myskolae.fr",
      "Client1",
      "ClientNom",
      new Date("2000-01-30"),
      [compteBancaire1],
      false
    );
    banquier = new Banquier(
      "f.grondin@myskolae.fr",
      "Florent",
      "Grondin",
      new Date("2001-08-16"),
      new Date("2025-01-01"),
      [client]
    );
  });

  test("Contacter aucun client car compte valide", () => {
    expect(banquier.clientAContacter().length).toBe(0);  
  });

  test("Contacter client Client1 car compte non valide", () => {
    banquier.clients[0].compteBancaires[0].save(1500);
    expect(banquier.clientAContacter().length).toBe(1);  
    expect(banquier.clientAContacter()[0].getPrenom()).toBe("Client1");  
  });

  test("Contacter client 2 car compte non valide mais pas client 1 car compte valide", () => {
    let compteBancaireInvalide = new CompteBancaire();
      compteBancaireInvalide.save(1548);
      compteBancaireInvalide.setId(3511);
    let client2 = new Client(
      "client2@myskolae.fr",
      "Client2",
      "Client2Nom",
      new Date("1978-10-30"),
      [compteBancaireInvalide],
      false
    );
    banquier.clients.push(client2);
    expect(banquier.clientAContacter().length).toBe(1);  
    expect(banquier.clientAContacter()[0].getPrenom()).toBe("Client2");  
  });

  test("Test Banquier contact avant Fin de période d'essai", () => {
    banquier.setDateArrivee(new Date());
    expect(() => banquier.clientAContacter()).toThrow(GlobalException);  
    expect(() => banquier.clientAContacter()).toThrow("Veuillez valider votre période d'essai avant de contacter des clients");  
  });




});
