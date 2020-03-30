import Immutable from 'seamless-immutable';

/* Services */
import {apiSaveContactDetails, apiConfirmDeclarations, apiSearchAddress, apiSubmitDoctorDetails, apiSetMarketingPreferences, apiConfirmApplicationMoneyLaunderingAndAdvisedSale} from '../../helpers/services';
/* --- Services */

/* Payload Generators */
import saveContactDetailsPayload from '../../helpers/payload-generators/save-contact-details/save-contact-details';
import getAcceptCustomersDeclarationsPayload from '../../helpers/payload-generators/accept-customer-declaration/accept-customers-declarations';
import saveDoctorDetailsPayload from '../../helpers/payload-generators/save-doctor-details/save-doctor-details';
import getMarketingPreferencesPayload from '../../helpers/payload-generators/marketing-preferences/marketing-preferences';
/* --- Payload Generators */

/* Imported Actions */
import {setSectionLoader, navigateToScreen, setValidation, setProcess, globalSetError} from '../../ars/global/actions';
import {coverSetDeclarationCopy, coverSetDeclarationAccepted} from '../../ars/cover/actions';
/* --- Imported Actions */

/* Validations */
import * as GeneralValidations from '../../helpers/validations/validation-rules/';
/* --- Validations */

/* Consts */
export const CUSTOMER_SET_CUSTOMER_ID = 'CUSTOMER_SET_CUSTOMER_ID';
export const CUSTOMER_SET_EMAIL_ADDRESS = 'CUSTOMER_SET_EMAIL_ADDRESS';
export const CUSTOMER_SET_ENQUIRY_ID = 'CUSTOMER_SET_ENQUIRY_ID';
export const CUSTOMER_SET_UW_ANSWER = 'CUSTOMER_SET_UW_ANSWER';
export const CUSTOMER_SET_INFO = 'CUSTOMER_SET_INFO';
export const CUSTOMER_TOGGLE_ADDRESS = 'CUSTOMER_TOGGLE_ADDRESS';
export const CUSTOMER_SET_DOCTOR_DETAILS = 'CUSTOMER_SET_DOCTOR_DETAILS';
export const CUSTOMER_DOCTOR_UPDATE_NAME = 'CUSTOMER_DOCTOR_UPDATE_NAME';
export const CUSTOMER_DOCTOR_UPDATE_SURGERY_NAME = 'CUSTOMER_DOCTOR_UPDATE_SURGERY_NAME';
export const CUSTOMER_DOCTOR_UPDATE_SURGERY_CONTACT_NUMBER = 'CUSTOMER_DOCTOR_UPDATE_SURGERY_CONTACT_NUMBER';
export const CUSTOMER_SET_ACTIVE_CUSTOMER = 'CUSTOMER_SET_ACTIVE_CUSTOMER';
export const CUSTOMER_SET_MARKETING_PREFERENCE = 'CUSTOMER_SET_MARKETING_PREFERENCE';
export const CUSTOMER_SET_FULL_INFO = 'CUSTOMER_SET_FULL_INFO';
export const CUSTOMER_SET_UW_ANSWERS = 'CUSTOMER_SET_UW_ANSWERS';
export const CUSTOMER_RESET_STATE = 'CUSTOMER_RESET_STATE';
export const CUSTOMER_SET_CUSTOMER_QA_DOC = 'CUSTOMER_SET_CUSTOMER_QA_DOC';
export const CUSTOMER_SET_OTHER_TITLE = 'CUSTOMER_SET_OTHER_TITLE';
/* --- Consts */

/* Setters */
export const customerSetCustomerId = (payload) => {
  return {
    type: 'CUSTOMER_SET_CUSTOMER_ID',
    payload
  };
};

export const customerSetEmailAddress = (payload) => {
  return {
    type: 'CUSTOMER_SET_EMAIL_ADDRESS',
    payload
  };
};

export const customerSetEnquiryId = (payload) => {
  return {
    type: 'CUSTOMER_SET_ENQUIRY_ID',
    payload
  };
};

export const customerSetUWAnswer = (payload) => {
  return {
    type: 'CUSTOMER_SET_UW_ANSWER',
    payload
  };
};

