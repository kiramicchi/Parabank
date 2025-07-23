///<reference types="cypress" />

describe('User Login Function with various credentials', function() {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.url().should('include', '/auth/login');
    });


    it('Should allow users to login with valid credentials', function() {
        //INPUT FIELDS
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');

        //LOGIN BUTTON
        cy.get('.oxd-button').should('be.visible').and('be.enabled');
        cy.get('.oxd-button').click();

        // Assert that login was successful by checking URL
        cy.url().should('include', '/dashboard');
    });

    it('Should not allow users to login with invalid credentials', function() {
        //INPUT FIELDS
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin123');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin');

        //LOGIN BUTTON
        cy.get('.oxd-button').should('be.visible').and('be.enabled');
        cy.get('.oxd-button').click();

        // Assert that login was unsuccessful by checking URL
        cy.url().should('include', '/auth/login');

        //Assert that the unsuccessful login with invalid credentials is notified to the user
        cy.get('.oxd-alert').should('be.visible');
        cy.get('.oxd-alert-content > .oxd-text').should('be.visible').and('have.text', "Invalid credentials");
    });

    it('Should not allow users to login with blank credentials', function() {
        //INPUT FIELDS
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').invoke('val', '');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').invoke('val', '');

        //LOGIN BUTTON
        cy.get('.oxd-button').should('be.visible').and('be.enabled');
        cy.get('.oxd-button').click();

        // Assert that login was unsuccessful by checking URL
        cy.url().should('include', '/auth/login');

        //Assert that the user is notified about blank input fields
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('be.visible').and('have.text', "Required");
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('be.visible').and('have.text', "Required");
    });
});