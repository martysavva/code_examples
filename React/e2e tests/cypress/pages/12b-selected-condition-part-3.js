/* eslint-disable */



export default ({decision}) => {


  // POSTPONE
  if(decision === 'postpone') {

    describe('Your Malignant melanoma or malignant mole', () => {

      it('select No from Has the melanoma ever spread', () => {
        cy.get('.customer1MelanomaMelanoma_Spread .btn').contains('No').wait(1000).click();
      });

      it('select No from Has the cancer recurred', () => {
        cy.get('.customer1MelanomaMelanoma_Recur .btn').contains('No').wait(1000).click();
      });

      it('select Yes from Was the melanoma described as in-situ', () => {
        cy.get('.customer1MelanomaMelanoma_InSitu .btn').contains('Yes').wait(1000).click();
      });

      it('select No from Has the melanoma been successfully removed', () => {
        cy.get('.customer1MelanomaMelanoma_Removed .btn').contains('No').wait(1000).click();
      });

      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn').wait(6000).click();
      });

    });

  }
}
