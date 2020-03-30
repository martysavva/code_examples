/* eslint-disable */

export default () => {

  describe('Have you ever had', () => {



    it('select NO on Mental health issue', () => {
      cy.get('.customer1MENTAL_SERIOUS .btn', {timeout:10000}).contains('No').click();
    });

    it('select NO on Brain or Spinal tumour', () => {
      cy.get('.customer1CANCER .btn').contains('No').wait(1000).click();
    });

    it('select NO on heart or arteries', () => {
      cy.get('.customer1HEART .btn').contains('No').wait(1000).click();
    });

    it('select NO on stroke', () => {
      cy.get('.customer1STROKE .btn').contains('No').wait(1000).click();
    });

    it('select NO on HIV/AIDS', () => {
      cy.get('.customer1HIV_HEP .btn').contains('No').wait(1000).click();
    });



    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });


  })
}
