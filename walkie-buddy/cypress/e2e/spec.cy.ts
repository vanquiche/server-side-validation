describe('User Journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Sign Up form renders correctly', () => {
    cy.getByTestId('signup-form').should('exist');
    cy.getByTestId('textfield-input-name').should('exist');
    cy.getByTestId('textfield-input-phone').should('exist');
    cy.getByTestId('textfield-input-email').should('exist');
  });

  it('Validates fields', () => {
    cy.populateForm('Steve', '4257491559', 'steve@email.com');

    cy.getByTestId('validation-name-valid').should('exist');
    cy.getByTestId('validation-phone-valid').should('exist');
    cy.getByTestId('validation-email-valid').should('exist');
  });

  it('Invalidate fields', () => {
    cy.populateForm('123', 'steve', 'steve#@$');

    cy.getByTestId('validation-name-invalid').should('exist');
    cy.getByTestId('validation-phone-invalid').should('exist');
    cy.getByTestId('validation-email-invalid').should('exist');
  });

  it('Can reset form', () => {
    cy.getByTestId('textfield-input-name').type('Steve');
    cy.getByTestId('button-cancel').click();
    cy.getByTestId('textfield-input-name').should('have.value', '');
  });

  it('Can submit form if all fields are validated', () => {
    cy.populateForm('Steve', '4257491559', 'steve@email.com');
    cy.getByTestId('button-submit').click();
    cy.getByTestId('modal-dialog').should('exist');
  });

  it('Cannot submit if one or all fields are not validated', () => {
    cy.populateForm('Clover', '123', 'clover@nobody.com');
    cy.getByTestId('button-submit').should('be.disabled');
  });
});
