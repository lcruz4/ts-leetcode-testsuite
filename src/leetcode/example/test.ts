const test = (ans: number, expected: number) => {
  // this is totally unnecessary in this simple example because by default
  // JSON.stringify(ans) === JSON.stringify(expected) is done.
  console.log("this is totally unnecessary!");
  return ans === expected;
};

export default test;
