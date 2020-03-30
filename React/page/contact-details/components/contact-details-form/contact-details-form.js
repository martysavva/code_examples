/* Libs */
import React from 'react';
import PropTypes from 'prop-types';
import Component from 'react-pure-render/component';
/* --- Libs */

/* Components */
import InputContainer from '../../../../components/input-container/input-container';
import TextInput from '../../../../components/text-input/text-input';
import ButtonRadioGroup from '../../../../components/button-radio-group/button-radio-group';
import Address from '../../../../components/address/address';
import Anchor from '../../../../components/anchor/anchor';
import CustomSelect from '../../../../components/custom-select/custom-select';
import Paragraph from '../../../../components/paragraph/paragraph';
/* --- Components */

/* Validations */
import * as GeneralValidations from '../../../../helpers/validations/validation-rules';
import * as PageValidations from './validations';
/* --- Validations */

/* Helpers */
import {generateStringFromTemplate} from '../../../../helpers/utils/';
import inputLimitPhoneNumber from '../../../../helpers/input-limits/input-limit-phone-number/input-limit-phone-number';
/* Helpers */

const OTHER_SELECTOR = 'Other';

class ContactDetailForm extends Component {
  render() {
    const {
      title,
      firstName,
      firstCustomerFirstName,
      lastName,
      contactNumber,
      c1ContactNumber,
      emailAddress,
      maritalStatus,
      ukResident,
      houseNumber,
      street,
      town,
      postcode,
      county,
      addressOpen,
      addressLookup,
      selectAddress,
      setFirstPersonsAddress,
      setFirstPersonsContact,
      clearLookup,
      toggleAddress,
      uniqKey,
      secondCustomer,
      updateCustomerInformation,
      getAddress,
      validations,
      checkValidations,
      forceValidations,
      CONSTS,
      address,
      setValidation,
      customer,
      clearValidation,
      showAddressOpen,
      customerSetCustomerOtherTitle,
      otherTitleActive
    } = this.props;


    const prefix = (!secondCustomer) ? CONSTS.global.Your : CONSTS.global.Their;
    const innerPrefix = (!secondCustomer) ? CONSTS.You : CONSTS.They;

    // handle title selection including 'other'
    const onTitleSelect = (newval) => {
      if (newval === OTHER_SELECTOR) {
        customerSetCustomerOtherTitle({key: uniqKey, value: true});
        // clear the stored title value
        updateCustomerInformation('', 'title', uniqKey);
      } else {
        customerSetCustomerOtherTitle({key: uniqKey, value: false});
        PageValidations.validateTitleAndUpdate(newval, 'title', uniqKey, setValidation, updateCustomerInformation);
      }
    };


    const useCustomerOnePhoneLink = () => {
      const usePhoneLink = () => {
        updateCustomerInformation(c1ContactNumber, 'contactNumber', uniqKey);
        GeneralValidations.phone.validatePhoneNumber('customer2.CONTACT_NUMBER', c1ContactNumber, setValidation);
      };
      return (
        <Anchor
          text={`(use ${firstCustomerFirstName}'s contact number)`}
          onClick={() => usePhoneLink()}
          inline
        />
      );
    };

    return (
      <section>
        <InputContainer
          label={`${CONSTS.contactDetails.personTitle}`}
          valid={validations[`${uniqKey}.title`]}
          className={`${uniqKey}title`}
          validate={(value) => PageValidations.validateTitleAndUpdate(value, 'title', uniqKey, setValidation, updateCustomerInformation, otherTitleActive)}
          forceValidations={{force: forceValidations, value: title}}
        >
          <CustomSelect
            options={CONSTS.contactDetails.titleOptions}
            onSelect={onTitleSelect}
            value={{text: title, value: title}}
            selected={otherTitleActive ? OTHER_SELECTOR : title} // override the selection when Other selected..
            listScrollOffset={CONSTS.CustomSelectScrollOffset}
          />
          {otherTitleActive &&
            <TextInput
              className={'otherTitleTextInput'}
              type='text'
              placeholder='Other title:'
              validate={(val) => PageValidations.validateTitleAndUpdate(val, 'title', uniqKey, setValidation, updateCustomerInformation, true)}
              onChange={(e) => updateCustomerInformation(e.target.value, 'title', uniqKey)}
              value={title}
            />
        }
        </InputContainer>
        <InputContainer
          label={generateStringFromTemplate(CONSTS.contactDetails.firstName, {prefix})}
          validate={(value) => GeneralValidations.names.validateFirstName(`${uniqKey}.FIRST_NAME`, value, setValidation)}
          valid={validations[`${uniqKey}.FIRST_NAME`]}
          className={`${uniqKey}FIRST_NAME`}
          forceValidations={{force: forceValidations, value: firstName}}
        >
          <TextInput
            type='text'
            placeholder=''
            onChange={(e) => updateCustomerInformation(e.target.value, 'firstName', uniqKey)}
            value={firstName}
          />
        </InputContainer>
        <InputContainer
          label={generateStringFromTemplate(CONSTS.contactDetails.lastName, {prefix})}
          validate={(value) => GeneralValidations.names.validateLastName(uniqKey, value, setValidation)}
          valid={validations[`${uniqKey}.LAST_NAME`]}
          className={`${uniqKey}LAST_NAME`}
          forceValidations={{force: forceValidations, value: lastName}}
        >
          <TextInput
            type='text'
            placeholder=''
            onChange={(e) => updateCustomerInformation(e.target.value, 'lastName', uniqKey)}
            value={lastName}
          />
        </InputContainer>
        <InputContainer
          valid={validations[`${uniqKey}.CONTACT_NUMBER`]}
          className={`${uniqKey}CONTACT_NUMBER`}
          validate={(value) => GeneralValidations.phone.validatePhoneNumber(`${uniqKey}.CONTACT_NUMBER`, value, setValidation)}
          forceValidations={{force: forceValidations, value: contactNumber}}
          toolTip={CONSTS.contactDetails.contactNumberToolTip}
          fullWidth
        >
          <Paragraph className={'title input-container-title'}>
            {`${generateStringFromTemplate(CONSTS.contactDetails.contactNumber, {prefix})} `}
            { secondCustomer && <span className='copyCustomer1Link'>{useCustomerOnePhoneLink()}</span> }
          </Paragraph>
          <TextInput
            type='text'
            inputLimits={[inputLimitPhoneNumber]}
            placeholder=''
            onChange={(e) => updateCustomerInformation(e.target.value, 'contactNumber', uniqKey)}
            value={contactNumber}
          />
        </InputContainer>
        <InputContainer
          label={generateStringFromTemplate(CONSTS.contactDetails.emailAddress, {prefix})}
          validate={(value) => GeneralValidations.email.validateEmail(`${uniqKey}.EMAIL_ADDRESS`, value, setValidation)}
          valid={validations[`${uniqKey}.EMAIL_ADDRESS`]}
          className={`${uniqKey}EMAIL_ADDRESS`}
          forceValidations={{force: forceValidations, value: emailAddress}}
          toolTip={CONSTS.contactDetails.emailAddressToolTip}
        >
          <TextInput
            type='text'
            placeholder=''
            onChange={(e) => updateCustomerInformation(e.target.value, 'emailAddress', uniqKey)}
            value={emailAddress}
          />
        </InputContainer>
        <InputContainer
          label={`${prefix} ${CONSTS.MaritalStatus}`}
          valid={validations[`${uniqKey}.maritalStatus`]}
          className={`${uniqKey}maritalStatus`}
          validate={(value) => GeneralValidations.general.notNull(`${uniqKey}.maritalStatus`, value, setValidation)}
          forceValidations={{force: forceValidations, value: maritalStatus}}
        >
          <CustomSelect
            options={CONSTS.contactDetails.maritalStatusOptions}
            onSelect={(e) => PageValidations.validateAndUpdate(e, 'maritalStatus', uniqKey, setValidation, updateCustomerInformation)}
            value={maritalStatus}
            selected={maritalStatus}
            listScrollOffset={CONSTS.CustomSelectScrollOffset}
            scrollThreshold={CONSTS.CustomSelectScrollThreshold}
          />
        </InputContainer>

        <InputContainer
          label={generateStringFromTemplate(CONSTS.contactDetails.ukResident, {prefix: innerPrefix})}
          valid={validations[`${uniqKey}.UK_RESIDENT`]}
          className={`${uniqKey}UK_RESIDENT`}
          validate={(value) => PageValidations.validateUKResident(uniqKey, value, setValidation)}
          forceValidations={{force: forceValidations, value: ukResident}}
          toolTip={CONSTS.contactDetails.ukResidentToolTip}
        >
          <ButtonRadioGroup
            opts={{'Yes': true, 'No': false}}
            type='number'
            onClick={(e) => updateCustomerInformation(e, 'ukResident', uniqKey)}
            selected={ukResident}
          />
        </InputContainer>


        <InputContainer
          valid={validations[`${uniqKey}.ADDRESS`]}
          validate={(value, options) => GeneralValidations.address.validateAddress({uniqKey: `${uniqKey}.ADDRESS`, value, setValidation, clearValidation, showAddressOpen, options})}
          forceValidations={{force: forceValidations, value: address}}
          className={`${uniqKey}ADDRESS`}
          fullWidth
        >
          <Address
            label={generateStringFromTemplate(CONSTS.contactDetails.address, {prefix})}
            questionKey={'ADDRESS'}
            secondCustomer={secondCustomer}
            firstCustomerFirstName={firstCustomerFirstName}
            houseNumber={houseNumber}
            street={street}
            town={town}
            postcode={postcode}
            county={county}
            uniqKey={uniqKey}
            updateHouseNumber={(e) => updateCustomerInformation(e.target.value, ['address', 'houseNumber'], uniqKey)}
            updateStreet={(e) => updateCustomerInformation(e.target.value, ['address', 'street'], uniqKey)}
            updateTown={(e) => updateCustomerInformation(e.target.value, ['address', 'town'], uniqKey)}
            updateCounty={(e) => updateCustomerInformation(e.target.value, ['address', 'county'], uniqKey)}
            updatePostcode={(e) => updateCustomerInformation(e.target.value, ['address', 'postcode'], uniqKey)}
            getAddress={(pc, hn) => getAddress(pc, hn, uniqKey)}
            addressOpen={addressOpen}
            addressLookup={addressLookup}
            selectAddress={selectAddress}
            setFirstPersonsAddress={() => setFirstPersonsAddress()}
            clearLookup={clearLookup}
            textAuto={CONSTS.addressField.textAuto}
            textManual={CONSTS.addressField.textManual}
            className={null}
            image={null}
            onClick={() => toggleAddress(uniqKey)}
            validations={validations}
            CONSTS={CONSTS}
            checkValidations={checkValidations}
          />
        </InputContainer>
      </section>
    );
  }
}

