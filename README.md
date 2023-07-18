# TYPESCRIPT LEETCODE SUITE

## Introduction

This is a suite for running leetcode problems in typescript. It's meant to be a simple way to run and test your solutions to leetcode problems in vscode. It gives you timing info for your solutions and let's you define as many test cases as you'd like. It also allows you to debug your solutions in vscode.

## Directory Structure

```
├── README.md
├── src
│   ├── leetcode
│   │   ├── p11
│   │   │   ├── index.ts
│   │   │   └── input1.json
│   │   │   └── input2.json
│   │   │   └── output1.json
│   │   │   └── output2.json
│   │   │   └── paramTransformer.ts
│   │   │   └── test.ts
│   │   └── index.ts
│   └── utils
│   │   └── ...
│   └── scripts
│   │   └── ...
```

## How to add a new problem

1. Create a new folder in `src/leetcode` in the format `p##` where `##` is the problem number
2. Create a new file in the folder called `index.ts` this should `export default` your solution
3. Create a new file in the folder called `input#.json` where # is the test case number
   _ this file should contain the input you want to test your solution with
   _ you can make as many of these as you'd like
   Optional:
4. Create a new file in the folder called `output#.json` where # is the test case number
   - this file should contain the output you expect from your solution
   - these are optional and the number corresponds to the input file number
5. Create a new file in the folder called `test.ts` this should export a test suite for your solution
   - this file is optional when simply comparing the output of your solution and your output file won't work (i.e. if the solution is an array that doesn't have a defined order)
6. Create a new file in the folder called `paramTransformer.ts` this should export a function that takes in the input as it's native type such as an array, and returns the params as the type that is actually needed in the solution as **an array**.
   - this file is optional and only needed when the input is not in the correct format for your solution
   - if `paramTransformer` does not return the transformed arguments as an array it will not work. This was done in order to support multiple arguments
   - see the section on paramTransformer for more info

## How to run

1. `npm install`
2. `npm run lc p##` - this will run all the test cases for the problem you specified

### running a specific test case

`npm run lc p## ##`
If you want to run a specific test case you can specify a test case number like so: `npm run lc p## ##` where the second `##` is the test case number that corresponds to the input file you created.

### running time only tests

`npm run lc p## [##] time`
Optionally your second or third argument can be `time` which will still run all the testcases but will only time them and not check the solutions against the output files. This can be useful when you are confident your solution is correct, but your test function takes a long time with large inputs.

### writing output to file

`npm run lc p## ## write`
The third argument can also be `write` which will write the output of your solution to the output file of the corresponding test case. A test case must be specified as the second argument. This can be useful when you have a large output and leetcode is cutting off the entire answer.

## How to debug

Simply use the debug feature through vscode. You should see the option `ts-node debugger` automatically. It will bring up a prompt in the terminal asking you which problem, test suite, and any options you want. You can set breakpoints in your solution and step through the code. You can also use the `debugger` keyword in your solution to set breakpoints.

## Adding multiple arguments in input#.json

To add multiple arguments in your input#.json, set your json like so

```
{
    "arg1": ...,
    "arg2": ...,
}
```

if input file is an object with at least an arg1 key, it will send each key as a positional argument to your solution.

## Param Transformer

Some problems require you to define a data structure and that data structure is used as the input. In order to support this you can create a `paramTransformer.ts` file in the problem directory. This file should default export a function that takes in the input as it's native type such as an array, and returns the params as the type that is actually needed in the solution as **an array**.

Example: problem 23 takes an array of `ListNode`s as input. The input, however, is represented as a `number[][]`. Note also that the problem gives you the class definition for a ListNode. You'll need to define the `ListNode` class somewhere, so it is recommended to also create an `extra.ts` file whenever there is extra code that is not needed in your solution. You can define `ListNode` in `extra.ts` and export it. You can then import it in a file called `paramTransformer.ts` and use it to convert the `number[][]` to a `ListNode[]`. When you run this problem it will automatically use the paramTransformer to give the correct input to your solution function.

Also see `src/leetcode/example/paramTransformer.ts` for a trivial example.
