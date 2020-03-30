/* eslint-disable */

export default () => {

  describe('Decision - evidence-required - single person (no CI)', () => {


    it('.should() - Have correct page title', () => {
      cy.get('.underwritten-result h1', {timeout:15000}).should('contain', 'Our decision');
    });

    it('.should() - Have correct decision class on title', () => {
      cy.get('.decision-box h2').should('have.class', 'evidence_required');
    });

    it('.should() - Have correct decision text in title', () => {
      cy.get('.decision-box h2').should('contain', 'Further evidence required');
    });


  })
}
