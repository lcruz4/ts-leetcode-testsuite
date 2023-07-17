const test = (ans: number, expected: number) => {
  // this is totally unnecessary in this simple example because by default
  // JSON.stringify(ans) === JSON.stringify(expected) is done.
  return ans === expected;
};

export default test;
