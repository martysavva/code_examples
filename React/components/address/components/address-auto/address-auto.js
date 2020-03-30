/* Libs */
import React from 'react';
import PropTypes from 'prop-types';
/* --- Libs */

/* Components */
import TextInput from '../../../text-input/text-input';
/* --- Components */

/* CSS */
import './address-auto.scss';
/* --- CSS */


const AddressAuto = ({
  updateHouseNumber,
  updatePostcode,
  validations,
  questionKey,
  houseNumber,
  postcode,
  validate,
  uniqKey
}) => {
  const checkWithLength = (e) => {
    const value = e.target.value;
    if (value.length === 7) {
      validate({postcode: value, houseNumber}, {addressAuto: true});
    }
  };

  return (
    <div>
      <div>
        <TextInput
          type='text'
          placeholder='house number'
          onChange={(e) => updateHouseNumber(e, uniqKey)}
          validate={(value) => validate({postcode, houseNumber: value}, {addressAuto: true})}
          valid={validations[`${uniqKey}.${questionKey}`]}
          value={houseNumber}
          className={'margin-b-10'}
        />
      </div>
      <div>
        <TextInput
          type='text'
          placeholder='postcode'
          className='postcode'
          onChange={(e) => updatePostcode(e, uniqKey)}
          validate={(value) => validate({postcode: value, houseNumber}, {addressAuto: true, isPostCode: true})}
          onKeyUp={(e) => checkWithLength(e)}
          valid={validations[`${uniqKey}.${questionKey}`]}
          value={postcode}
        />
      </div>
    </div>
  );
};

AddressAuto.propTypes = {
  houseNumber: PropTypes.string,
  postcode: PropTypes.string,
  uniqKey: PropTypes.string,
  updateHouseNumber: PropTypes.func,
  updatePostcode: PropTypes.func,
  validations: PropTypes.object,
  questionKey: PropTypes.string,
  validate: PropTypes.func
};

AddressAuto.defaultProps = {
  houseNumber: '',
  postcode: '',
  uniqKey: '',
  questionKey: false,
  validations: {},
  checkValidations: () => {},
  updateHouseNumber: () => {},
  updatePostcode: () => {},
  validate: () => {}
};


export default AddressAuto;
