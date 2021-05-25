/**
 * Returns an array with specified item in index moved to new index
 *
 * example:
 *
 * input:
 * const myArray = ['1','2','3','4']
 * oldIndex = 0
 * newIndex = 3
 *
 * implementation:
 * arrayMove(myArray, oldIndex, newIndex);
 *
 * output:
 * ['2','3','4','1']
 *
 *
 * @param arr {array} - array of items
 * @param old_index {integer} - current index of item to move
 * @param new_index {integer} - new index of item
 * @returns {array}
 */

const arrayMove = (arr, old_index, new_index) => {
  // if either index is greater than array length then return original array
  if (new_index >= arr.length || old_index >= arr.length) {
    return arr;
  }

  // if either index is less than 0 then return original array
  if (new_index < 0 || old_index < 0) {
    return arr;
  }

  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};
export default arrayMove;