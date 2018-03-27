# Contributing

First off, thank you for considering contributing to ReactNativeTips !

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.


## Reporting a small or "obvious" fixes

Small contributions such as fixing spelling errors, where the content is small enough to not be considered intellectual property, can be submitted by a contributor as a patch, without a CLA.

As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:
- Spelling / grammar fixes
- Typo correction, white space and formatting changes
- Comment clean up
- Bug fixes that change default return values or error codes stored in constants
- Adding logging messages or debugging output
- Changes to ‘metadata’ files like Gemfile, .gitignore, build scripts, etc.
- Moving source files from one directory or package to another


## Reporting Bugs & Feature Requests

If you would like to submit a feature request or report a bug, we encourage you to first look through the [issues](https://github.com/frichti/react-native-tips/issues) and [pull requests](https://github.com/frichti/react-native-tips/pulls) before filing a new issue. Be sure to fill out as much information as possible.


## Requesting new features

If you find yourself wishing for a feature that doesn't exist in ReactNativeTips, you are probably not alone. There are bound to be others out there with similar needs. Open an [issue](https://github.com/frichti/react-native-tips/issues) on our issues list on GitHub which describes the feature you would like to see, why you need it, and how it should work.


## Submitting a Pull Request

If you wish to submit a pull request for a new feature or issue, you should start by forking this repository first. This should get you setup on your local machine:


### Setup

*  Install [Node.js](https://nodejs.org/) if you have not already. (*We suggest you to use node v7.x.x*)
*  Fork the repo
* ```git clone https://github.com/*your_username*/react-native-tips.git && cd react-native-tips```
* ```yarn``` OR ```npm install```
* ```npm test```

One you have done this, create a new branch with a name that loosely describes the issue on which you will be working. Once you think you have the addressed the issue in question, submit a pull request to the `master` branch.


### Branch name

You must prefix your branch name by the purpose of your request. If it is a feature, you must name your branch like this: feature/xxx. If it is a fix: fix/xxx.


### Code quality

The quality of your code is important. You must respect the .eslint and code guidelines:
 - Always add @JSDoc in your functions
 - Never use `var`. Use `let` only if you do not have any other choice
 - camelCase should be used or all variables and file names.
 - Do not forget to implement unit tests. The goal is not to have 100% of coverage but ensure that all functions are robust
