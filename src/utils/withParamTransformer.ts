const withParamTransformer =
  <P1, P2, R>(
    paramTransformer: (...args: P1[]) => P2[],
    solution: (...args: P2[]) => R,
  ): ((...args: P1[]) => R) =>
  (...args) =>
    solution(...paramTransformer(...args));

export default withParamTransformer;
