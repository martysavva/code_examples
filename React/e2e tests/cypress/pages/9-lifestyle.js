/* eslint-disable */

export default () => {

  describe('Lifestyle', () => {



    it('select NO on Physical Hobby', () => {
      cy.get('.customer1PURSUITS_LV .btn', {timeout:10000}).contains('No').click();
    });

    it('select NO on Ride a Motorbike', () => {
      cy.get('.customer1MOTOR_BIKE .btn').contains('No').wait(1000).click();
    });

    it('select NO on Banned from driving', () => {
      cy.get('.customer1DRIVING_BAN .btn').contains('No').wait(1000).click();
    });

    it('select NO on Lived outside of UK', () => {
      cy.get('.customer1TRAVELPAST_LV .btn').contains('No').wait(1000).click();
    });

    it('select NO on Intend to live outside of UK', () => {
      cy.get('.customer1TRAVELFUTURE_LV .btn').contains('No').wait(1000).click();
    });

    it('select NO on Exceed total cover', () => {
      cy.get('.customer1JUMBO_LIMITS .btn').contains('No').wait(1000).click();
    });





    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });


  })
}
