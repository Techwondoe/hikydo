#!/usr/bin/env node
import * as yargs from 'yargs';

yargs
  .showHelpOnFail(true)
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv;