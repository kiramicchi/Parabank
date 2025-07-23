class RegistrationPage {
    visit() {
      cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    }

    // form container assertions
    checkFormUI() {
      cy.get('#rightPanel').should('be.visible');
      cy.get('.title').should('be.visible');
      cy.get('#rightPanel > p').should('be.visible');
      cy.get('.form2').should('be.visible');
    }

    // form labels assertions
    checkLabels() {
        const labelChecks = [
            { selector: ':nth-child(1) > [align="right"] > b', text: 'First Name:' },
            { selector: ':nth-child(2) > [align="right"] > b', text: 'Last Name:' },
            { selector: ':nth-child(3) > [align="right"] > b', text: 'Address:' },
            { selector: ':nth-child(4) > [align="right"] > b', text: 'City:' },
            { selector: ':nth-child(5) > [align="right"] > b', text: 'State:' },
            { selector: ':nth-child(6) > [align="right"] > b', text: 'Zip Code:' },
            { selector: ':nth-child(7) > [align="right"] > b', text: 'Phone #:' },
            { selector: ':nth-child(8) > [align="right"] > b', text: 'SSN:' },
            { selector: ':nth-child(10) > [align="right"] > b', text: 'Username:' },
            { selector: ':nth-child(11) > [align="right"] > b', text: 'Password:' },
            { selector: ':nth-child(12) > [align="right"] > b', text: 'Confirm:' },
        ];

        labelChecks.forEach(({ selector, text }) => {
            cy.get(selector).should('be.visible').and('have.text', text);
        });
    }

    // check inputs are visible + enabled + empty
    checkInputsEmpty() {
      const ids = [
        'customer.firstName', 'customer.lastName', 'customer.address.street',
        'customer.address.city', 'customer.address.state', 'customer.address.zipCode',
        'customer.phoneNumber', 'customer.ssn', 'customer.username',
        'customer.password', 'repeatedPassword'];

      ids.forEach(id => {
        cy.get(`input[id='${id}']`).should('be.visible').and('be.enabled').and('be.empty');
      });
    }

    fillForm(user) {
      cy.get("input[id='customer.firstName']").type(user.FirstName);
      cy.get("input[id='customer.lastName']").type(user.LastName);
      cy.get("input[id='customer.address.street']").type(user.Address);
      cy.get("input[id='customer.address.city']").type(user.City);
      cy.get("input[id='customer.address.state']").type(user.State);
      cy.get("input[id='customer.address.zipCode']").type(user.ZipCode);
      cy.get("input[id='customer.phoneNumber']").type(user.PhoneNumber);
      cy.get("input[id='customer.ssn']").type(user.ssn);
      cy.get("input[id='customer.username']").type(user.Username);
      cy.get("input[id='customer.password']").type(user.Password);
      cy.get("input[id='repeatedPassword']").type(user.Password);
    }

    submit() {
      cy.get('[colspan="2"] > .button').click();
    }

    checkSuccess() {
      cy.url().should('include', 'parabank.parasoft.com/parabank/register.htm');
      cy.get('.title').should('be.visible').and('include.text', 'Welcome');
      cy.get('#rightPanel > p').should('be.visible').and('have.text', 'Your account was created successfully. You are now logged in.');
    }

    checkRequiredErrors() {
      for (const i of [1,2,3,4,5,6,8,10,11,12]) {
        cy.get(`:nth-child(${i}) > [width="50%"]`).should('be.visible').and('include.text','required');
      }
    }
}

export default new RegistrationPage();