/* eslint-disable */



export default ({decision}) => {




  // POSTPONE
  if(decision === 'postpone') {

    describe('Your Skin Cancer', () => {

      it('select Malignant mole from Which of the following were you diagnosed with', () => {
        cy.get('.customer1Skin_CancerSkinCancer_Type .btn').contains('Malignant mole').wait(1000).click();
      });

      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn').wait(6000).click();
      });

    });

  }
}
