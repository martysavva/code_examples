/* Actions */
import * as actions from './actions';
/* --- Actions */

/* Init State */
import InitialState from './initial-state';
/* --- Init State */

export default function customers(state = InitialState, action = {type: null}) {
  switch (action.type) {
    case actions.CUSTOMER_TOGGLE_ADDRESS : {
      // payload.key = path to 'addressOpen' in array ['customer1','address','addressOpen']
      return state.setIn(action.payload.key, action.payload.value);
    }
    case actions.CUSTOMER_SET_FULL_INFO: {
      return state.set(action.payload.key, action.payload.value);
    }
    case actions.CUSTOMER_SET_CUSTOMER_ID: {
      return state.setIn([action.payload.key, 'id'], action.payload.value);
    }
    case actions.CUSTOMER_SET_EMAIL_ADDRESS: {
      return state.setIn([action.payload.key, 'emailAddress'], action.payload.value);
    }
    case actions.CUSTOMER_SET_ENQUIRY_ID: {
      return state.setIn([action.payload.key, 'enquiryId'], action.payload.value);
    }
    case actions.CUSTOMER_SET_UW_ANSWER: {
      return state.setIn([action.payload.key, 'answers', action.payload.questionKey], action.payload.value);
    }
    case actions.CUSTOMER_SET_DOCTOR_DETAILS: {
      return state.setIn([action.payload.key, 'doctor'], action.payload.value);
    }
    case actions.CUSTOMER_DOCTOR_UPDATE_NAME : {
      return state.setIn([action.payload.key, 'doctor', 'name'], action.payload.value);
    }
    case actions.CUSTOMER_DOCTOR_UPDATE_SURGERY_NAME : {
      return state.setIn([action.payload.key, 'doctor', 'surgeryName'], action.payload.value);
    }
    case actions.CUSTOMER_DOCTOR_UPDATE_SURGERY_CONTACT_NUMBER : {
      return state.setIn([action.payload.key, 'doctor', 'surgeryContactNumber'], action.payload.value);
    }
    case actions.CUSTOMER_SET_ACTIVE_CUSTOMER : {
      return state.set('activeCustomer', action.payload);
    }
    case actions.CUSTOMER_SET_MARKETING_PREFERENCE : {
      return state.set('marketingPreference', action.payload);
    }
    case actions.CUSTOMER_SET_INFO: {
      const getPosition = (customer, key) => {
        const posArr = [customer];
        if (Array.isArray(key)) {
          key.map((k) => {
            posArr.push(k);
            return true;
          });
        } else {
          posArr.push(key);
        }
        return posArr;
      };
      const position = getPosition(action.payload.customer, action.payload.key);
      return state.setIn(position, action.payload.value);
    }
    case actions.CUSTOMER_SET_UW_ANSWERS: {
      return state.setIn([action.payload.key, 'answers'], action.payload.value);
    }
    case actions.CUSTOMER_SET_CUSTOMER_QA_DOC: {
      return state.setIn([action.payload.key, 'qaDoc'], action.payload.value);
    }
    case actions.CUSTOMER_SET_OTHER_TITLE: {
      return state.setIn([action.payload.key, 'otherTitleActive'], action.payload.value);
    }
    case actions.CUSTOMER_RESET_STATE: {
      return InitialState;
    }
    default:
      return state;
  }
}
