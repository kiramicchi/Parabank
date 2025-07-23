/// <reference types="cypress" />

describe('Parabank Bill Pay Test Cases', function () {
  beforeEach(() => {
    cy.fixture('TestData').then(user => {
      cy.visitParabankAndLogin(user);
    });
  });

  it('Bill Pay UI', function () {
    cy.visitBillPayPage();
    cy.checkBillPayUI();

    cy.screenshotWithDate?.('Bill Pay UI');
  });

  it('Standard Bill Pay', function () {
    cy.visitBillPayPage();

    cy.screenshotWithDate?.('Standard Bill Pay', 'BEFORE');

    cy.fillBillPayForm({
      name: 'Kira Starr',
      address: '1214 Shibuya',
      city: 'Shibuya',
      state: 'Tokyo',
      zip: '1214',
      phone: '12141214',
      account: '12142023',
      amount: '100'
    });

    cy.submitBillPay();
    cy.checkBillPaySuccess();

    cy.screenshotWithDate?.('Standard Bill Pay', 'AFTER');
  });

  it('Negative Bill Pay', function () {
    cy.visitBillPayPage();

    cy.screenshotWithDate?.('Negative Bill Pay', 'BEFORE');

    cy.submitBillPay();
    cy.checkBillPayValidationErrors();

    cy.screenshotWithDate?.('Negative Bill Pay', 'AFTER');
  });
});
