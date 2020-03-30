/* eslint-disable */

export default ({decision} = '') => {



  describe('Last 5 years health', () => {

    it('select NO on Raised blood pressure', () => {
      cy.get('.customer1BP_LIPID_CHEST .btn', {timeout:10000}).contains('No').click();
    });

    it('select NO on Diabetes', () => {
      cy.get('.customer1DIABETES .btn').contains('No').wait(1000).click();
    });

    it('select NO on Anxiety', () => {
      cy.get('.customer1MENTAL_MINOR .btn').contains('No').wait(1000).click();
    });


    switch(decision) {
      case 'refer':
        it('select YES on Asthma', () => {
          cy.get('.customer1LUNG .btn').contains('Yes').wait(1000).click();
        });

        it('select Left Anterior Hemiblock ', () => {
          cy.get('.customer1WHICH_LUNG .text-input').type('left').wait(1000).get('.customer1WHICH_LUNG .dropdown li').contains('Left anterior hemiblock').click();
        });
        break;
      default: // standard decision
        it('select NO on Asthma', () => {
          cy.get('.customer1LUNG .btn').contains('No').wait(1000).click();
        });
    }






    it('select NO on Bowel or Digestive system', () => {
      cy.get('.customer1BOWEL .btn').contains('No').wait(1000).click();
    });

    it('select NO on Kidneys or Bladder', () => {
      cy.get('.customer1KIDNEY_MALE .btn').contains('No').wait(1000).click();
    });

    it('select NO on Liver or Pancreas', () => {
      cy.get('.customer1LIVER .btn').contains('No').wait(1000).click();
    });

    it('select NO on Multiple Sclerosis', () => {
      cy.get('.customer1NEURO .btn').contains('No').wait(1000).click();
    });


    switch(decision) {
      case 'non_standard_excluded':

        it('select YES on Issues affecting eyes, ears...', () => {
          cy.get('.customer1HEARING_VISION_DIRECT .btn').contains('Yes').wait(1000).click();
        });

        it('select Blindness in Both Eyes ', () => {
          cy.get('.customer1WHICH_HEARING_VISION .text-input').type('blindness').wait(1000).get('.customer1WHICH_HEARING_VISION .dropdown li').contains('Blindness in both eyes').click();
        });

        it('select NO on Numbness', () => {
          cy.get('.customer1NEURO_SYMPTOMS .btn').contains('No').wait(1000).click();
        });
        break;
      case 'non_standard_loaded_excluded':

        it('select YES on Issues affecting eyes, ears...', () => {
          cy.get('.customer1HEARING_VISION_DIRECT .btn').contains('Yes').wait(1000).click();
        });

        it('select Blindness in Both Eyes ', () => {
          cy.get('.customer1WHICH_HEARING_VISION .text-input').type('blindness').wait(1000).get('.customer1WHICH_HEARING_VISION .dropdown li').contains('Blindness in both eyes').click();
        });

        it('select NO on Numbness', () => {
          cy.get('.customer1NEURO_SYMPTOMS .btn').contains('No').wait(1000).click();
        });
        break;
      default: // standard decision
        //cy.get('.customer1FAMILY_HISTORY_LIFE .btn', {timeout:100000}).contains('None of these').wait(3000).click();
    }

    it('should hit the next button', () => {

      cy.get('.page-footer .next-btn').wait(6000).click();

    });


  })
}
