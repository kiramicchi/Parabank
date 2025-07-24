/// <reference types="cypress" />

import LogoutPage from '../../pages/LogoutPage';

describe('Parabank Logout Test Case', function () {
  it('Standard Logout', function () {
    cy.fixture('TestData').then(user => {
      LogoutPage.visit(); // navigate to the login/register page
      LogoutPage.login(user); // login with credentials

      cy.screenshotWithDate?.('Standard Logout', 'BEFORE');

      LogoutPage.logout(); // perform logout

      cy.screenshotWithDate?.('Standard Logout', 'AFTER');
    });
  });
});
