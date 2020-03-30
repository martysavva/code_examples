/* Libs */
import React from 'react';
import PropTypes from 'prop-types';
/* --- Libs */

/* Components */
import TextInput from '../../../text-input/text-input';
/* --- Components */


const AddressManual = ({
  updateHouseNumber,
  updatePostcode,
  updateStreet,
  updateCounty,
  houseNumber,
  updateTown,
  postcode,
  uniqKey,
  street,
  county,
  town,
  questionKey,
  validations,
  validate
}) => {
  const checkWithLength = (e) => {
    const value = e.target.value;
    if (value.length === 7) {
      validate({postcode: value, houseNumber}, {addressAuto: false});
    }
  };


  return (
    <div>
      <div>
        <TextInput
          type='text'
          placeholder='house number'
          onChange={(e) => updateHouseNumber(e, uniqKey)}
          validate={(value) => validate({houseNumber: value, town, postcode})}
          value={houseNumber}
          className={'margin-b-10'}
          valid={validations[`${uniqKey}.${questionKey}`]}
        />
      </div>
      <div>
        <TextInput
          type='text'
          placeholder='street'
          onChange={(e) => updateStreet(e, uniqKey)}
          value={street}
          className={'margin-b-10'}
        />
      </div>
      <div>
        <TextInput
          type='text'
          placeholder='town'
          onChange={(e) => updateTown(e, uniqKey)}
          value={town}
          validate={(value) => validate({houseNumber, town: value, postcode})}
          className={'margin-b-10'}
          valid={validations[`${uniqKey}.${questionKey}`]}
        />
      </div>
      <div>
        <TextInput
          type='text'
          placeholder='postcode'
          className={'margin-b-10'}
          onChange={(e) => updatePostcode(e, uniqKey)}
          onKeyUp={(e) => checkWithLength(e)}
          validate={(value) => validate({houseNumber, town, postcode: value})}
          valid={validations[`${uniqKey}.${questionKey}`]}
          value={postcode}
        />
      </div>
      <div>
        <TextInput
          type='text'
          placeholder='county'
          onChange={(e) => updateCounty(e, uniqKey)}
          value={county}
        />
      </div>
    </div>
  );
};

AddressManual.propTypes = {
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
  validations: PropTypes.object,
  validate: PropTypes.func,
  questionKey: PropTypes.string
};

AddressManual.defaultProps = {
  houseNumber: '',
  street: '',
  town: '',
  postcode: '',
  county: '',
  uniqKey: '',
  updateHouseNumber: () => {},
  updateStreet: () => {},
  updateTown: () => {},
  updateCounty: () => {},
  updatePostcode: () => {},
  validations: {},
  validate: () => {},
  questionKey: ''
};


export default AddressManual;