export const customerSetUWAnswers = (payload) => {
  return {
    type: 'CUSTOMER_SET_UW_ANSWERS',
    payload
  };
};

export const customerSetInfo = (payload) => {
  return {
    type: 'CUSTOMER_SET_INFO',
    payload
  };
};

export const customerSetActiveCustomer = (payload) => {
  return {
    type: 'CUSTOMER_SET_ACTIVE_CUSTOMER',
    payload
  };
};

export const customerSetFullInfo = (payload) => {
  return {
    type: 'CUSTOMER_SET_FULL_INFO',
    payload
  };
};

export const customerSetDoctorDetails = (payload) => {
  return {
    type: 'CUSTOMER_SET_DOCTOR_DETAILS',
    payload
  };
};

export const customerDoctorUpdateName = (payload) => {
  return {
    type: 'CUSTOMER_DOCTOR_UPDATE_NAME',
    payload
  };
};

export const customerDoctorUpdateSurgeryName = (payload) => {
  return {
    type: 'CUSTOMER_DOCTOR_UPDATE_SURGERY_NAME',
    payload
  };
};

export const customerDoctorUpdateSurgeryContactNumber = (payload) => {
  return {
    type: 'CUSTOMER_DOCTOR_UPDATE_SURGERY_CONTACT_NUMBER',
    payload
  };
};

export const customerResetState = (payload) => {
  return {
    type: 'CUSTOMER_RESET_STATE',
    payload
  };
};

export const customerToggleAddress = (payload) => {
  // Toggle the address view
  return {
    type: 'CUSTOMER_TOGGLE_ADDRESS',
    payload
  };
};

export const customerSetCustomerQaDoc = (payload) => {
  return {
    type: 'CUSTOMER_SET_CUSTOMER_QA_DOC',
    payload
  };
};

export const customerSetCustomerOtherTitle = (payload) => {
  return {
    type: 'CUSTOMER_SET_OTHER_TITLE',
    payload
  };
};

export const customerSetMarketingPreferenceState = (payload) => {
  return {
    type: 'CUSTOMER_SET_MARKETING_PREFERENCE',
    payload
  };
};
/* --- Setters */

/* Service Actions */
export const customerSaveMarketingPreference = (preference) => async (dispatch, getState) => {
  const appState = getState();
  const {App: {CONSTS}} = appState;
  const servicePayload = getMarketingPreferencesPayload(appState, preference);
  try {
    const response = await apiSetMarketingPreferences(servicePayload);
    return response;
  } catch (e) {
    dispatch(globalSetError({
      message: CONSTS.errorMessages.errorStandard,
      btnText: CONSTS.errorMessages.errorBtnStandard,
      errorType: 'dismiss'
    }));
    return false;
  }
};

export const customerSetLaunderingAndAdvised = () => async (dispatch, getState) => {
  const {App: {config: {at: accessToken, applicationId, auzt}}, CONSTS} = getState();
  try {
    // @todo - move to payload generator
    const response = await apiConfirmApplicationMoneyLaunderingAndAdvisedSale({accessToken, auzt, body: {applicationId}});
    return response;
  } catch (e) {
    dispatch(globalSetError({
      message: CONSTS.errorMessages.errorStandard,
      btnText: CONSTS.errorMessages.errorBtnStandard,
      errorType: 'dismiss'
    }));
    return false;
  }
};

const customerSearchAddressService = (postcode, building) => async (dispatch, getState) => {
  const {App: {CONSTS}} = getState();
  try {
    const apiResponse = await apiSearchAddress(postcode, building);
    return apiResponse;
  } catch (e) {
    dispatch(globalSetError({
      message: CONSTS.errorMessages.errorStandard,
      btnText: CONSTS.errorMessages.errorBtnStandard,
      errorType: 'dismiss'
    }));
    return false;
  }
};

export const customerSaveContactDetailsService = () => async (dispatch, getState) => {
  const appState = getState();
  const {App: {CONSTS}} = appState;
  // Prepare the service payload
  const servicePayload = saveContactDetailsPayload(appState);
  try {
    // Call the service
    const apiRes = await apiSaveContactDetails(servicePayload);
    return apiRes;
  } catch (e) {
    dispatch(setSectionLoader(false));
    dispatch(globalSetError({
      message: CONSTS.errorMessages.errorStandard,
      btnText: CONSTS.errorMessages.errorBtnStandard,
      errorType: 'dismiss'
    }));
    return false;
  }
};

