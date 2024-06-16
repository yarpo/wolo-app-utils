import data from "../fixtures/variables.json"

let URL = data.url;
let username = data.organiser.email;
let password = data.organiser.password;

describe('Test tworzenia wydarzenia przez organizatora', () => {
  beforeEach(() => {
    cy.login(username, password);
    cy.url().should('eq', `${URL}/`);
    cy.visit(`${URL}/create-event`);
    cy.get('input[name="name"]').should('be.visible');
  });

  it('powinno pomyślnie utworzyć wydarzenie i zweryfikować je na stronie Wszystkie Wydarzenia', () => {
    const eventTitle = 'Test Event';
    const eventDescription = 'This is a test event description.';
    const eventImageUrl = 'https://example.com/image.jpg';
    const eventDate = '2024-12-31';

    cy.get('input[name="name"]').type(eventTitle);
    cy.get('textarea[name="description"]').type(eventDescription);
    cy.get('input[name="imageUrl"]').type(eventImageUrl);
    cy.get('input[name="date"]').type(eventDate);

    cy.get('input[type="checkbox"]').first().check();

    cy.get('select[name="cityId"]').select('Gdańsk');

    cy.get('#shifts\\.0\\.startTime').should('exist').and('be.visible').type('08:00');
    cy.get('#shifts\\.0\\.endTime').should('exist').and('be.visible').type('10:00');
    cy.get('#shifts\\.0\\.capacity').should('exist').and('be.visible').type('10');
    cy.get('#shifts\\.0\\.requiredMinAge').should('exist').and('be.visible').type('18');
    cy.get('#shifts\\.0\\.shiftDirections').should('exist').and('be.visible').type('Go straight and turn left.');
    cy.get('#shifts\\.0\\.street').should('exist').and('be.visible').type('Main Street');
    cy.get('#shifts\\.0\\.homeNum').should('exist').and('be.visible').type('123');

    cy.get('#shifts\\.0\\.districtId').should('exist').and('be.visible');
    cy.get('#shifts\\.0\\.districtId').select('Wrzeszcz'); 

    cy.contains('Zatwierdź').click();

    cy.contains('Pomyślnie utworzono nowe wydarzenie').should('be.visible');

    cy.visit(`${URL}/events`);

    cy.contains(eventTitle, { timeout: 120000 }).should('be.visible');
  });
});
