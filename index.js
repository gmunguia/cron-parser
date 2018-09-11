#!/usr/bin/env node

const getStdin = require("get-stdin");

const program = require("./src/index.js");

getStdin()
  .then(config => program(process.argv[2], config))
  /* eslint-disable-next-line no-console */
  .then(console.log);
