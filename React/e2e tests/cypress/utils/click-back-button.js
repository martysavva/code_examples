/* eslint-disable */
export default () => {
  describe('Back Button', () => {
    it('Should find and click the back button', () => {
      cy.get('.page-footer .back-btn', {timeout: 1000000}).click();
    });
  });
};
