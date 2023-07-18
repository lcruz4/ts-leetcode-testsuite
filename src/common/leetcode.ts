import { writeFileSync } from 'fs';
import { importDefault, log, trunc, truncNestedObject, withParamTransformer } from '@utils';

export const handleArgs = () => {
  const problem = process.argv[2];
  const testInd = parseInt(process.argv[3]);
  const writeOutput = process.argv[4] === 'write';
  const timeOnly = process.argv[3] === 'time' || process.argv[4] === 'time';

  return { problem, testInd, writeOutput, timeOnly };
};

interface IHandleTestCaseProps {
  file: string;
  solution: (...args: any[]) => any;
  dirName: string;
}

/**
 * handles some logging as well as getting all the test case specific parameters
 */
export const prepTestCase = async ({
  file,
  solution,
  dirName,
}: IHandleTestCaseProps) => {
  const inputInd = file.match(/\d+/)?.[0];
  const input = await importDefault(`${dirName}/${file}`);
  const outputFilename = `output${inputInd}.json`;
  const output = await importDefault(`${dirName}/${outputFilename}`);
  const paramTransformer = await importDefault(
    `${dirName}/paramTransformer.ts`,
  );

  log(`Test case ${inputInd}:`, 'teal');
  log(`Input: ${trunc(JSON.stringify(input))}`, 'yellow');

  let args = [input];
  if (
    input &&
    typeof input === 'object' &&
    Object.keys(input).indexOf('arg1') >= 0
  ) {
    args = Object.keys(input).map((key) => input[key]);
  }

  if (paramTransformer) {
    solution = withParamTransformer(paramTransformer, solution);
  }

  return {
    solution,
    args,
    output,
    outputFilename,
  };
};

interface ITrySolutionProps {
  solution: (...args: any[]) => any;
  args: any[];
  timeOnly: boolean;
  output: any;
  test: (...args: any[]) => boolean;
  writeOutput: boolean;
  outputFilename: string;
  dirName: string;
}

/**
 * tries solution and logs the result
 */
export const trySolution = ({
  solution,
  args,
  timeOnly,
  output,
  test,
  writeOutput,
  outputFilename,
  dirName,
}: ITrySolutionProps) => {
  const start = performance.now();
  const ans = solution(...args);
  const end = performance.now();
  const strAns = JSON.stringify(truncNestedObject(ans));
  const strOutput = JSON.stringify(output);

  if (!timeOnly) {
    if (output !== undefined) {
      const testResult = test ? test(ans, output) : strAns === strOutput;

      if (!testResult) {
        log(
          `Answer: ${trunc(strAns)} is incorrect!\nExpected: ${trunc(
            strOutput,
          )}\nSolution finished in ${end - start}ms`,
          'red',
        );
        return false;
      }
    } else if (writeOutput) {
      writeFileSync(`${dirName}/${outputFilename}`, strAns);
    }
  }
  log(
    `Answer: ${trunc(strAns)}\nSolution finished in ${(end - start).toFixed(
      3,
    )}ms`,
    'green',
  );

  return true;
};
