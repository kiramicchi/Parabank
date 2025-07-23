/// <reference types="cypress" />

describe('Parabank Request Loan Test Cases', () => {
  beforeEach(() => {
    cy.fixture('TestData').then(user => {
      cy.visitParabankAndLogin(user);
      cy.goToRequestLoanPage();
    });
  });

  it('Request Loan UI', () => {
    cy.assertRequestLoanUI();
    cy.screenshotWithDate?.('Request Loan UI');
  });

  it('Standard Request Loan', () => {
    cy.screenshotWithDate?.('Standard Request Loan', 'BEFORE');

    cy.fillRequestLoanForm({ amount: '1000', downPayment: '500', accountIndex: 0 });
    cy.submitRequestLoan();
    cy.assertRequestLoanSuccess();

    cy.screenshotWithDate?.('Standard Request Loan', 'AFTER');
  });

  it('Negative Request Loan', () => {
    cy.screenshotWithDate?.('Negative Request Loan', 'BEFORE');

    cy.submitRequestLoan();
    cy.assertRequestLoanError();

    cy.screenshotWithDate?.('Negative Request Loan', 'AFTER');
  });
});
