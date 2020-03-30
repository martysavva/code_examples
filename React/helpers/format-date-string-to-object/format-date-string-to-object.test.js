/* eslint-disable */

/* Libs */
import assert from 'assert';
import {expect} from 'chai';
/* --- Libs */

/* Function */
import formatDateStringToObj from './format-date-string-to-object';
/* --- Function */

const name = 'formatDateStringToObj';
const testFunc = formatDateStringToObj;
const type = 'pure'; // pure / impure
const expectedReturn = 'object';

describe(`Function: ${name} -- ${type}`, () => {
  it('should return the expected type', () => {
    const value = testFunc('1980-01-01');
    if (expectedReturn === 'array') {
      return assert.ok(Array.isArray(value));
    }
    assert.ok(typeof value === expectedReturn);
  });

  it('should return the correct object shape, based on the passed string', () => {
    const value = testFunc('1980-01-01');
    const expectedValue = {day: '01', month: '01', year: '1980'};
    assert.deepEqual(value, expectedValue);
  });

  it('should return false if a non string is passed', () => {
    const value = testFunc(['1980-01-01', '1980-01-01']);
    assert.ok(value === false);
  });

  it('should return false if nothing is passed', () => {
    const value = testFunc();
    assert.ok(value === false);
  });
});