ContactDetailForm.propTypes = {
  firstCustomerFirstName: PropTypes.string,
  toggleAddress: PropTypes.func,
  getAddress: PropTypes.func,
  selectAddress: PropTypes.func,
  setFirstPersonsAddress: PropTypes.func,
  setFirstPersonsContact: PropTypes.func,
  clearLookup: PropTypes.func,
  uniqKey: PropTypes.string,
  secondCustomer: PropTypes.boolean,
  updateCustomerInformation: PropTypes.func.isRequired,
  validations: PropTypes.object,
  checkValidations: PropTypes.func,
  CONSTS: PropTypes.object,
  showAddressOpen: PropTypes.func
};

ContactDetailForm.defaultProps = {
  title: '',
  firstName: '',
  firstCustomerFirstName: '',
  lastName: '',
  contactNumber: '',
  emailAddress: '',
  maritalStatus: '',
  ukResident: '',
  houseNumber: '',
  street: '',
  town: '',
  postcode: '',
  county: '',
  toggleAddress: () => {},
  getAddress: () => {},
  addressOpen: false,
  addressLookup: null,
  selectAddress: () => {},
  setFirstPersonsAddress: () => {},
  setFirstPersonsContact: () => {},
  clearLookup: () => {},
  uniqKey: '',
  secondCustomer: false,
  validations: {},
  checkValidations: () => {},
  updateCustomerInformation: () => {},
  CONSTS: {},
  showAddressOpen: () => {}
};


export default ContactDetailForm;
