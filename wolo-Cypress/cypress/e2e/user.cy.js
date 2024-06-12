import data from "../fixtures/variables.json"

let URL = data.url;
let username = data.user.email;
let password = data.user.password;

describe('Test logowania, nawigacji do wydarzeń, zapisania się i wypisania ze zmiany', () => {
  it('powinien zalogować się, przejść do wszystkich wydarzeń, kliknąć na wydarzenie, przejść do strony szczegółów, zapisać się na wydarzenie i wypisać się ze zmiany', () => {
    cy.login(username, password);
    
    cy.url().should('eq', `${URL}/`); 
    cy.contains('Czy jesteś gotów zmienić świat ?');

    cy.changeLanguageAndVerify('pl', 'Czy jesteś gotów zmienić świat ?');
    cy.changeLanguageAndVerify('en', 'Are you ready to change the world?');

    cy.navigateToAllEvents();

    const eventTitle = 'Visit to the Animal Shelter'; 
    cy.clickOnEventAndNavigateToDetails(eventTitle);

    cy.signUpForEvent();
    cy.wait(200);

    cy.contains('I agree to give my phone number to the organiser.').should('be.visible');
    cy.contains('I Agree').click();
    cy.wait(200);

    cy.contains('Leave shift').should('be.visible');
    cy.wait(200);
    cy.contains('Leave shift').click();
    cy.wait(200);
    
    cy.contains('Are you sure you want to leave this shift?').should('be.visible');
    cy.contains('Leave the shift').click();
    cy.wait(200);
    cy.contains('Join shift').should('be.visible');
  });
});
