'use strict';

/* Models */
import findAddress from '../../collections/addressLookup/find';
/* --- Models */

/* Logging */
import log4js from 'log4js';
const logger = log4js.getLogger();
/* -- Logging */

module.exports = {
  name: 'Address Lookup',
  synopsis: 'returns list of postcodes or address from supplied postcode and building number',
  method: 'GET',
  url: '/address-lookup/:postcode/:building',
  parameters: [
    {
      name: 'postcode',
      location: 'path',
      required: true,
      type: 'string',
      description: 'postcode to find'
    },
    {
      name: 'building',
      location: 'path',
      required: false,
      type: 'string',
      description: 'building to find'
    }
  ],
  action: (req, res) => {
    findAddress({
      postcode: req.params.postcode,
      building: req.params.building
    })
    .then((response) => {
      res.send(200, response.data);
    })
    .catch((e) => {
      logger.error(e);
      res.send(400, e);
    });
  }
};