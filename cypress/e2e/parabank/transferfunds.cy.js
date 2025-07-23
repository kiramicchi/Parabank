/// <reference types="cypress" />

describe('Parabank Transfer Funds Test Case', function () {
  beforeEach(function () {
    cy.fixture('TestData').then(user => {
      cy.visitParabankAndLogin(user);
      cy.goToTransferFundsPage();
    });
  });

  it('Transfer Funds UI', function () {
    cy.checkTransferFundsUI();
    cy.screenshotWithDate?.('Transfer Funds UI');
  });

  it('Standard Transfer Funds', function () {
    cy.screenshotWithDate?.('Standard Transfer Funds', 'BEFORE');
    cy.goToOpenAccountPage();
    cy.selectAccountType('SAVINGS');
    cy.selectFromAccount(0);
    cy.submitOpenAccountForm();
    cy.goToTransferFundsPage();
    cy.transferFunds(100);
    cy.screenshotWithDate?.('Standard Transfer Funds', 'AFTER');
  });

  it('Negative Transfer Funds', function () {
    cy.screenshotWithDate?.('Negative Transfer Funds', 'BEFORE');
    cy.transferFundsNegative();
    cy.screenshotWithDate?.('Negative Transfer Funds', 'AFTER');
  });
});
