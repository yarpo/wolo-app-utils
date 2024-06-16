import data from "../fixtures/variables.json";

let URL = data.url;

describe('Test przeglądania wydarzeń bez logowania', () => {
  beforeEach(() => {
    cy.visit(URL);
  });
  
  it('powinien przejść do strony wszystkich wydarzeń i kliknąć na wydarzenie', () => {

    cy.changeLanguageAndVerify('pl', 'Czy jesteś gotów zmienić świat ?');

    cy.contains('Wszystkie wydarzenia').click();
    cy.url().should('include', '/events'); 


    const eventTitle = 'Wizyta w schronisku dla zwierząt';
    cy.contains(eventTitle, { timeout: 10000 }).click(); 

    cy.url().should('include', '/details'); 
    cy.contains(eventTitle, { timeout: 10000 }).should('be.visible'); 
  });

  it('powinien zmienić język i zweryfikować tekst', () => {
    cy.changeLanguageAndVerify('pl', 'Czy jesteś gotów zmienić świat?');
    cy.changeLanguageAndVerify('en', 'Are you ready to change the world?');
  });

  it('powinien przeglądać różne sekcje strony', () => {
    cy.contains('Dla Wolontariuszy').click();
    cy.url().should('include', '/for-volunteers');
    cy.contains('Wolontariusz', { timeout: 10000 }).should('be.visible');

    cy.contains('Potrzebują Ciebie').click();
    cy.url().should('include', '/they-need-you');
    cy.contains('Potrzebują Ciebie', { timeout: 10000 }).should('be.visible');
  });
});
