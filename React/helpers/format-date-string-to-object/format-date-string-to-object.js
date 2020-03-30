/**
 * Formats a date string (separated with -'s) into an object
 * @param datesStr {string} - the date string to format = '1980-01-01'
 * @returns {object} e.g. {day: 01, month: 01, year: 1980}
 * NOTES: Used to be called formatDOB
*/
const formatDateStringToObj = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const dAr = dateStr.split('-');
  return {
    day: dAr[2],
    month: dAr[1],
    year: dAr[0]
  };
};

export default formatDateStringToObj;
