/* eslint-disable */

import config from '../support/config';

// single customer template
const singleCustomer = (customerKey, customerInfo = {}) => {
  it(`should enter a first name of ${customerKey}`, () => {
    const value = customerInfo.firstName || 'Jimmy';
    cy.get(`.${customerKey}FIRST_NAME input.text-input`)
      .type(value).should('have.value', value);
  });

  it(`should enter a last name of ${customerKey}`, () => {
    const value = customerInfo.lastName || 'Jones';
    cy.get(`.${customerKey}LAST_NAME input.text-input`)
      .type(value).should('have.value', value);
  });

  it(`should enter a date of birth of ${customerKey}`, () => {
    const value = customerInfo.dateOfBirth || {day: '01', month: '01', year: '1980'};
    cy.get(`.${customerKey}DOB input.day`)
      .type(value.day).should('have.value', value.day);

    cy.get(`.${customerKey}DOB input.month`)
      .type(value.month).should('have.value', value.month);

    cy.get(`.${customerKey}DOB input.year`)
      .type(value.year).should('have.value', value.year);
  });

  it(`should select the gender for ${customerKey}`, () => {
    const value = customerInfo.gender || 'Male';
    cy.get(`.${customerKey}GENDER .btn`).contains(value).click();
  });

  it(`should select the smoking status for ${customerKey}`, () => {
    const value = customerInfo.smoker || 'No';
    cy.get(`.${customerKey}SMOKER .btn`).contains(value).click();
  });
}

export default ({
  sumAssured = '100000',
  coverLength = '10',
  secondCustomer = false,
  customer1 = false,
  customer2 = false
}) => {

  describe('first page', () => {

    it('.should() - assert that <title> is correct', () => {
      cy.visit(config.testUrls[config.activeEnv], {timeout: 10000})
      cy.title().should('include', 'LV-D2C')
    });

    it('.should() - fill in cover', () => {
      cy.get('.customer1COVER_AMOUNT .text-input.money')
        .type(sumAssured)
    });

    it('.should() - input the cover length', () => {
      const value = coverLength || '10';
      cy.get('.customer1COVER_LENGTH input.text-input')
        .type(coverLength).should('have.value', coverLength);
    });

    it('.should() - click the level cover button', () => {
      cy.get('.customer1COVER_TYPE .btn').contains('Level').click();
    });

    // customers
    // generate customer 1
    singleCustomer('customer1', customer1);

    if (secondCustomer) {
      // click has customer 2 button
      it('should select the second customer option', () => {
        cy.get('.customer1SECOND_CUSTOMER .btn').contains('Yes').click().wait(100);
      });

      //generate customer 2
      singleCustomer('customer2', customer2);
    }

    it('should hit the next button', () => {
      cy.wait(1000).get('.page-footer .next-btn').click();
    });

  })

}
