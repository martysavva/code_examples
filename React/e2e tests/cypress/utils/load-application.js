/* eslint-disable */

export default ({
  pw,
  returnUrl
}) => {
  describe('retrieve application', () => {
    it('should enter a date of birth of customer 1', () => {
      cy.get('input.day')
        .type('01').should('have.value', '01');

      cy.get('input.month')
        .type('01').should('have.value', '01');

      cy.get('input.year')
        .type('1980').should('have.value', '1980');
    });

    it('should enter the password', () => {
      cy.get('input[type="password"]')
        .type(pw).should('have.value', pw);
    });

    it('should hit the next button', () => {
      cy.wait(1000).get('.page-footer .next-btn').click();
    });

    it('should go to the correct url', () => {
      cy.wait(10000).url().should('eq', returnUrl)
    })
  });
}
