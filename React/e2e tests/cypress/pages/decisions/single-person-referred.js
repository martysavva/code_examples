/* eslint-disable */

export default () => {

  describe('Decision - referred - single person (no CI)', () => {


    it('.should() - Have correct page title', () => {
      cy.get('.underwritten-result h1', {timeout:15000}).should('contain', 'Our decision');
    });

    it('.should() - Have correct decision class on title', () => {
      cy.get('.decision-box h2').should('have.class', 'warning');
    });

    it('.should() - Have correct decision text in title', () => {
      cy.get('.decision-box h2').should('contain', 'We will need some further information from you');
    });


  })
}
