/* eslint-disable */

export default () => {

  describe('Lifestyle (continued)', () => {



    it('.should() - fill in How many pints', () => {
      cy.get('.customer1ALCOHOL_BEER .text-input').type('0').should('have.value', '0');
    });

    it('.should() - fill in How glasses of wine', () => {
      cy.get('.customer1ALCOHOL_WINE .text-input').type('0').should('have.value', '0');
    });

    it('.should() - fill in Measures of Spirits or Bottles', () => {
      cy.get('.customer1ALCOHOL_SPIRITS .text-input').type('0').should('have.value', '0');
    });

    it('.should() - fill in How many other alcoholic drinks', () => {
      cy.get('.customer1ALCOHOL_OTHER .text-input').type('0').should('have.value', '0');
    });

    it('select NO on Advised to Reduce', () => {
      cy.get('.customer1ALCOHOL_ADVICE .btn').contains('No').wait(1000).click();
    });

    it('select NO on Used recreational drugs', () => {
      cy.get('.customer1DRUGS .btn').contains('No').wait(1000).click();
    });





    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });


  })
}
