import { readdirSync } from 'fs';
import { prompt } from 'inquirer';
import { resolve } from 'path';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const problemDirs = readdirSync(resolve(__dirname, '../leetcode'))
    .filter((dir) => dir.startsWith('p'))
    .reverse();

  /** !!!!!!!!HACK!!!!!!!
   * VScode debugger for some reason will immediately trigger a return character
   * so this is to absorb that return character so that the prompt will show up.
   * If running outside of vscode, this will wait 100ms before showing the prompt.
   */
  await new Promise((resolve) => {
    rl.question('', resolve);
    setTimeout(resolve, 100);
  });
  /** !!!!!!END HACK!!!!! */

  const { problemDir } = await prompt([
    {
      type: 'list',
      name: 'problemDir',
      message: 'Which problem would you like to debug?',
      choices: problemDirs,
      pageSize: 20,
      prefix: '👉',
    },
  ]);

  const tests = readdirSync(
    resolve(__dirname, '../leetcode', problemDir),
  ).filter((file) => file.startsWith('input'));
  const choices = [
    'All',
    ...tests.reverse().map((test) => test.match(/\d+/)?.[0]),
  ];

  const { test, command } = await prompt([
    {
      type: 'list',
      name: 'test',
      message: 'Which test would you like to debug?',
      choices,
      pageSize: 20,
      prefix: '👉',
    },
    {
      type: 'list',
      name: 'command',
      message: 'Any options?',
      choices: ['GO!', 'write', 'time'],
      pageSize: 20,
      prefix: '👉',
    },
  ]);

  const spawnArgs = [
    problemDir,
    ...(test === 'All' ? [] : [test]),
    ...(command === 'GO!' ? [] : [command]),
  ];

  process.argv = [...process.argv.slice(0, 2), ...spawnArgs];

  await import(resolve(__dirname, '../leetcode', 'index.ts'));
})();
