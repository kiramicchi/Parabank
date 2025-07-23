///<reference types="cypress" />
 
describe('User Login Function with various credentials', function() {

    beforeEach(function () {
      cy.visit('https://www.saucedemo.com/');
      cy.screenshotWithDate(this.currentTest.title, 'BEFORE');
    });

    afterEach(function () {
      cy.screenshotWithDate(this.currentTest.title, 'AFTER');
    });

    it('Standard User Login', function() {
        //INPUT FIELDS
        cy.get('[data-test="username"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="password"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        //LOGIN BUTTON
        cy.get('[data-test="login-button"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="login-button"]').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','/inventory.html');
    });

    it('Locked Out User Login', function() {
        //INPUT FIELDS
        cy.get('[data-test="username"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="password"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        //LOGIN BUTTON
        cy.get('[data-test="login-button"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="login-button"]').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','saucedemo.com');
    });

    it('Problem User Login', function() {
        //INPUT FIELDS
        cy.get('[data-test="username"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="password"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="username"]').type('problem_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        //LOGIN BUTTON
        cy.get('[data-test="login-button"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="login-button"]').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','/inventory.html');
    });

    it('Performance Glitch User Login', function() {
        //INPUT FIELDS
        cy.get('[data-test="username"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="password"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="username"]').type('performance_glitch_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        //LOGIN BUTTON
        cy.get('[data-test="login-button"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="login-button"]').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','/inventory.html');
    });

    it('Error User Login', function() {
        //INPUT FIELDS
        cy.get('[data-test="username"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="password"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="username"]').type('error_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        //LOGIN BUTTON
        cy.get('[data-test="login-button"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="login-button"]').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','/inventory.html');
    });

    it('Visual User Login', function() {
        //INPUT FIELDS
        cy.get('[data-test="username"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="password"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="username"]').type('visual_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        //LOGIN BUTTON
        cy.get('[data-test="login-button"]').should('be.visible').and('be.enabled');
        cy.get('[data-test="login-button"]').click();

        // Assert that login was successful by checking URL
        cy.url().should('include','/inventory.html');
    });
});
