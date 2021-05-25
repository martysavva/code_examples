// Libs
import querystring from "querystring";

/**
 * returns the value from the supplied key and queryParams, will return empty string if no result found
 *
 * @param queryParams - {string}: supplied query params from the history object, example: '?v=3&token=abcdef'
 * @param key - {string}: the key to search for
 * @returns {string}
 */
export const getValueFromQueryParams = (queryParams, key) => {
  // if no query params return empty string
  if (!!queryParams === false) {
    return "";
  }

  // strip '?' from start of query params
  if (queryParams.charAt(0) === "?") queryParams = queryParams.slice(1);

  // transform query params into objects
  const parsed = querystring.parse(queryParams);

  return (
    Object.keys(parsed)
      .map(k => {
        if (k === key) {
          return parsed[k];
        }
        return "";
      })
      .filter(x => {
        return !!x;
      })[0] || ""
  );
};
