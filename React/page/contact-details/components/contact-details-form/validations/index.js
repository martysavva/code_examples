/**
 * === ContactDetailsForm Validations ===
 * @param uniqKey {string} - The validation key
 * @param value {string/number/object} - The value passed either on blur or another trigger
 * @param setValidation {function} - The action to set the validation
 * @returns {bool} - The returned value of the validation
*/

/* Helpers */
import {generateStringFromTemplate} from '../../../../../helpers/utils/';
/* --- Helpers */

/* Validation Helpers */
import * as Validations from '../../../../../helpers/validations/validation-booleans';
import ValidationMessages from '../../../../../helpers/validations/validation-messages/validation-messages.json';
/* --- Validation Helpers */

export const validateAndUpdate = (value, validationKey, uniqKey, setValidation, updateInformation) => {
  const notNull = Validations.general.isNotNull(value);
  const isValid = notNull;
  setValidation({
    key: `${uniqKey}.${validationKey}`,
    validations: [
      {
        valid: notNull,
        msg: ValidationMessages.notNull,
        rule: {}
      }
    ],
    isValid
  });
  updateInformation(value, validationKey, uniqKey);
  return isValid;
};

export const validateUKResident = (uniqKey, value, setValidation = () => {}) => {
  const notNull = Validations.general.isNotNull(value);
  const isTrue = Validations.general.isTrue(value);
  const isValid = (notNull && isTrue);
  if (!notNull) {
    setValidation({
      key: `${uniqKey}.UK_RESIDENT`,
      validations: [
        {
          valid: notNull,
          msg: ValidationMessages.notNull,
          rule: {}
        }
      ],
      isValid
    });
    return false;
  }
  setValidation({
    key: `${uniqKey}.UK_RESIDENT`,
    validations: [
      {
        valid: notNull,
        msg: ValidationMessages.notNull,
        rule: {}
      },
      {
        valid: isTrue,
        msg: ValidationMessages.notUkResident,
        rule: {}
      }
    ],
    isValid
  });
  return isValid;
};


export const validateTitleAndUpdate = (value, validationKey, uniqKey, setValidation, updateInformation, isOther = false) => {
  const notNull = Validations.general.isNotNull(value);
  let isValid = notNull;
  if (!isOther) {
    setValidation({
      key: `${uniqKey}.${validationKey}`,
      validations: [
        {
          valid: notNull,
          msg: ValidationMessages.notNull,
          rule: {}
        }
      ],
      isValid
    });
    updateInformation(value, validationKey, uniqKey);
    return isValid;
  }

  const isStringLongEnough = Validations.string.isStringXCharsOrMore(value, 2);
  const isStringNotTooLong = Validations.string.isStringXCharsOrLess(value, 20);
  const noNumbers = Validations.string.hasNoNumbers(value);
  isValid = notNull && isStringLongEnough && noNumbers && isStringNotTooLong;
  setValidation({
    key: `${uniqKey}.${validationKey}`,
    validations: [
      {
        valid: notNull,
        msg: ValidationMessages.notNull,
        rule: {exclusive: true}
      },
      {
        valid: isStringLongEnough,
        msg: generateStringFromTemplate(ValidationMessages.stringMinCharsValidation, {minChars: 2}),
        rule: {exclusive: true}
      },
      {
        valid: isStringNotTooLong,
        msg: generateStringFromTemplate(ValidationMessages.stringMaxCharsValidation, {maxChars: 20}),
        rule: {exclusive: true}
      },
      {
        valid: noNumbers,
        msg: ValidationMessages.noNumbers,
        rule: {exclusive: true}
      }
    ],
    isValid
  });

  updateInformation(value, validationKey, uniqKey);
  return isValid;
};
