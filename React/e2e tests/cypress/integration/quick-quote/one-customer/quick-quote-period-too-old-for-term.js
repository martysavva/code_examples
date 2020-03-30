/* eslint-disable */

import quickQuotePage from '../../../pages/1-quick-quote-page';

quickQuotePage({
  sumAssured: '1500000',
  coverLength: '25',
  customer1: {
    dateOfBirth: {
      day: '12',
      month: '01',
      year: '1938'
    }
  }
})

 const am = () => {
   describe('Too Old', () => {
     it('should show the age modification popup', () => {
       cy.get('.error-pop-over').should('be.visible');
     });

     it('should show the correct info text', () => {
       const text = 'Unfortunately we are unable to cover you';
       cy.get('.error-pop-over .paragraph').contains(text)
     })

     it('should show the correct btn text', () => {
       const text = 'Close application';
       cy.get('.error-pop-over .btn').contains(text)
     })
   })
};
am()
