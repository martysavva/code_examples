// Libs
import querystring from "querystring";

// Function
import { getValueFromQueryParams } from "./get-value-from-query-params";

const name = "getValueFromQueryParams";
const testFunc = getValueFromQueryParams;
const type = "pure"; // pure / impure
const expectedReturn = "string";
const deps = ["querystring"];

describe(`Function: ${name} -- ${type} -- dependencies: [${deps}]`, () => {
  it("should return the expected type", () => {
    // setup
    const queryParams = "?v=3&token=abcdef";
    const key = "token";

    // test
    const value = testFunc(queryParams, key);
    expect(typeof value).toBe(expectedReturn);
  });

  it("should strip off leading '?' and return correct result", () => {
    // setup
    const queryParams = "?v=3&token=abcdef";
    const key = "token";
    const result = "abcdef";

    // test
    const value = testFunc(queryParams, key);
    expect(value).toBe(result);
  });

  it("should return correct result", () => {
    // setup
    const queryParams = "v=3&token=abcdef";
    const key = "v";
    const result = "3";

    // test
    const value = testFunc(queryParams, key);
    expect(value).toBe(result);
  });

  it("should return empty string if no value found", () => {
    // setup
    const queryParams = "v=3&token=abcdef";
    const key = "keydoesntexist";
    const result = "";

    // test
    const value = testFunc(queryParams, key);
    expect(value).toBe(result);
  });
});
