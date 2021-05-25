// Function
import arrayMove from "./array-move";



// Setup
const name = "arrayMove";
const testFunc = arrayMove;
const type = "pure"; // pure / impure
const expectedReturn = "array";
const deps = ["none"];

describe(`Function: ${name} -- ${type} -- dependencies: [${deps}]`, () => {

  it("should return the expected type", () => {
    // setup
    const input = ['0','1','2'];

    // test
    const value = testFunc(input,0,2);
    expect(Array.isArray(value)).toEqual(true);
  });

  describe("arrayMove tests", () => {
    it("returns array in correct order", () => {
      expect(testFunc(['0','1','2','3'], 0, 3)).toEqual(['1','2','3','0']);
      expect(testFunc(['0','1','2','3'], 1, 2)).toEqual(['0','2','1','3']);
      expect(testFunc(['0','1','2','3'], 2, 0)).toEqual(['2','0','1','3']);
      expect(testFunc(['0','1','2','3'], 2, 2)).toEqual(['0','1','2','3']);
    });

    it("should return original array if new index is greater than array length", () => {
      expect(testFunc(['0','1','2','3'], 0, 12)).toEqual(['0','1','2','3']);
    });

    it("should return original array if old index is greater than array length", () => {
      expect(testFunc(['0','1','2','3'], 12, 2)).toEqual(['0','1','2','3']);
    });

    it("should return original array if new index is less than 0", () => {
      expect(testFunc(['0','1','2','3'], -1, 2)).toEqual(['0','1','2','3']);
    });

    it("should return original array if old index is less than 0", () => {
      expect(testFunc(['0','1','2','3'], -1, 2)).toEqual(['0','1','2','3']);
    });
  });
});
