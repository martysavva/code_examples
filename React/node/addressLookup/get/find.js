/* Libs */
import q from 'q';
import axios from 'axios';
/* --- Libs */

/* Config */
import config from 'config';
/* --- Config */

/**
 * Find Address
 * @desc Finds and returns either an address (if house name/number provided) or a address set if only a postcode
 *       is provided. Using the PCAPredict api.
 * @param postcode {string} - the postcode to search
 * @param building {string} - the building to search
 * @returns {promise}
*/
const model = ({postcode, building}) => {
  const {pca: {key, addressSearch: {postcodeAndBuildingURL, useMockData}}} = config;
  const deferred = q.defer();
  // alter url if there is building supplied
  const url = building !== 'null' ? `${postcodeAndBuildingURL}?key=${key}&building=${building}&postcode=${postcode}` : `${postcodeAndBuildingURL}?key=${key}&postcode=${postcode}`;
  // Call PCA predict
  axios.get(url).then((response) => {
    deferred.resolve(response);
  }).catch((e) => {
    deferred.reject(e);
  });
  return deferred.promise;
};

export default model;
