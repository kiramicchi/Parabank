/// <reference types="cypress" />

describe('Parabank Account Overview Test Case', function () {
  it('Standard Account Overview', function () {
    cy.fixture('TestData').then(user => {
      cy.visitParabankAndLogin(user);

      cy.url().should('include', '/overview.htm');
      cy.get('#showOverview > .title').should('include.text', 'Overview');

      cy.screenshotWithDate?.('Account Overview', 'BEFORE');

      cy.get('#rightPanel').should('be.visible');

      // Use custom command
      cy.checkAccountOverviewTable();
      cy.validateTotalBalance();

      cy.screenshotWithDate?.('Account Overview', 'AFTER');
    });
  });
});
