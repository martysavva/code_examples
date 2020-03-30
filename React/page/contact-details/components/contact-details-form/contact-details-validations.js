/* Libs */
import * as Validations from '../../../../helpers/validations';
import ValidationMessages from '../../../../helpers/validation-messages.json';
/* --- Libs */

/* Helpers */
import {generateStringFromTemplate} from '../../../../helpers/utils';
/* --- Helpers */

export const validateAddress = (uniqKey, value, setValidation, options) => {
  const notNull = Validations.notNull(value);
  const isValidPostCode = Validations.isValidPostCode(value.postcode);
  if (!notNull) {
    return setValidation({
      key: `${uniqKey}.ADDRESS`,
      validations: [
        {
          valid: false,
          msg: ValidationMessages.notNull,
          rule: {}
        }
      ],
      isValid: false
    });
  }
  return setValidation({
    key: `${uniqKey}.ADDRESS`,
    validations: [
      {
        valid: isValidPostCode,
        msg: ValidationMessages.validPostCode,
        rule: {}
      }
    ]
  });
};