export const customerAcceptDeclarationsService = () => async (dispatch, getState) => {
  const appState = getState();
  const {App: {CONSTS}} = appState;
  // Prepare the payload
  const payload = getAcceptCustomersDeclarationsPayload(appState);
  try {
    const result = await apiConfirmDeclarations(payload);
    return result;
  } catch (e) {
    dispatch(setSectionLoader(false));
    dispatch(globalSetError({
      message: CONSTS.errorMessages.errorStandard,
      btnText: CONSTS.errorMessages.errorBtnStandard,
      errorType: 'dismiss'
    }));
    return false;
  }
};

export const customerAcceptLegalDeclaration = () => async () => {
  return 'accepted legal declaration';
  // const {Cover: {secondCustomer}, App: {config: {at: accessToken, applicationId, auzt}}, Customers: {customer1: {id: c1Id}, customer2: {id: c2Id}}} = getState();
  // const ids = [c1Id];
  // if (secondCustomer) ids.push(c2Id);
  // try {
  //   const result = await apiConfirmCustomerLegalDeclaration({accessToken, auzt, body: {customerIds: ids, applicationId, accepted: value}});
  //   return result;
  // } catch (e) {
  //   dispatch(globalSetError({
  //     message: 'Sorry an error has occurred',
  //     btnText: 'Try again',
  //     errorType: 'dismiss'
  //   }));
  //   return false;
  // }
};

export const customerDoctorSaveDetails = () => async (dispatch, getState) => {
  const appState = getState();
  const {App: {CONSTS}} = appState;
  const payload = saveDoctorDetailsPayload(appState);
  try {
    const result = await apiSubmitDoctorDetails(payload);
    return result;
  } catch (e) {
    dispatch(globalSetError({
      message: CONSTS.errorMessages.errorStandard,
      btnText: CONSTS.errorMessages.errorBtnStandard,
      errorType: 'dismiss'
    }));
    return false;
  }
};
/* --- Service Actions */

/* Actions */
export const customerUpdateEmailAddress = (value, customer) => async (dispatch) => {
  if (value === null) return;
  dispatch(customerSetEmailAddress({value, key: [customer]}));
};

export const customerClearLookup = ({key, path}) => async (dispatch) => {
  const addressObject = {
    houseNumber: null,
    street: null,
    town: null,
    county: null,
    postcode: null,
    addressLookup: null,
    addressOpen: false
  };
  // reset address info
  dispatch(customerSetInfo({value: addressObject, key: path, customer: key}));
  // show auto address
  path.unshift(key);
  path.push('addressOpen');
  dispatch(customerToggleAddress({key: path, value: false}));
};

/**
 * Helper method for 'customerSearchAddress' and 'customerGetAddress'
 * @param apiResponse {object} - the returned address object
 * @param path {array} - path array to set in the store
 * @param uniqKey {string} - unique customer string
 */
export const retrieveAddress = (apiResponse, path, uniqKey) => async (dispatch) => {
  const {BuildingNumber: bNumber, BuildingName: bName, PrimaryStreet: street, PostTown: town, County: county, Postcode: postcode} = apiResponse;

  const addressObject = {
    houseNumber: bNumber || bName,
    street,
    town,
    county,
    postcode
  };

  dispatch(customerSetInfo({value: addressObject, key: path, customer: uniqKey}));
  // toggle the address window to show the open address
  path.unshift(uniqKey);
  path.push('addressOpen');
  dispatch(customerToggleAddress({key: path, value: true}));

  // Set the validation
  const validationKey = (path[0] === 'doctor') ? 'DOCTOR_ADDRESS' : 'ADDRESS';
  GeneralValidations.address.validateAddress({
    uniqKey: `${uniqKey}.${validationKey}`,
    value: addressObject,
    setValidation,
    options: {force: true, addressAuto: false, isPostcode: false, toggled: true},
    dispatch
  });
};

