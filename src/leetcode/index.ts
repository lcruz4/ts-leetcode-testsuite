import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { log, withParamTransformer } from "@utils";

const trunc = (str: string): string => {
  const truncStr = str.slice(0, 200);
  return truncStr + (truncStr.length !== str.length ? "..." : "");
};

(async () => {
  const problem = process.argv[2];
  const testInd = parseInt(process.argv[3]);
  const writeOutput = process.argv[4] === "write";
  const timeOnly = process.argv[3] === "time" || process.argv[4] === "time";
  const problemDirs = readdirSync(resolve(__dirname));

  if (!problem) {
    log("Please specify problem such as p11", "red");
    return;
  }

  for (const problemDir of problemDirs) {
    if (problem === problemDir) {
      const pFiles = readdirSync(resolve(__dirname, problemDir));
      let test, solution;

      const { default: index } = await import(
        resolve(__dirname, problemDir, "index.ts")
      );
      solution = index;

      try {
        const { default: testFn } = await import(
          resolve(__dirname, problemDir, "test.ts")
        );
        test = testFn;
      } catch (e) {}

      for (const file of pFiles) {
        if (file.startsWith("input" + (testInd || ""))) {
          const inputInd = file.match(/\d+/)?.[0];
          const { default: input } = await import(
            resolve(__dirname, problemDir, file)
          );
          const outputFilename = `output${inputInd}.json`;
          let output, paramTransformer;

          try {
            const { default: outputJson } = await import(
              resolve(__dirname, problemDir, outputFilename)
            );
            output = outputJson;
          } catch (e) {}
          try {
            const { default: paramTransformerDefault } = await import(
              resolve(__dirname, problemDir, 'paramTransformer.ts')
            );
            paramTransformer = paramTransformerDefault;
          } catch (e) {}
          log(`Test case ${inputInd}:`, "teal");
          log(`Input: ${trunc(JSON.stringify(input))}`, "yellow");

          let args = [input];
          if (
            input &&
            typeof input === "object" &&
            Object.keys(input).indexOf("arg1") >= 0
          ) {
            args = Object.keys(input).map((key) => input[key]);
          }

          if (paramTransformer) {
            solution = withParamTransformer(paramTransformer, solution);
          }
          const start = performance.now();
          const ans = solution(...args);
          const end = performance.now();
          const strAns = JSON.stringify(ans);
          const strOutput = JSON.stringify(output);

          if (!timeOnly) {
            if (output !== undefined) {
              const testResult = test
                ? test(ans, output)
                : strAns === strOutput;

              if (!testResult) {
                log(
                  `Answer: ${trunc(strAns)} is incorrect!\nExpected: ${trunc(
                    strOutput,
                  )}\nSolution finished in ${end - start}ms`,
                  "red",
                );
                return;
              }
            } else if (writeOutput) {
              writeFileSync(
                resolve(__dirname, problemDir, outputFilename),
                strAns,
              );
            }
          }
          log(
            `Answer: ${trunc(strAns)}\nSolution finished in ${(
              end - start
            ).toFixed(3)}ms`,
            "green",
          );
        }
      }
      return;
    }
  }

  log(`Problem ${problem} not found`, "red");
})();
