/// <reference types="cypress" />

describe('Parabank Registration Test Cases', function () {

  beforeEach(function () {
    cy.visitParabankRegistration();
    cy.screenshotWithDate?.(this.currentTest.title, 'BEFORE');
  });

  afterEach(function () {
    cy.screenshotWithDate?.(this.currentTest.title, 'AFTER');
  });

  it('Registration UI', () => {
    cy.checkRegistrationFormUI();
    cy.checkRegistrationLabels();
    cy.checkRegistrationInputsEmpty();
    cy.get('[colspan="2"] > .button').should('be.visible').and('be.enabled');
  });

  it('Standard Registration', () => {
    cy.fixture('TestData').then(user => {
      cy.fillRegistrationForm(user);
      cy.submitRegistrationForm();
      cy.checkRegistrationSuccess();
    });
  });

  it('Negative Registration', () => {
    cy.fixture('TestData').then(() => {
      cy.submitRegistrationForm();
      cy.checkRegistrationRequiredErrors();
    });
  });
});
