'use strict';
/* Libs */
import restify from 'restify';
import config from 'config';
import should from 'should';
import {expect} from 'chai';
/* --- Libs */

/* Testing Model */
import model from '../type-ahead';
const modelName = 'typeahead/post/type-ahead';
/* --- Testing Model */

/* Auth */
import setAuth from '../../../auth/post/set-auth';
/* --- Auth */

describe(`MODEL: ${modelName}`, () => {
  let result;
  const exampleInput = {
  	"branch":"LVNonComparison",
  	"tag":"ecember rules",
  	"type":"OCCUPATION",
  	"query":"ang"
  };
  before(function(done) {
    setAuth().then((r) => {
      exampleInput.jwtToken = r.access_token;
      model(exampleInput).then((re) => {
        result = re;
        done();
      });
    });
  });
  it('should return an array', () => {
    expect(result).to.be.an('array');
  });

  it('should return suggestions based on the query', () => {
    expect(result.indexOf("Anaesthetist") > -1).equal(true);
    expect(result.indexOf("Analyst") > -1).equal(true);
    expect(result.indexOf("Anodiser") > -1).equal(true);
  })
});
