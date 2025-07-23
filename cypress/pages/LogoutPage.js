class LogoutPage {
  visit() {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
  }

  login(user) {
    cy.get('form > :nth-child(2) > .input').should('be.visible').and('be.empty').type(user.Username);
    cy.get(':nth-child(4) > .input').should('be.visible').and('be.empty').type(user.Password);
    cy.get(':nth-child(5) > .button').click();

    cy.url().should('include', '/overview.htm');
  }

  logout() {
    cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').click();
    cy.url().should('include', '/index.htm');
  }
}

export default new LogoutPage();