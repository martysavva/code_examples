/* eslint-disable */

export default ({decision, addedCi}) => {

  describe('Personal Details', () => {
    it('should set the height', () => {

      switch(decision) {
        case 'non_standard_loaded':
          cy.get('.customer1HEIGHT .text-input.md', {timeout: 10000}).type('1.78');
          break;
        case 'non_standard_loaded_excluded':
          cy.get('.customer1HEIGHT .text-input.md', {timeout: 10000}).type('1.78');
          break;
        default: // standard decision
          cy.get('.customer1HEIGHT .text-input.md', {timeout: 10000}).type('2');
      }


    });

    it('should set the weight', () => {

      switch(decision) {
        case 'non_standard_loaded':
          cy.get('.customer1WEIGHT_MALE .text-input.md').type('105');
          break;
        case 'non_standard_loaded_excluded':
          cy.get('.customer1WEIGHT_MALE .text-input.md').type('105');
          break;
        case 'decline':
          cy.get('.customer1WEIGHT_MALE .text-input.md').type('205');
          break;
        default: // standard decision
          cy.get('.customer1WEIGHT_MALE .text-input.md').type('95');
      }

    });


    it('should set the smoker status', () => {
      cy.get('.customer1NON_SMOKER_STATUS .btn').contains('Life-long non smoker').click();
    });

    it('should set the job to', () => {
      cy.get('.customer1OCCUPATION .text-input').type('secr').wait(1000).get('.customer1OCCUPATION .dropdown li').contains('Secretary').click();
      cy.get('.customer1OCCUPATION .text-input').focus().blur();
    })

    it('should set the family history life', () => {

      const isCi = (decision === 'non_standard_excluded' || decision === 'non_standard_loaded_excluded' || addedCi);
      const key = (isCi) ? '.customer1FAMILY_HISTORY_CI_IP_TPD' : '.customer1FAMILY_HISTORY_LIFE';
      cy.get(`${key} .btn`, {timeout:100000}).contains('None of these').wait(3000).click();
      //
      // switch(decision) {
      //   case 'non_standard_excluded':
      //     cy.get(`${key} .btn`, {timeout:100000}).contains('None of these').wait(3000).click();
      //     break;
      //   case 'non_standard_loaded_excluded':
      //     cy.get('.customer1FAMILY_HISTORY_CI_IP_TPD .btn', {timeout:100000}).contains('None of these').wait(3000).click();
      //     break;
      //   default: // standard decision
      //
      // }

    });

    it('should hit the next button', () => {
      cy.get('.page-footer .next-btn').wait(6000).click();
    });
  })
}
