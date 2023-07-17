import { readdirSync } from 'fs';
import { resolve } from 'path';
import { log, importDefault } from '@utils';
import { handleArgs, prepTestCase, trySolution } from '../common/leetcode';

(async () => {
  const { problem, testInd, ...options } = handleArgs();
  const problemDirs = readdirSync(resolve(__dirname));

  if (!problem) {
    log('Please specify problem such as p11', 'red');
    return;
  }

  for (const problemDir of problemDirs) {
    if (problem === problemDir) {
      const dirName = resolve(__dirname, problemDir);
      const pFiles = readdirSync(dirName);
      const test = await importDefault(dirName + '/test.ts');
      const solution = await importDefault(dirName + '/index.ts');

      for (const file of pFiles) {
        if (file.startsWith('input' + (testInd || ''))) {
          const params = await prepTestCase({
            file,
            solution,
            dirName,
          });

          if (!trySolution({ ...params, ...options, test, dirName })) {
            return;
          }
        }
      }
      return;
    }
  }

  log(`Problem ${problem} not found`, 'red');
})();
