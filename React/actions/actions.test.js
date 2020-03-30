/* eslint-disable */

/* Libs */
import React from 'react';
import {expect} from 'chai';
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store'
/* --- Libs */

import * as actions from './actions';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Customers Actions', () => {

  describe('Setters:', () => {

    describe('customerSetCustomerId', () => {
      it('should return the correct payload', () => {
        const payload = '109dk';
        const expectedResult = {
          type: 'CUSTOMER_SET_CUSTOMER_ID',
          payload
        };
        expect(actions.customerSetCustomerId(payload)).to.deep.equal(expectedResult);
      });

    });

    describe('customerSetEmailAddress:', () => {
      it('should return the correct payload', () => {
        const payload = 'test@email.com';
        const expectedResult = {
          type: 'CUSTOMER_SET_EMAIL_ADDRESS',
          payload
        };
        expect(actions.customerSetEmailAddress(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerSetEnquiryId', () => {
      it('should return the correct payload', () => {
        const payload = '9didud8s-dodisiosjd-sidk';
        const expectedResult = {
          type: 'CUSTOMER_SET_ENQUIRY_ID',
          payload
        };
        expect(actions.customerSetEnquiryId(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerSetUWAnswer', () => {
      it('should return the correct payload', () => {
        const payload = 'SMOKER';
        const expectedResult = {
          type: 'CUSTOMER_SET_UW_ANSWER',
          payload
        };
        expect(actions.customerSetUWAnswer(payload)).to.deep.equal(expectedResult);
      });

    });

    describe('customerSetUWAnswers:', () => {
      it('should return the correct payload', () => {
        const payload = 'SMOKER';
        const expectedResult = {
          type: 'CUSTOMER_SET_UW_ANSWERS',
          payload
        };
        expect(actions.customerSetUWAnswers(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerSetInfo', () => {
      it('should return the correct payload', () => {
        const payload = {customer: 'customer1', key: 'firstName', value: 'bill'};
        const expectedResult = {
          type: 'CUSTOMER_SET_INFO',
          payload
        };
        expect(actions.customerSetInfo(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerSetActiveCustomer:', () => {
      it('should return the correct payload', () => {
        const payload = 'customer1';
        const expectedResult = {
          type: 'CUSTOMER_SET_ACTIVE_CUSTOMER',
          payload
        };
        expect(actions.customerSetActiveCustomer(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerSetFullInfo:', () => {
      it('should return the correct payload', () => {
        const payload = {
          key:'key',
          value:'value'
        };
        const expectedResult = {
          type: 'CUSTOMER_SET_FULL_INFO',
          payload
        };
        expect(actions.customerSetFullInfo(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerSetDoctorDetails:', () => {
      it('should return the correct payload', () => {
        const payload = {
          key:'key',
          value:'value'
        };
        const expectedResult = {
          type: 'CUSTOMER_SET_DOCTOR_DETAILS',
          payload
        };
        expect(actions.customerSetDoctorDetails(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerDoctorUpdateName:', () => {
      it('should return the correct payload', () => {
        const payload = {
          key:'key',
          value:'value'
        };
        const expectedResult = {
          type: 'CUSTOMER_DOCTOR_UPDATE_NAME',
          payload
        };
        expect(actions.customerDoctorUpdateName(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerDoctorUpdateSurgeryName:', () => {
      it('should return the correct payload', () => {
        const payload = {
          key:'key',
          value:'value'
        };
        const expectedResult = {
          type: 'CUSTOMER_DOCTOR_UPDATE_SURGERY_NAME',
          payload
        };
        expect(actions.customerDoctorUpdateSurgeryName(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerDoctorUpdateSurgeryContactNumber:', () => {
      it('should return the correct payload', () => {
        const payload = {
          key:'key',
          value:'value'
        };
        const expectedResult = {
          type: 'CUSTOMER_DOCTOR_UPDATE_SURGERY_CONTACT_NUMBER',
          payload
        };
        expect(actions.customerDoctorUpdateSurgeryContactNumber(payload)).to.deep.equal(expectedResult);
      });
    });

    describe('customerResetState:', () => {
      it('should return the correct payload', () => {
        const payload = {
          state:'state'
        };
        const expectedResult = {
          type: 'CUSTOMER_RESET_STATE',
          payload
        };
        expect(actions.customerResetState(payload)).to.deep.equal(expectedResult);
      });
    });


    describe('customerToggleAddress:', () => {
      it('should return the correct payload', () => {
        const payload = {
          key:'key',
          value:'value'
        };
        const expectedResult = {
          type: 'CUSTOMER_TOGGLE_ADDRESS',
          payload
        };
        expect(actions.customerToggleAddress(payload)).to.deep.equal(expectedResult);
      });
    });


  });
});
