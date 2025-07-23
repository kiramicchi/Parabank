/// <reference types="cypress" />

describe('Parabank Logout Test Case', function () {
  it('Standard Logout', function () {
    cy.fixture('TestData').then(user => {
      cy.visitParabankAndLogin(user);

      cy.screenshotWithDate?.('Standard Logout', 'BEFORE');

      cy.logoutFromParabank();

      cy.screenshotWithDate?.('Standard Logout', 'AFTER');
    });
  });
});
