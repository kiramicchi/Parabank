/// <reference types="cypress" />

describe('Parabank Find Transactions Test Case', () => {
  it('Find Transactions UI', () => {
    cy.fixture('TestData').then(user => {
      cy.visitFindTransactionsPage(user);
      cy.checkFindTransactionsUI();

      cy.screenshotWithDate?.('Find Transactions UI');
    });
  });

  it('Standard Find Transactions', () => {
    cy.fixture('TestData').then(user => {
      cy.visitFindTransactionsPage(user);

      cy.screenshotWithDate?.('Standard Find Transactions', 'BEFORE');

      cy.findTransactionByAmount('100');

      cy.screenshotWithDate?.('Standard Find Transactions', 'AFTER');
    });
  });

  it('Negative Find Transactions', () => {
    cy.fixture('TestData').then(user => {
      cy.visitFindTransactionsPage(user);

      cy.screenshotWithDate?.('Negative Find Transactions', 'BEFORE');

      cy.findTransactionsNegativeCheck();

      cy.screenshotWithDate?.('Negative Find Transactions', 'AFTER');
    });
  });
});
