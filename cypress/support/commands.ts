/// <reference types="cypress" />

require('@4tw/cypress-drag-drop')

declare namespace Cypress {
    interface Chainable {
        getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
}

Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-test=${selector}]`);
});