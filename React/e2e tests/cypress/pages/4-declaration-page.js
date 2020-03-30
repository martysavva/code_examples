/* eslint-disable */

export default () => {



  describe('declaration page', () => {
    it('should select the declaration', () => {
      cy.get('.custom_checkbox', {timeout:10000}).click();
    });

    it('should hit the next button', () => {
      cy.wait(5000).get('.page-footer .next-btn').click();
    });
  });
};
