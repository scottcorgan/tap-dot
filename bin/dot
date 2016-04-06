#!/usr/bin/env node

var through = require('through2');
var parser = require('tap-out');
var chalk = require('chalk');
var out = through();
var tap = parser();
var currentTestName = '';
var errors = [];
var extra = [];
var assertCount = 0;
var lastComment;

process.stdin.pipe(tap);

out.push('\n');

function outPush (str) {

  out.push('  ' + str);
};

tap.on('comment', function (comment) {

  lastComment = comment;
});

var firstTestDone = false;

tap.on('assert', function (res) {

  var color = (res.ok) ? 'green' : 'red';

  assertCount +=1;

  if (res.ok) {
    (firstTestDone)
      ? out.push(chalk[color]('.'))
      : outPush(chalk[color]('.'));

    firstTestDone = true;
  }
  if (!res.ok) {
    out.push(chalk[color]('x'));
  }
});

tap.on('extra', function (str) {

  if (str !== '') extra.push(str);
});

tap.on('output', function (res) {

  if (res.fail && res.fail.length || assertCount === 0) {
    outPush('\n\n\n');

    res.fail.forEach(function (failure) {
        outPush(chalk.white('---') + '\n');

        // Use the unwrapped out.push here as the raw error is already indented
        out.push(chalk.white(failure.error.raw) + '\n');

        outPush(chalk.white('...') + '\n');
    });

    errors = res.fail;
    outputExtra();

    statsOutput();

    outPush(chalk.red(res.fail.length + ' failed'));

    var past = (res.fail.length == 1) ? 'was' : 'were';
    var plural = (res.fail.length == 1) ? 'failure' : 'failures';

    outPush('\n\n');
    outPush(chalk.red('Failed Tests: '));
    outPush('There ' + past + ' ' + chalk.red(res.fail.length) + ' ' + plural + '\n\n');

    res.fail.forEach(function (error) {
      outPush('  ' + chalk.red('x') + ' ' + error.name + '\n');
    });

    outPush('\n');
  }
  else{
    statsOutput();

    outPush('\n');
    outPush(chalk.green('Pass!') + '\n');
  }

  function statsOutput () {

    outPush('\n\n')
    outPush(res.tests.length + ' tests\n');
    outPush(chalk.green(res.pass.length + ' passed\n'));
  }
});

function outputExtra () {

  console.log(extra.join('\n'));
}

out.pipe(process.stdout);

process.on('exit', function () {

  if (errors.length || assertCount === 0) {
    process.exit(1);
  }
});
