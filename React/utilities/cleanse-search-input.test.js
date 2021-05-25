// Function
import cleanseSearchInput from "./cleanse-search-input";

const name = "cleanseSearchInput";
const testFunc = cleanseSearchInput;
const type = "pure"; // pure / impure
const expectedReturn = "string";
const deps = ["none"];

describe(`Function: ${name} -- ${type} -- dependencies: [${deps}]`, () => {
  it("should return the expected type", () => {
    // setup
    const queryParams = "1234, 4567";

    // test
    const value = testFunc(queryParams);
    expect(typeof value).toBe(expectedReturn);
  });

  it("should strip blacklisted characters", () => {
    // setup
    //alphanumberics, comma, space are the only allowed chars
    const queryParams = "123p;x 456, 7v89-";
    const result = "123 456, 789";

    // test
    const value = testFunc(queryParams);
    expect(value).toBe(result);
  });

  it("should return original value if value is clean", () => {
    // setup
    const queryParams = "123 456, 789";
    const result = "123 456, 789";

    // test
    const value = testFunc(queryParams);
    expect(value).toBe(result);
  });

  it("should remove single white space if that is whole string", () => {
    // setup
    const queryParams = " ";
    const result = "";

    // test
    const value = testFunc(queryParams);
    expect(value).toBe(result);
  });

  it("should remove white space from beginning of string", () => {
    // setup
    const queryParams = "       123 456, 789";
    const result = "123 456, 789";

    // test
    const value = testFunc(queryParams);
    expect(value).toBe(result);
  });
});
