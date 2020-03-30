/* eslint-disable */
export default ({decision, addedCi, expectedResults, shouldNavigate, ciAvailable}) => {
  describe('quick quote results', () => {

    //decisions
    //non-standard: 'excluded' and 'loaded and excluded'
    if(decision === 'non_standard_excluded' || decision === 'non_standard_loaded_excluded') {

      // clicking this button will add 10% by default
      it('should click Add Cover button', () => {
        cy.get('.add-cover', {timeout:30000}).contains('Add cover').wait(2000).click();
      });
    }


    if (addedCi) {
      // clicking this button will add 10% by default
      it('should click Add Cover button', () => {
        cy.get('.add-cover', {timeout:30000}).contains('Add cover').wait(2000).click();
      });
    }

    if (expectedResults) {
      it('should have the correct sum assured', () => {
        cy.get('.term-value', {timeout:50000}).contains(expectedResults.sumAssured);
      });

      it('should have the correct to pay per month', () => {
        cy.get('.ppm', {timeout:50000}).contains(expectedResults.payEachMonth);
      });
    }

    if (shouldNavigate) {
      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn', {timeout: 1000000}).wait(2000).click();
      });
    }

    if (ciAvailable) {
      it ('should have the ci button', () => {
        cy.get('.add-cover')
      })
    }
  });
}
