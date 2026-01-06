const CompteBancaire = require("../CompteBancaire");
const CreditException = require("../exception/CreditException");
const DebitException = require("../exception/DebitException");

describe("Tests de la classe CompteBancaire", () => {
  let compteBancaire;
  
  beforeEach(() => {
    compteBancaire = new CompteBancaire();
  });

  test("Test compte bancaire valide", () => {
    compteBancaire.save(785);
    expect(compteBancaire.estValide()).toBe(true);  
  });
  
  test("Test compte bancaire non valide (trop élevé)", () => {
    compteBancaire.save(1500);
    expect(compteBancaire.estValide()).toBe(false);  
  });

  test("Test compte bancaire non valide (trop bas)", () => {
    compteBancaire.save(-50);
    expect(compteBancaire.estValide()).toBe(false);  
  });

  test("Test crédit valide", () => {
    compteBancaire.save(601);
    compteBancaire.credit(124);
    expect(compteBancaire.getMontant()).toBe(725);  
  });

  test("Test crédit montant négatif", () => {
    expect(() => compteBancaire.credit(-50)).toThrow(CreditException);  
    expect(() => compteBancaire.credit(-50)).toThrow("Mauvais montant");  
  });

  test("Test crédit sur compte invalide", () => {
    compteBancaire.save(1500);
    expect(() => compteBancaire.credit(100)).toThrow(CreditException);  
    expect(() => compteBancaire.credit(100)).toThrow("Le compte bancaire n'est pas dans un état correct");  
  });

  test("Test crédit supérieur à la limite du compte", () => {
    compteBancaire.save(960);
    const compteRenduOperation = compteBancaire.credit(100);
    expect(compteRenduOperation.getMontantNonCredite()).toBe(60);
    expect(compteRenduOperation.getMontantCredite()).toBe(40);
    expect(compteRenduOperation.getNouveauSolde()).toBe(1000);
    expect(compteBancaire.getMontant()).toBe(1000);
  });

  test("Test débit valide", () => {
    compteBancaire.save(600);
    compteBancaire.debit(124);
    expect(compteBancaire.getMontant()).toBe(476);  
  });

  test("Test débit montant négatif", () => {
    expect(() => compteBancaire.debit(-50)).toThrow(DebitException);  
    expect(() => compteBancaire.debit(-50)).toThrow("Mauvais montant");  
  });

  test("Test débit sur compte invalide", () => {
    compteBancaire.save(1500);
    expect(() => compteBancaire.debit(125)).toThrow(DebitException);  
    expect(() => compteBancaire.debit(125)).toThrow("Le compte bancaire n'est pas dans un état correct");  
  });
  
  test("Test débit inférieur à la limite du compte", () => {
    compteBancaire.save(40);
    const compteRenduOperation = compteBancaire.debit(100);
    expect(compteRenduOperation.getMontantNonDebite()).toBe(60);
    expect(compteRenduOperation.getMontantDebite()).toBe(40);
    expect(compteRenduOperation.getNouveauSolde()).toBe(0);
    expect(compteBancaire.getMontant()).toBe(0);
  });


});
