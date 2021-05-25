/* Libs */
import q from 'q';
import axios from 'axios';
/* --- Libs */

/* Config */
import config from 'config';
/* --- Config */


const model = ({jwtToken, branch, tag, type, query}) => {
  const deferred = q.defer();
  // temp
  const tyAr = type.split('/');
  const ty = tyAr[tyAr.length - 1];
  // end of temp
  const url = `${config.backend.baseUrl}/enquiry/question-option-lookup/${branch}/${tag}/${ty}/${query}`;
  const configs = {headers: {'Authorization': `Bearer ${jwtToken}`}};

  axios.get(url, configs)
    .then((response) => {
      deferred.resolve(response.data);
    })
    .catch((error) => {
      // if any errors then return empty array
      // ensures typeahead does not throw an exception
      deferred.resolve([]);
    });

  return deferred.promise;
};

export default model;
