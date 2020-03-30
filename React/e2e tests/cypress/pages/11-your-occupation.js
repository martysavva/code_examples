/* eslint-disable */

export default () => {

  describe('Your Occupation)', () => {



    it('select None of the above', () => {
      cy.get('.btn').contains('None of the above').wait(1000).click();
    });


    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });


  })
}
