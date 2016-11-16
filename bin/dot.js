#!/usr/bin/env node

var dot = require('./dot-pipe')();

process.stdin
  .pipe(dot)
  .pipe(process.stdout);

process.on('exit', function (status) {
  if(dot.failed || status === 1) { process.exit(1); }
});
