/**
 * Returns true if all object values are numbers
 * @param obj {object}
 * @returns {boolean}
 */
const objectParamsAllNumbers = (obj) => !Object.values(obj).find((elem) => {
  return isNaN(elem);
});

export default objectParamsAllNumbers;
