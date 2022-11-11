import yargs from 'yargs';
import {cleanupUnwantedArguments, objToStrMap} from '../utils/utils';
import * as fse from 'fs-extra';

enum ENVIRONMENT {
  API_BASE_URL = 'apiBaseUrl',
  API_KEY = 'apiKey',
  BEARER_TOKEN = 'bearerToken',
}

yargs.command({
  command: 'set-env',
  describe: 'Set environment variables required by APIs',
  builder: {
    apiBaseUrl: {
      describe: 'Base path url used for making API calls',
      demandOption: true,
      type: 'string',
    },
    apiKey: {
      describe: 'Set this token if the API uses Bearer Token In the header ',
      demandOption: false,
      type: 'string',
    },
    bearerToken: {
      describe: 'Set this token if the API uses Bearer Token In the header ',
      demandOption: false,
      type: 'string',
    },
  },
  async handler(argv) {
    const map = cleanupUnwantedArguments(objToStrMap(argv));
    let data = '';
    map.forEach((value, key) => {
      const enumKey =
        Object.keys(ENVIRONMENT)[Object.values(ENVIRONMENT).indexOf(key)];
      if (enumKey) {
        data += `${enumKey}=${value}\n`;
      }
    });
    fse.writeFileSync('./.env', data);
  },
});
