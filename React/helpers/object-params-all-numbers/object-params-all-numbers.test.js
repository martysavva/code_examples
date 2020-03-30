/* eslint-disable */

/* Libs */
import assert from 'assert';
import {expect} from 'chai';
/* --- Libs */

/* Function */
import objectParamsAllNumbers from './object-params-all-numbers';
/* --- Function */

const name = 'objectParamsAllNumbers';
const testFunc = objectParamsAllNumbers;
const type = 'pure'; // pure / impure
const expectedReturn = 'boolean';

describe(`Function: ${name} -- ${type}`, () => {
  it('should return the expected type', () => {
    const value = testFunc({one: 1, two: 2});
    if (expectedReturn === 'array') {
      return assert.ok(Array.isArray(value));
    }
    assert.ok(typeof value === expectedReturn);
  });

  const objAllNums = {
    'x':12,
    'y':'105',
    'z':19
  };
  const objNotAllNums = {
    'x':12,
    'y':'b1',
    'z':19
  };

  it('should return true if all numbers', () => {
    expect(testFunc(objAllNums)).to.be.true;
    //single item in object
    expect(testFunc({'x':'12'})).to.be.true;
    expect(testFunc({'x':11})).to.be.true;
  });

  it('should return false if any values are strings', () => {
    expect(testFunc(objNotAllNums)).to.be.false;
    //single item in object
    expect(testFunc({'x':'p12'})).to.be.false;
  });
});
