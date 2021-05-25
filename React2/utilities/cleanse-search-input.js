const cleanseSearchInput = value => {
  const invalidChars = /[^0-9, ]/gi;
  const whiteSpaceFromBeginning = /^\s+/g;

  return invalidChars.test(value)
    ? value.replace(invalidChars, "").replace(whiteSpaceFromBeginning, "")
    : value.replace(whiteSpaceFromBeginning, "")
};

export default cleanseSearchInput;
