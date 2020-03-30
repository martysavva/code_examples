/* eslint-disable */

import quickQuotePage from '../../../pages/1-quick-quote-page';

quickQuotePage({
  sumAssured: '1500000',
  coverLength: '25',
  customer1: {
    dateOfBirth: {
      day: '01',
      month: '01',
      year: '1940'
    }
  }
})

const am = () => {
   describe('age mod', () => {
     it('should show the age modification popup', () => {
       cy.get('.error-pop-over', {timeout: 30000}).should('be.visible');
     });

     it('should show the correct info text', () => {
       const text = 'We are unable to provide this term as Jimmy will be over the maximum age of 84 at the end of the policy. The maximum term that we can provide is 6 years';
       cy.get('.error-pop-over .paragraph').contains(text)
     })

     it('should show the correct btn text', () => {
       const text = 'Change cover to 6 years';
       cy.get('.error-pop-over .btn').contains(text)
     })

     it('should click the change cover button', () => {
       cy.get('.error-pop-over .btn').click();
     });

     it('should modify the cover length', () => {
       cy.get('.customer1COVER_LENGTH input.text-input').should('have.value', '6');
     });
   })
};
am();
