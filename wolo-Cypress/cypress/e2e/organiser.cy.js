import data from "../fixtures/variables.json"

let URL = data.url;
let username = data.organiser.email;
let password = data.organiser.password;

describe('Test tworzenia wydarzenia przez organizatora', () => {
  beforeEach(() => {
    cy.login(username, password);
    cy.url().should('eq', `${URL}/`);
    cy.visit(`${URL}/create-event`);
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

    cy.get('input[name="shifts[0].startTime"]').should('be.visible'); //Problem z wyborem tego elementu

    cy.get('input[name="shifts[0].startTime"]').type('08:00');
    cy.get('input[name="shifts[0].endTime"]').type('10:00');
    cy.get('input[name="shifts[0].capacity"]').type('10');
    cy.get('input[name="shifts[0].requiredMinAge"]').type('18');
    cy.get('input[name="shifts[0].shiftDirections"]').type('Go straight and turn left.');
    cy.get('input[name="shifts[0].street"]').type('Main Street');
    cy.get('input[name="shifts[0].homeNum"]').type('123');
    cy.get('select[name="shifts[0].districtId"]').select('1'); 

    cy.contains('Zatwierdź').click();

    cy.contains('Successfully created the event').should('be.visible');

    cy.visit(`${URL}/events`);

    cy.contains(eventTitle).should('be.visible');
  });
});
