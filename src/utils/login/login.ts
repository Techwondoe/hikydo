#!/usr/bin/env node
import { start } from './server';

import * as yargs from 'yargs';

yargs
  .showHelpOnFail(true)
  .command('auth', 'Login to the application', async (argv) => {
    await start()
  }).demandCommand()
  .help()
  .argv;