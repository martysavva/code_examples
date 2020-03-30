/* eslint-disable */

export default ({decision}) => {

  describe('Recent health', () => {

    it('select NO on Prescribed medication', () => {
      cy.get('.customer1TREATMENT .btn', {timeout:10000}).contains('No').click();
    });

    it('select NO on Been under follow-up', () => {
      cy.get('.customer1ONGOING_REVIEWS .btn').contains('No').wait(1000).click();
    });

    it('select NO on Referred by specialist', () => {
      cy.get('.customer1INVESTIGATIONS .btn').contains('No').wait(1000).click();
    });


    switch(decision) {
      case 'evidence_required':
        it('select YES on Had any of these symptoms', () => {
          cy.get('.customer1SYMPTOMS .btn').contains('Yes').wait(1000).click();
        });

        it('select Boil', () => {
          cy.get('.customer1WHICH_SYMPTOMS .text-input').type('boil').wait(2000).get('.customer1WHICH_SYMPTOMS .dropdown li').contains('Boil').click();
        });
        break;
      case 'postpone':
        it('select YES on Had any of these symptoms', () => {
          cy.get('.customer1SYMPTOMS .btn').contains('Yes').wait(1000).click();
        });

        it('select Cancer', () => {
          cy.get('.customer1WHICH_SYMPTOMS .text-input').type('cancer').wait(2000).get('.customer1WHICH_SYMPTOMS .dropdown li').contains('Cancer').click();
        });
        break;
      default: // standard decision
        it('select NO on Had any of these symptoms', () => {
          cy.get('.customer1SYMPTOMS .btn').contains('No').wait(1000).click();
        });
    }




    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });


  })
}
