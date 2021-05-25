// Function
import arrayEquality from "./array-equality";



// Setup
const name = "arrayEquality";
const testFunc = arrayEquality;
const type = "pure"; // pure / impure
// const expectedReturn = "array";
const deps = ["none"];

describe(`Function: ${name} -- ${type} -- dependencies: [${deps}]`, () => {

  it("should return the expected type", () => {
    // setup
    const arr1 = ['0'];
    const arr2 = ['0'];

    // test
    const value = testFunc(arr1,arr2);
    expect(value).toEqual(true);
  });

  it("should return true if both arrays are identical", () => {
    // setup
    const arr1 = ['0', '2', '1'];
    const arr2 = ['0', '2', '1'];

    // test 1
    const value = testFunc(arr1, arr2);
    expect(value).toEqual(true);
  });

  it("should return true if both arrays are identical with mixed types", () => {
    // setup
    const arr1 = ['0', 2, '1', true, 12];
    const arr2 = ['0', 2, '1', true, 12];

    // test 1
    const value = testFunc(arr1, arr2);
    expect(value).toEqual(true);
  });

  it("should return false if array 1 is not an array", () => {
    // setup
    const arr1 = {'0':0, '2':2, '1':1};
    const arr2 = ['0', '2', '1'];

    // test
    const value = testFunc(arr1,arr2);
    expect(value).toEqual(false);
  });

  it("should return false if array 2 is not an array", () => {
    // setup
    const arr1 = ['0', '2', '1'];
    const arr2 = {'0':0, '2':2, '1':1};


    // test
    const value = testFunc(arr1, arr2);
    expect(value).toEqual(false);
  });

  it("should return false if array 1 has a different length to array 2", () => {
    // setup
    const arr1 = ['0', '2', '1', '4'];
    const arr2 = ['0', '2', '1'];


    // test
    const value = testFunc(arr1, arr2);
    expect(value).toEqual(false);
  });

  it("should return false if array 2 has a different length to array 1", () => {
    // setup
    const arr1 = ['0', '2'];
    const arr2 = ['0', '2', '1'];


    // test
    const value = testFunc(arr1, arr2);
    expect(value).toEqual(false);
  });

  it("should return false if values do not match", () => {
    // setup
    const arr1 = ['0', '2', 1, '4'];
    const arr2 = ['0', '2', '1', '4'];


    // test
    const value = testFunc(arr1, arr2);
    expect(value).toEqual(false);
  });

  it("should return false if order of values do not match", () => {
    // setup
    const arr1 = ['0', '2', '4', '1'];
    const arr2 = ['0', '2', '1', '4'];


    // test
    const value = testFunc(arr1, arr2);
    expect(value).toEqual(false);
  });
});
