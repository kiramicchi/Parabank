/// <reference types="cypress" />

describe('Parabank Open New Account Test Cases', function () {
  beforeEach(function () {
    cy.fixture('TestData').then(user => {
      cy.visitParabankAndLogin(user);
      cy.goToOpenAccountPage();
    });

    cy.screenshotWithDate?.(this.currentTest.title, 'BEFORE');
  });

  afterEach(function () {
    cy.screenshotWithDate?.(this.currentTest.title, 'AFTER');
  });

  it('Open New Account UI', () => {
    cy.checkOpenAccountUI();
  });

  it('Standard Open New Account', () => {
    cy.selectAccountType('SAVINGS');
    cy.selectFromAccount(0);
    cy.submitOpenAccountForm();
    cy.checkOpenAccountSuccessAndValidateID();
  });
});