export const customerSearchAddress = (postcode, building, uniqKey, field, path) => async (dispatch) => {
  const apiResponse = await dispatch(customerSearchAddressService(postcode, building));
  if (!apiResponse) return false;
  if (apiResponse.length > 1) { // is list of addresses
    const arrayOfAddresses = apiResponse.map((address) => {
      return {
        line1: address.Line1,
        houseNumber: address.BuildingNumber || address.BuildingName,
        street: address.PrimaryStreet,
        town: address.PostTown,
        county: address.County,
        postcode: address.Postcode
      };
    });

    // populate dropdown options
    const lookupPath = Immutable.asMutable(path);
    lookupPath.push('addressLookup');
    return dispatch(customerSetInfo({value: arrayOfAddresses, key: lookupPath, customer: uniqKey}));
  }

  if (apiResponse.length === 1) { // is only 1 object
    if (apiResponse[0].Error) { // check if error object
        // if error show message returned from server
      return dispatch(setValidation({key: `${uniqKey}.${field}`, isValid: false, validations: [{msg: apiResponse[0].Cause, valid: false, rule: {}}]}));
    }  // is address so retrieve
    return dispatch(retrieveAddress(apiResponse[0], path, uniqKey));
  }

  // is empty array so no results found
  // if no results then show message
  return dispatch(setValidation({key: `${uniqKey}.${field}`, isValid: false, validations: [{msg: 'No results found, try a manual search', valid: false, rule: {}}]}));
};

export const customerSetAddress = (value, uniqKey, path, addressToSet) => async (dispatch) => {
  if (value === null) return;
  dispatch(customerSetInfo({value: addressToSet, key: path, customer: uniqKey}));
  // Set the validation
  const validationKey = (path[0] === 'doctor') ? 'DOCTOR_ADDRESS' : 'ADDRESS';
  GeneralValidations.address.validateAddress({
    uniqKey: `${uniqKey}.${validationKey}`,
    value: addressToSet,
    setValidation,
    options: {force: true, toggled: true},
    dispatch
  });
  // toggle the address window to show the open address
  const addressOpenPath = Immutable.asMutable(path);
  addressOpenPath.unshift(uniqKey);
  addressOpenPath.push('addressOpen');
  dispatch(customerToggleAddress({key: addressOpenPath, value: true}));
};

export const customerSetMarketingPreference = (payload) => (dispatch) => {
  // Set the customers marketing preference (async call)
  const marketingResponse = dispatch(customerSaveMarketingPreference(payload));
  if (!marketingResponse) return false;
  return dispatch(customerSetMarketingPreferenceState(payload));
};

export const customerSaveContactDetails = (handleLoader = true, handleNavigation = true) => async (dispatch, getState) => {
  const {Customers: {marketingPreference}} = getState();
  // Show the loader
  if (handleLoader) dispatch(setSectionLoader(true));
  // Call the service
  const apiRes = await dispatch(customerSaveContactDetailsService());
  if (!apiRes) return false;
  // Set the declaration copy, based on the response
  dispatch(coverSetDeclarationCopy(apiRes.declarations[0].text));
  // Fire the marketing preference again and navigate to the declaration page
  if (handleNavigation) {
    dispatch(customerSetMarketingPreference(marketingPreference));
    dispatch(navigateToScreen('declaration'));
  }
  // Disable the section loader
  if (handleLoader) dispatch(setSectionLoader(false));
  return true;
};

export const customerAcceptDeclarations = () => async (dispatch) => {
  // Call the service
  const acceptResponse = await dispatch(customerAcceptDeclarationsService());
  if (!acceptResponse) return false;
  // Set the validation
  dispatch(setValidation({key: 'customer1.DECLARATION_AGREED', isValid: true, msg: ''}));
  // Set the fact its accepted
  return dispatch(coverSetDeclarationAccepted({accepted: true}));
};

export const customerUnAcceptDeclarations = () => (dispatch) => {
  dispatch(setValidation({key: 'customer1.DECLARATION_AGREED', isValid: false, msg: ''}));
  dispatch(setProcess({key: 'customerDeclarationComplete', value: false}));
  return dispatch(coverSetDeclarationAccepted({accepted: false}));
};

/* --- Actions */
