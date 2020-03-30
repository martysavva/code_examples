/* eslint-disable */

export default () => {

  describe('Payment Page', () => {
    it('should select yes to authorised account holder', () => {
      cy.get('.paymentAUTHORISED_ACCOUNT', {timeout:10000}).click({multiple: true}).wait(500);
    });

    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });
  });
};
