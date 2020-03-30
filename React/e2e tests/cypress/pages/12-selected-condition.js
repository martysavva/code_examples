/* eslint-disable */



export default ({decision} = '') => {


  // REFER
  if(decision === 'refer') {
    describe('Your Left Anterior Hemiblock', () => {

      it('Should enter details for Left Anterior Hemiblock', () => {

        cy.get('.text-input').type('details about my condition').should('have.value', 'details about my condition');
        cy.get('.text-input').blur();
      });

      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn').wait(6000).click();
      });

    });
  }



  // EVIDENCE REQUIRED
  if(decision === 'evidence_required') {
    describe('Your Boil', () => {

      it('Select YES to Have you received any treatment', () => {

        cy.get('.btn').contains('Yes').wait(1000).click();
      });

      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn').wait(6000).click();
      });

    });
  }



  // NON-STANDARD - 'EXCLUDED' and 'LOADED and EXCLUDED'
  if(decision === 'non_standard_excluded' || decision === 'non_standard_loaded_excluded') {
    describe('Your Blindness in both eyes', () => {

      it('Select Blind since birth or infancy', () => {
        cy.get('.customer1BlindnessBlind_Result .btn').contains('Blind since birth or infancy').wait(1000).click();
      });

      it('Select No on blindness confined to just one eye', () => {
        cy.get('.customer1BlindnessBlind_OneEye .btn').contains('No').wait(1000).click();
      });

      it('Select None of the Above on Have you had any of the following', () => {
        cy.get('.customer1BlindnessBlind_DisordDiag .btn').contains('None of the above').wait(1000).click();
      });

      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn').wait(6000).click();
      });

    });
  }



  // POSTPONE
  if(decision === 'postpone') {
    describe('Your Cancer', () => {

      it('Select Skin Cancer from Was the initial site or type...', () => {
        cy.get('.customer1Cancer_NOSNOSCancer_Site1 .btn').contains('Skin cancer (other than melanoma)').wait(1000).click();
      });

      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn').wait(6000).click();
      });

    });
  }



}
