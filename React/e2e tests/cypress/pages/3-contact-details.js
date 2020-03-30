/* eslint-disable */

export default (navigate = true) => {


  describe('contact details page', () => {

    it('Should select a title', () => {
      cy.get('.customer1title .selection', {timeout:10000}).click().wait(1000).get('.customer1title .options ul li').contains('Mr').click();
    });

    it('Should enter the contact number', () => {
      cy.get('.customer1CONTACT_NUMBER .text-input').type('01988787667').should('have.value', '01988787667');
    });

    it('Should enter the email address', () => {
      cy.get('.customer1EMAIL_ADDRESS .text-input').type('jimmy-jones2000@underwriteme.co.uk').should('have.value', 'jimmy-jones2000@underwriteme.co.uk');
    });

    it('Should select a marital status', () => {
      cy.get('.customer1maritalStatus .selection').click().get('.customer1maritalStatus .options ul li').contains('Married').click();
    });

    it('Should select a residential status', () => {
      cy.get('.customer1UK_RESIDENT .btn').contains('Yes').click();
    });

    it('Should search and save an address', () => {
      cy.get('.customer1ADDRESS .address-auto-container .postcode')
        .type('E97NE')
        .should('have.value', 'E97NE');

        cy.get('.customer1ADDRESS .btn').contains('Search').click()
          .get('.customer1ADDRESS .selection').click().get('.customer1ADDRESS .options ul li').contains('1 Earlston Grove').click();
    });

    if (navigate) {
      it('should hit the next button', () => {
        cy.get('.page-footer .next-btn').click();
      });
    }
  })
}
