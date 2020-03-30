/* eslint-disable */

export default () => {

  describe('application summary', () => {
    it('should select the declaration', () => {
      cy.get('.custom_checkbox', {timeout:10000}).click({multiple: true}).wait(500);
    });

    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });
  });
};
