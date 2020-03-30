'use strict';

/* Middleware */
import extractJwt from '../../middleware/extract-jwt';
/* --- Middleware */

/* Models */
import typeAhead from '../../model/typeahead/post/type-ahead';
/* --- Models */

/* Logging */
import log4js from 'log4js';
const logger = log4js.getLogger();
/* -- Logging */

module.exports = {
  name: 'Type ahead',
  synopsis: 'returns array of queried items',
  method: 'POST',
  middleware: [extractJwt],
  url: '/type-ahead',
  parameters: [
    {
      name: 'branch',
      location: 'body',
      required: true,
      type: 'string',
      description: 'branch'
    },
    {
      name: 'tag',
      location: 'body',
      required: true,
      type: 'string',
      description: 'tag'
    },{
      name: 'type',
      location: 'body',
      required: true,
      type: 'string',
      description: 'type'
    },{
      name: 'query',
      location: 'body',
      required: true,
      type: 'string',
      description: 'query'
    }
  ],
  action: (req, res) => {
    typeAhead({
      jwtToken: req.jwtData,
      branch: req.body.branch,
      tag: req.body.tag,
      type: req.body.type,
      query: req.body.query
    })
    .then((data) => {
      res.send(200, data);
    })
    .catch((e) => {
      logger.error(e);
      res.send(400, e);
    });
  }
};
