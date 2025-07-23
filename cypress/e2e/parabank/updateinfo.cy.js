/// <reference types="cypress" />

describe('Parabank Update Contact Info Test Cases', function () {
  beforeEach(function () {
    cy.fixture('TestData').then(user => {
      cy.visitParabankAndLogin(user);
      cy.goToUpdateInfoPage();
    });

    cy.screenshotWithDate?.(this.currentTest.title, 'BEFORE');
  });

  afterEach(function () {
    cy.screenshotWithDate?.(this.currentTest.title, 'AFTER');
  });

  it('Update Contact Info UI', () => {
    cy.checkUpdateInfoUI();
  });

  it('Standard Update Contact Info', () => {
    const newInfo = {
      firstName: 'Kiramii',
      lastName: 'Star',
      address: 'Shibuyaa',
      city: 'Tokyo',
      state: 'Tokyo',
      zip: '121423',
      phone: '121423567'
    };

    cy.updateContactInfo(newInfo);
    cy.checkUpdateSuccess(newInfo.firstName);
  });

  it('Negative Update Contact Info', () => {
    cy.clearAllContactFieldsAndSubmit();
    cy.checkRequiredUpdateErrors();
  });
});
