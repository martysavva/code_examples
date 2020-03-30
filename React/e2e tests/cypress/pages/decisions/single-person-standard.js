/* eslint-disable */

export default () => {

  describe('Decision - standard - single person (no CI)', () => {


    it('.should() - Have correct page title', () => {
      cy.get('.underwritten-result h1', {timeout:15000}).should('contain', 'Our decision');
    });

    it('.should() - Have correct decision class on title', () => {
      cy.get('.decision-box h2').should('have.class', 'standard');
    });

    it('.should() - Have correct decision text in title', () => {
      cy.get('.decision-box h2').should('contain', 'Congratulations, your confirmed price is below');
    });

  })
}
