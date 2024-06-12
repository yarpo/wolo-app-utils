import data from "../fixtures/variables.json";

let URL = data.url;
let username = data.admin.email;
let password = data.admin.password;

describe('Testy Panelu Administracyjnego', () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.login(username, password);
    cy.url().should('eq', `${URL}/`);
    cy.changeLanguageAndVerify('pl', 'Czy jesteś gotów zmienić świat ?');
    cy.visit(`${URL}/admin-home-page`);
    cy.url().should('eq', `${URL}/admin-home-page`);
  });

  it('powinno utworzyć nowego użytkownika', () => {
    cy.contains('Użytkownicy').click();
    cy.get('.admin-panel-add').first().click();
    cy.get('input#firstname').type('Jan');
    cy.get('input#lastname').type('Kowalski');
    cy.get('input#email').type('jan.testerski@example.com');
    cy.get('input#phone').type('123456789');
    cy.get('input#password').type('password123');
    cy.get('input#adult').check();
    cy.get('.confirm_button').click();
    cy.wait(500);
  });

  it('powinno edytować utworzonego użytkownika', () => {
    cy.contains('Użytkownicy').click();
    cy.get('.admin-panel-search-bar input[type="text"]').should('be.visible').first().type('jan.testerski@example.com');
    cy.contains('jan.testerski@example.com').parents('tr').find('.edit-button').click();
    cy.get('input#firstname').clear().type('Janek');
    cy.get('input#lastname').clear().type('Nowak');
    cy.get('.confirm_button').click();
  });


  it('powinno usunąć edytowanego użytkownika', () => {
    cy.contains('Użytkownicy').click();
    cy.get('.admin-panel-search-bar input[type="text"]').should('be.visible').first().type('jan.testerski@example.com'); 
    cy.get('.confirm_button').click();
  });
});
