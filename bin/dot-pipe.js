var through = require('through2');
var parser = require('tap-parser');
var duplexer = require('duplexer');
var chalk = require('chalk');

function strPadLen(str, char, len) {
  str = String(str);
  var space = fill(char, len - str.length);;
  return space + str;
}

function fill(char, len) {
  var str = '';
  for(var i=0; i < len; i++) { str += char; }
  return str;
}

module.exports = function dot() {
  if(typeof exporter !== 'object') { exporter = {}; }

  var out = through();
  var tap = parser();

  var stream = duplexer(tap, out);

  var currentTestName = '';
  var extra = [];
  var assertCount = 0;
  var lastComment;

  out.push('\n');

  function outPush (str) {
    out.push('  ' + str);
  };

  tap.on('comment', function (comment) {
    lastComment = comment;
  });

  tap.on('assert', function (res) {
    //console.log('test');
    var char = res.ok ? chalk.green('.') : chalk.red('x');
    (++assertCount > 1) ? out.push(char) : outPush(char);
  });

  tap.on('extra', function (str) {
    if (str !== '') extra.push(str);
  });

  tap.on('complete', function (res) {
    var fails = res.failures;
    var failCount = fails.length;

    if (failCount || !assertCount) {
      stream.failed = true;

      outPush('\n\n\n');

      fails.forEach(function (failure) {
          outPush(chalk.white('---') + '\n');
          var diag = failure.diag;
          var name = 'x ' + failure.name;
          var dashes = fill('-', name.length);

          outPush(chalk.red(name) + '\n');
          outPush(chalk.red(dashes) + '\n');
          outPush(chalk.cyan('  operator: ' + diag.operator) + '\n');
          outPush(chalk.cyan('  expected: ' + diag.expected) + '\n');
          outPush(chalk.cyan('  actual: ' + diag.actual) + '\n');
          outPush(chalk.cyan('  at: ' + diag.at) + '\n');

          outPush(chalk.white('...') + '\n');
      });

      outputExtra();

      statsOutput();

      var past = (failCount == 1) ? 'was' : 'were';
      var plural = (failCount == 1) ? 'failure' : 'failures';

      outPush('\n\n');
      outPush(chalk.red('Failed Tests: '));
      outPush('There ' + past + ' ' + chalk.red(failCount) + ' ' + plural + '\n\n');

      fails.forEach(function (error) {
        outPush('  ' + chalk.red('x ' + error.name) + '\n');
      });

      outPush('\n');
    } else {
      statsOutput();

      outPush('\n\n');
      outPush(chalk.green('Pass!') + '\n');
    }

    function statsOutput () {
      var total = String(res.count || 0);
      var pass = String(res.pass || 0);
      var fail = String(res.fail || 0);

      var max = Math.max(total.length, Math.max(pass.length, fail.length));

      outPush('\n\n')
      outPush(strPadLen(total, ' ', max) + ' tests\n');
      outPush(chalk.green(strPadLen(pass, ' ', max) + ' passed\n'));
      if(fail !== '0') { outPush(chalk.red(strPadLen(fail, ' ', max) + ' failed')); }
    }
  });

  function outputExtra () {
    console.log(extra.join('\n'));
  }

  return stream;
}
