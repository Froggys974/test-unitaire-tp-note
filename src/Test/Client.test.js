const Client = require("../Client");
const CompteBancaire = require("../CompteBancaire");
const GlobalException = require("../exception/GlobalException");

describe("Tests de la classe Client", () => {
  let client;
  
  beforeEach(() => {
    let compteBancaire1 = new CompteBancaire();
    compteBancaire1.save(500);
    compteBancaire1.setId(1);
    client = new Client(
      "f.grondin@myskolae.fr",
      "Florent",
      "Grondin",
      new Date("2001-08-16"),
      [compteBancaire1],
      false
    );
  });

  test("Test si compte 1 valide", () => {
    expect(client.verifierSiCompteValide(1)).toBe(true);  
  });

  test("Test interdit bancaire", () => {
    client.interditBancaire = true;
    expect(client.verifierSiCompteValide(1)).toBe(false);  
  });

  test("Test compte non trouvé", () => {
    expect(() => client.verifierSiCompteValide(5)).toThrow(GlobalException);  
    expect(() => client.verifierSiCompteValide(5)).toThrow("Compte non trouvé");  
  });

  test("Test compte trouvé mais invalide", () => {
    let compteBancaireInvalide = new CompteBancaire();
    compteBancaireInvalide.save(1564);
    compteBancaireInvalide.setId(2);
    client.compteBancaires.push(compteBancaireInvalide)
    expect(client.verifierSiCompteValide(2)).toBe(false);  
  });


});
