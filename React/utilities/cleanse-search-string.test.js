// Function
import cleanseSearchString from "./cleanse-search-string";

const name = "cleanseSearchString";
const testFunc = cleanseSearchString;
const type = "pure"; // pure / impure
const expectedReturn = "array";
const deps = ["none"];

describe(`Function: ${name} -- ${type} -- dependencies: [${deps}]`, () => {
  it("should return the expected type", () => {
    // setup
    const queryParams = "1234, 4567";

    // test
    const value = testFunc(queryParams);
    expect(Array.isArray(value)).toBe(true);
  });

  it("should strip commas and spaces", () => {
    // setup
    const queryParams = "1, 2 3, 4, 5     6,,,,,,,,,,7";
    const result = ["1", "2", "3", "4", "5", "6", "7"];

    // test
    const value = testFunc(queryParams);
    expect(value).toEqual(result);
  });

  it("should trim white space", () => {
    // setupw
    const queryParams = "      1, 2, 3     ";
    const result = ["1", "2", "3"];

    // test
    const value = testFunc(queryParams);
    expect(value).toEqual(result);
  });

  it("should trim trailing commas", () => {
    // setupw
    const queryParams = ",,,1, 2, 3,,,";
    const result = ["1", "2", "3"];

    // test
    const value = testFunc(queryParams);
    expect(value).toEqual(result);
  });

  it("should remove duplicates", () => {
    // setup
    const queryParams = "1, 2 3, 1 2, 2, 2 1 4";
    const result = ["1", "2", "3", "4"];

    // test
    const value = testFunc(queryParams);
    expect(value).toEqual(result);
  });
});
