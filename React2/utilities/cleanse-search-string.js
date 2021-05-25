/**
 * Cleanses a user inputted search string, does the following:
 * 1. trims white space from start/end
 * 2. removes all commas and spaces and generates an array of the remaining values
 * 3. removes all duplicates from the array
 * 4. filters out empty array elements (due to preceeding/trailing commas)
 *
 * example:
 * Input: '1, 2, 1, 3 4     5,,, 6 '
 * Result: ['1', '2', '3', '4, '5', '6']
 *
 * @param value {string} - search string
 * @returns {array}
 */
const cleanseSearchString = value => {
  const regex = /[\s,]+/g;
  return Array.from(
    new Set(value.trim().split(regex))
  ).filter(x => !!x);
};

export default cleanseSearchString;
