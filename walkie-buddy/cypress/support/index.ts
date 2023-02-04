declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get a DOM element by data-test attribute.
       * @example cy.getByTestId('element')
       */
      getByTestId(id: string): Chainable<JQuery<HTMLElement>>;
      populateForm(name: string, phone: string, email: string): Chainable<void>;
    }
  }
}

export {};
