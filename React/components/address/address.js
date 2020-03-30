/* Libs */
import React from 'react';
import PropTypes from 'prop-types';
/* --- Libs */

/* Styles */
import '../../assets/global-styles/helpers.scss';
import './address.scss';
/* --- Styles */

/* Components */
import AddressAuto from './components/address-auto/address-auto';
import AddressManual from './components/address-manual/address-manual';
import Anchor from '../../components/anchor/anchor';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import CustomSelect from '../../components/custom-select/custom-select';
/* --- Components */

/* Helpers */
import {generateStringFromTemplate} from '../../helpers/utils/';
/* --- Helpers */

/* Validations */
import * as ValidationBools from '../../helpers/validations/validation-booleans/';
/* --- Validations */

// @todo - look at how we can refactor this

const getLookupOptions = (lookupArr = []) => {
  const options = [{text: 'Please select', value: null}];
  lookupArr.map((address, index) => options.push({text: address.line1, value: index}));
  return options;
};

const Address = ({
    addressOpen,
    addressLookup,
    clearLookup,
    county,
    firstCustomerFirstName,
    houseNumber,
    image,
    label,
    postcode,
    secondCustomer,
    street,
    textAuto,
    textManual,
    town,
    uniqKey,
    validations,
    getAddress,
    onClick,
    selectAddress,
    setFirstPersonsAddress,
    updateCounty,
    updateHouseNumber,
    updatePostcode,
    updateStreet,
    updateTown,
    questionKey,
    validate,
    CONSTS,
    anothersAddressText
  }) => {
  const isBtnEnabled = ValidationBools.string.isValidPostCode(postcode);

  // fix for addressLookup when used in class based component
  if (addressLookup) {
    if (addressLookup.length < 1) {
      /* eslint-disable */
      // @todo - look at how we can renable
      addressLookup = null;
      /* eslint-enable */
    }
  }

  const useCustomerOneAddress = () => {
    console.log(anothersAddressText);
    const buttonText = generateStringFromTemplate(anothersAddressText || CONSTS.anothersAddress, {name: firstCustomerFirstName});
    return (
        (<Anchor
          text={buttonText}
          className='margin-top-10'
          onClick={setFirstPersonsAddress}
          inline
        />)
      );
  };

  return (
    <div className={'address'}>
      {label &&
        <div>
          <Paragraph className='display-inline-block title' >
            {`${label} ` }
            { secondCustomer && <span className='copyCustomer1Link'>{useCustomerOneAddress()}</span> }
          </Paragraph>
        </div>
      }
      <div>
        {!addressOpen &&
          <div>
            {!addressLookup &&
              <div className={'address-auto-container'}>
                <AddressAuto
                  houseNumber={houseNumber}
                  postcode={postcode}
                  uniqKey={uniqKey}
                  questionKey={questionKey}
                  updateHouseNumber={updateHouseNumber}
                  updatePostcode={updatePostcode}
                  validations={validations}
                  getAddress={getAddress}
                  validate={validate}
                />
                <Button
                  onClick={() => getAddress(postcode, houseNumber)}
                  text='Search'
                  className='display-block margin-top-10'
                  disabled={!isBtnEnabled}
                />
              </div>

            }
            {addressLookup &&
              <div>
                <CustomSelect
                  options={getLookupOptions(addressLookup)}
                  onSelect={(e) => selectAddress(e, uniqKey)}
                  listScrollOffset={CONSTS.CustomSelectScrollOffset}
                />
                <Button
                  onClick={() => clearLookup()}
                  text={textManual}
                  className='display-block margin-top-10'
                />
              </div>
            }
            <Anchor
              text={textAuto}
              className='address-anchor'
              image={image}
              onClick={onClick}
            />
          </div>
        }
        {addressOpen &&
          <div>
            <AddressManual
              houseNumber={houseNumber}
              street={street}
              town={town}
              postcode={postcode}
              county={county}
              uniqKey={uniqKey}
              updateHouseNumber={updateHouseNumber}
              updateStreet={updateStreet}
              updateTown={updateTown}
              updatePostcode={updatePostcode}
              updateCounty={updateCounty}
              questionKey={questionKey}
              validations={validations}
              validate={validate}
            />
            <Button
              onClick={() => clearLookup()}
              text={textManual}
              className='display-block margin-top-10'
            />
          </div>
        }
      </div>
    </div>
  );
};

Address.propTypes = {
  label: PropTypes.string,
  secondCustomer: PropTypes.bool,
  firstCustomerFirstName: PropTypes.string,
  houseNumber: PropTypes.string,
  street: PropTypes.string,
  town: PropTypes.string,
  postcode: PropTypes.string,
  county: PropTypes.string,
  uniqKey: PropTypes.string,
  updateHouseNumber: PropTypes.func,
  updateStreet: PropTypes.func,
  updateTown: PropTypes.func,
  updateCounty: PropTypes.func,
  updatePostcode: PropTypes.func,
  getAddress: PropTypes.func,
  addressOpen: PropTypes.bool,
  addressLookup: PropTypes.array,
  selectAddress: PropTypes.func,
  setFirstPersonsAddress: PropTypes.func,
  clearLookup: PropTypes.func,
  textAuto: PropTypes.string,
  textManual: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
  validations: PropTypes.object,
  questionKey: PropTypes.string,
  validate: PropTypes.func,
  anothersAddressText: PropTypes.string,
  CONSTS: PropTypes.obj
};

Address.defaultProps = {
  label: '',
  secondCustomer: false,
  firstCustomerFirstName: '',
  houseNumber: '',
  street: '',
  town: '',
  postcode: '',
  county: '',
  uniqKey: '',
  questionKey: false,
  updateHouseNumber: () => {},
  updateStreet: () => {},
  updateTown: () => {},
  updateCounty: () => {},
  updatePostcode: () => {},
  getAddress: () => {},
  addressOpen: false,
  addressLookup: [],
  selectAddress: () => {},
  setFirstPersonsAddress: () => {},
  clearLookup: () => {},
  textAuto: '',
  textManual: '',
  className: '',
  image: '',
  onClick: () => {},
  checkValidations: () => {},
  validations: {},
  validate: () => {},
  anothersAddressText: false,
  CONSTS: {}
};


export default Address;
