import data from "../fixtures/variables.json"

let URL = data.url

Cypress.Commands.add('login', (email, password) => {
  cy.visit(`${URL}/login`);
  cy.wait(200);
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});

Cypress.Commands.add('changeLanguageAndVerify', (language, expectedText) => {
  cy.get('[data-testid="languages-select"]').select(language);
  cy.contains(expectedText);
});

Cypress.Commands.add('navigateToAllEvents', () => {
  cy.get('nav').contains('All Events').click();
  cy.url().should('include', '/events');
});

Cypress.Commands.add('navigateToCalendar', () => {
  cy.get('nav').contains('Calendar').click();
  cy.url().should('include', '/calendar');
});

Cypress.Commands.add('navigateToForVolunteers', () => {
  cy.get('nav').contains('For Volunteers').click();
  cy.url().should('include', '/for-volunteers');
});

Cypress.Commands.add('navigateToTheyNeedYou', () => {
  cy.get('nav').contains('They Need You').click();
  cy.url().should('include', '/they-need-you');
});

Cypress.Commands.add('clickOnEventAndNavigateToDetails', (eventTitle) => {
  cy.contains(eventTitle).click();
});

Cypress.Commands.add('signUpForEvent', () => {
  cy.contains('Join shift').click();
});