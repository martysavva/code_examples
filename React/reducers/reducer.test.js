/* eslint-disable */

/* Libs */
import Immutable from 'seamless-immutable';
import {expect} from 'chai';
/* --- Libs */

/* Resources */
import * as Actions from './actions';
import Reducer from './reducer';
/* --- Resources */

/* Init State */
import InitialState from './initial-state';
/* --- Init State */


describe('Customers Reducer', () => {

  it('Should return the initial state', () => {
    expect(Reducer(undefined, {})).deep.equal(InitialState);
  });

  describe('CUSTOMER_SET_CUSTOMER_ID:', () => {
    it('Should handle setting a customers generated id', () => {
      const expectedState = InitialState.setIn(['customer1', 'id'], '123456');
      expect(Reducer(undefined, {
        type: 'CUSTOMER_SET_CUSTOMER_ID',
        payload: {
          key: 'customer1',
          value: '123456'
        }
      })).deep.equal(expectedState);
    });
  });


  describe('CUSTOMER_SET_ENQUIRY_ID:', () => {
    it('Should handle setting a customers generated enquiry id', () => {
      const expectedState = InitialState.setIn(['customer1', 'enquiryId'], '123456');
      expect(Reducer(undefined, {
        type: 'CUSTOMER_SET_ENQUIRY_ID',
        payload: {
          key: 'customer1',
          value: '123456'
        }
      })).deep.equal(expectedState);
    });
  });

  describe('CUSTOMER_SET_UW_ANSWER:', () => {
    it('Should handle setting a customers answer to a question', () => {
      const expectedState = InitialState.setIn(['customer1', 'answers', 'TESTQUESTION'], 'answer');
      expect(Reducer(undefined, {
        type: 'CUSTOMER_SET_UW_ANSWER',
        payload: {
          key: 'customer1',
          questionKey: 'TESTQUESTION',
          value: 'answer'
        }
      })).deep.equal(expectedState);
    });
  });


  describe('CUSTOMER_SET_INFO:', () => {
    it('Should handle setting a piece customer info', () => {
      const expectedState = InitialState.setIn(['customer1', 'title'], 'MR');
      expect(Reducer(undefined, {
        type: 'CUSTOMER_SET_INFO',
        payload: {
          customer: 'customer1',
          key: 'title',
          value: 'MR'
        }
      })).deep.equal(expectedState);
    });
  });
});
