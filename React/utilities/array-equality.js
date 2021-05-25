/**
 * compares two arrays for:
 * 1. both params are arrays
 * 2. both arrays have the same length
 * 3. all values in the array are the same value and type
 *
 * Any failure of any the above will return false
 *
 * Note: shallow checks only, i.e. will not check nested objects etc.
 *
 * @param a1 {array} - first array to compare
 * @param a2 {array} - second array to compare
 * @returns {boolean}
 */
const arrayEquality = (a1, a2) => {
  // check if params are not arrays
  if (!Array.isArray(a1)){return false}
  if (!Array.isArray(a2)){return false}
  // check if arrays are equal length
  if(a1.length !== a2.length){return false}
  // check that each entry in the arrays are the same
  return a1.every((item, idx)=>{
    return item === a2[idx];
  })
};

export default arrayEquality;