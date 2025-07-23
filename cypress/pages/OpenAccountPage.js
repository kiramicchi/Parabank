class OpenAccountPage {
  visit() {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
  }

  login(user) {
    cy.get('form > :nth-child(2) > .input').should('be.visible').and('be.empty').type(user.Username);
    cy.get(':nth-child(4) > .input').should('be.visible').and('be.empty').type(user.Password);
    cy.get(':nth-child(5) > .button').click();
  }

  goToOpenAccountPage() {
    cy.get('#leftPanel > ul > :nth-child(1) > a')
      .should('be.visible').and('contain.text', 'Open New Account').click();
    cy.url().should('include', '/openaccount.htm');
  }

  checkUI() {
    cy.get('#rightPanel').should('be.visible');
    cy.get('#openAccountForm > .title').should('be.visible').and('have.text', 'Open New Account');
    cy.get('form > :nth-child(1) > b').should('be.visible');
    cy.get(':nth-child(5) > b').should('be.visible');
    cy.get('#type').should('be.visible').and('be.enabled');
    cy.get('#fromAccountId').should('be.visible').and('be.enabled');
    cy.get('form > div > .button').should('be.visible').and('be.enabled');
  }

  selectAccountType(type = 'SAVINGS') {
    cy.get('#type').select(type);
  }

  selectFromAccount(index = 0) {
    cy.get('#fromAccountId').find('option').eq(index).then(option => {
      cy.get('#fromAccountId').select(option.val());
    });
  }

  submit() {
    cy.get('form > div > .button').click();
  }

  checkSuccessAndValidateID() {
    cy.get('#openAccountResult > .title').should('be.visible').and('have.text', 'Account Opened!');
    cy.get('#openAccountResult > :nth-child(2)').should('be.visible').and('contain.text', 'Congratulations');
    cy.get('#openAccountResult > :nth-child(3)').should('be.visible').and('contain.text', 'Your new account number');

    cy.get('#newAccountId')
      .invoke('text')
      .then((newAccountId) => {
        const id = newAccountId.trim();

        cy.log(`Generated Account ID: ${id}`);

        cy.visit(`https://parabank.parasoft.com/parabank/activity.htm?id=${id}`);

        cy.get('#accountId', { timeout: 10000 })
          .should(($el) => {
            const text = $el.text().trim();
            expect(text).to.eq(id);
          });
      });
  }
}

export default new OpenAccountPage();