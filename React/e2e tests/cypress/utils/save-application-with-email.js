/* eslint-disable */

const email = 'testing-lv-20000@underwriteme.co.uk';
const password = 'Asdf123!';

export default () => {
  describe('Save App', () => {
    it('Should find and click the save button', () => {
      cy.get('.page-footer .save-btn', {timeout: 1000000}).click();

    });

    it('Sould enter the email', () => {
      cy.get('.save-pop-over .customer1EMAIL_ADDRESS .text-input')
        .type(email).should('have.value', email);
    });

    it('Sould click the next button', () => {
        cy.wait(500).get('.save-pop-over .gts2').click();
    });

    it('Sould enter the password the first time', () => {
      cy.get('.save-pop-over .customer1pw1 .text-input')
        .type(password).should('have.value', password);
    });

    it('Sould enter the password the second time', () => {
      cy.get('.save-pop-over .customer1pw2 .text-input')
        .type(password).should('have.value', password);
    });


    it('Sould click the next button', () => {
        cy.get('.save-pop-over .gts3').click();
    });

  });
};
