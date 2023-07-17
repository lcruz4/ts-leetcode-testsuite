const paramTransformer = (input: number) => {
  // another trivial example since you can just represent the input as a string
  // in your input#.json file, but this will convert the type of input to a
  // string. NOTE: always return params as an array, even if there is just one.
  // this is so that multiple parameters can be supported.
  return [input.toString()];
};

export default paramTransformer;
