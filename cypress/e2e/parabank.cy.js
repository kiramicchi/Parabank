///<reference types="cypress" />

describe('Parabank Test Cases', function() {

    beforeEach(function () {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.screenshotWithDate(this.currentTest.title, 'BEFORE');
    });

    afterEach(function () {
      cy.screenshotWithDate(this.currentTest.title, 'AFTER');
    });

    it('Registration', () => {
        cy.fixture('TestData').then((Userinput) => {
            cy.get("input[id='customer.firstName']").should('be.visible').and('be.empty').type(Userinput.FirstName);
            cy.get("input[id='customer.lastName']").should('be.visible').and('be.empty').type(Userinput.LastName);
            cy.get("input[id='customer.address.street']").should('be.visible').and('be.empty').type(Userinput.Address);
            cy.get("input[id='customer.address.city']").should('be.visible').and('be.empty').type(Userinput.City);
            cy.get("input[id='customer.address.state']").should('be.visible').and('be.empty').type(Userinput.State);
            cy.get("input[id='customer.address.zipCode']").should('be.visible').and('be.empty').type(Userinput.ZipCode);
            cy.get("input[id='customer.phoneNumber']").should('be.visible').and('be.empty').type(Userinput.PhoneNumber);
            cy.get("input[id='customer.ssn']").should('be.visible').and('be.empty').type(Userinput.ssn);
            cy.get("input[id='customer.username']").should('be.visible').and('be.empty').type(Userinput.Username);
            cy.get("input[id='customer.password']").should('be.visible').and('be.empty').type(Userinput.Password);
            cy.get("input[id='repeatedPassword']").should('be.visible').and('be.empty').type(Userinput.Password);
        });

        cy.get('[colspan="2"] > .button').click();

        // Assert that registration was successful by checking URL
        cy.url().should('include','parabank.parasoft.com/parabank/register.htm');
    });

    it('Open New Account', () => {
        cy.fixture('TestData').then((Userinput) => {
            cy.get('form > :nth-child(2) > .input').should('be.visible').and('be.empty').type(Userinput.Username);
            cy.get(':nth-child(4) > .input').should('be.visible').and('be.empty').type(Userinput.Password);
        });

        cy.get(':nth-child(5) > .button').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','/overview.htm');

        //Open New Account
        cy.get('#leftPanel > ul > :nth-child(1) > a').should('be.visible');
        cy.get('#leftPanel > ul > :nth-child(1) > a').click();

        // Assert that the user is redirected to the correct page
        cy.url().should('include','/openaccount.htm');

        cy.get('#type').should('be.visible').and('be.enabled');
        cy.get('#fromAccountId').should('be.visible').and('be.enabled');
        cy.get('#type').select('SAVINGS');  
        cy.get('#fromAccountId').find('option').eq(0).then(option => {
            cy.get('#fromAccountId').select(option.val());
        });

        cy.get('form > div > .button').click();

        cy.get('#openAccountResult > .title').should('be.visible');
    });
    
    it('Update Contact Info', () => {
        cy.fixture('TestData').then((Userinput) => {
            cy.get('form > :nth-child(2) > .input').should('be.visible').and('be.empty').type(Userinput.Username);
            cy.get(':nth-child(4) > .input').should('be.visible').and('be.empty').type(Userinput.Password);
        });

        cy.get(':nth-child(5) > .button').click();

        //Update Contact Info
        cy.get('#leftPanel > ul > :nth-child(6) > a').should('be.visible');
        cy.get('#leftPanel > ul > :nth-child(6) > a').click();

        // Assert that the user is redirected to the correct page
        cy.url().should('include','/updateprofile.htm');

        //Check input fields
        cy.get('input[id="customer.firstName"]').should('be.visible');
        cy.get('input[id="customer.lastName"]').should('be.visible');
        cy.get('input[id="customer.address.street"]').should('be.visible');
        cy.get('input[id="customer.address.city"]').should('be.visible');
        cy.get('input[id="customer.address.state"]').should('be.visible');
        cy.get('input[id="customer.address.zipCode"]').should('be.visible');
        cy.get('input[id="customer.phoneNumber"]').should('be.visible');

        //change info
        cy.get('input[id="customer.firstName"]').type('Kiramii');
        cy.get('input[id="customer.lastName"]').type('Star');
        cy.get('input[id="customer.address.street"]').type('Shibuyaa');
        cy.get('input[id="customer.address.city"]').type('Tokyo');
        cy.get('input[id="customer.address.state"]').type('Tokyo');
        cy.get('input[id="customer.address.zipCode"]').type('121423');
        cy.get('input[id="customer.phoneNumber"]').type('121423567');
        cy.get('[colspan="2"] > .button').click();


        cy.url().should('include','/updateprofile.htm');
        cy.get('#updateProfileResult > .title').should('be.visible');
        
    }); 

    it('Logout', () => {
        cy.fixture('TestData').then((Userinput) => {
            cy.get('form > :nth-child(2) > .input').should('be.visible').and('be.empty').type(Userinput.Username);
            cy.get(':nth-child(4) > .input').should('be.visible').and('be.empty').type(Userinput.Password);
        });

        cy.get(':nth-child(5) > .button').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','/overview.htm');

        cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible');
        cy.get('#leftPanel > ul > :nth-child(8) > a').click();

        // Assert that logout was successful by checking URL
        cy.url().should('include','/index.htm');
    });
});