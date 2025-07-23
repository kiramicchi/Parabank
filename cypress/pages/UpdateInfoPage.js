class UpdateInfoPage {
  visit() {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
  }

  login(user) {
    cy.get('form > :nth-child(2) > .input').should('be.visible').and('be.empty').type(user.Username);
    cy.get(':nth-child(4) > .input').should('be.visible').and('be.empty').type(user.Password);
    cy.get(':nth-child(5) > .button').click();
  }

  goToUpdateInfoPage() {
    cy.get('#leftPanel > ul > :nth-child(6) > a').should('be.visible').and('contain.text', 'Update Contact Info').click();
    cy.url().should('include', '/updateprofile.htm');
  }

  checkUI() {
    cy.get('#rightPanel').should('be.visible');
    cy.get('#updateProfileForm > .title').should('be.visible').and('have.text', 'Update Profile');
    cy.get('.form2').should('be.visible');

    const labels = [
      { selector: ':nth-child(1) > [align="right"] > b', text: 'First Name:' },
      { selector: ':nth-child(2) > [align="right"] > b', text: 'Last Name:' },
      { selector: ':nth-child(3) > [align="right"] > b', text: 'Address:' },
      { selector: ':nth-child(4) > [align="right"] > b', text: 'City:' },
      { selector: ':nth-child(5) > [align="right"] > b', text: 'State:' },
      { selector: ':nth-child(6) > [align="right"] > b', text: 'Zip Code:' },
      { selector: ':nth-child(7) > [align="right"] > b', text: 'Phone #:' }
    ];

    labels.forEach(({ selector, text }) => {
      cy.get(selector).should('be.visible').and('have.text', text);
    });

    [
      'customer.firstName',
      'customer.lastName',
      'customer.address.street',
      'customer.address.city',
      'customer.address.state',
      'customer.address.zipCode',
      'customer.phoneNumber'
    ].forEach(id => {
      cy.get(`input[id='${id}']`).should('be.visible').and('be.enabled')
        .invoke('val').should('not.be.empty');
    });

    cy.get('[colspan="2"] > .button').should('be.visible').and('be.enabled');
  }

  updateInfo(data) {
    cy.get('input[id="customer.phoneNumber"]').clear();
    cy.get('input[id="customer.firstName"]').clear().invoke('val', '');
    cy.get('input[id="customer.firstName"]').clear().type(data.firstName);
    cy.get('input[id="customer.lastName"]').clear().type(data.lastName);
    cy.get('input[id="customer.address.street"]').clear().type(data.address);
    cy.get('input[id="customer.address.city"]').clear().type(data.city);
    cy.get('input[id="customer.address.state"]').clear().type(data.state);
    cy.get('input[id="customer.address.zipCode"]').clear().type(data.zip);
    cy.get('input[id="customer.phoneNumber"]').clear().type(data.phone);
    cy.get('[colspan="2"] > .button').click();
  }

  checkUpdateSuccess(firstName) {
    cy.get('#updateProfileResult > .title').should('be.visible').and('have.text', 'Profile Updated');
    cy.get('#updateProfileResult > p').should('be.visible').and('contain.text', 'updated');
  }

  clearAllFields() {
    [
      'customer.phoneNumber',
      'customer.phoneNumber',
      'customer.firstName',
      'customer.lastName',
      'customer.address.street',
      'customer.address.city',
      'customer.address.state',
      'customer.address.zipCode',
      'customer.phoneNumber'
    ].forEach(id => {
      cy.get(`input[id="${id}"]`).clear();
    });
    cy.get('[colspan="2"] > .button').click();
  }

  checkRequiredErrors() {
    for (const i of [1, 2, 3, 4, 5, 6]) {
      cy.get(`:nth-child(${i}) > [width="50%"]`).should('be.visible').and('include.text', 'required');
    }
  }
}

export default new UpdateInfoPage();