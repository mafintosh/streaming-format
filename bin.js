#!/usr/bin/env node

var format = require('streaming-format')
var minimist = require('minimist')

var argv = minimist(process.argv)

process.stdin
  .pipe(format(function(key) {
    return argv[key]
  }))
  .pipe(process.stdout)