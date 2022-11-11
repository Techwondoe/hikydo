import yargs from "yargs";
import {cleanupUnwantedArguments, objToStrMap, setHeadersFromArguments} from '../../utils/utils';
import axios from 'axios';

require("dotenv").config();

exports.command =  "create",
exports.desc = "",
exports.builder = {

  "X-Correlation-ID":{
    describe: 'Internal Request ID',
    
    type: 'string',
    },

    request_name:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
    request_image:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
    request_kydosRequired:{
        describe: '',
         demandOption: true,
        type: 'number',

  },
    request_description:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
    request_externalLink:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
  }

  exports.handler = async (argv: any) => {
    try{
      const map = cleanupUnwantedArguments(objToStrMap(argv));
      const payloadMap: any = {};
      let url = `${process.env.API_BASE_URL}/rewards`;
        map.forEach((value:any, key:any) => {
            //Remove path params
            if (url.includes(`{${key}}`)) {
                url = url.replace(`{${key}}`, value);
                map.delete(key);
            }
            //Remove payload params
            if(key.startsWith('request_')){
                key=key.replace('request_','');
                payloadMap[key] = value;
                map.delete(key);
            }
            });

                const response = await axios.post(
                url,payloadMap,
                    {
                        params: Object.fromEntries(map),
                        headers: setHeadersFromArguments('post', argv)
                    }
            );
        console.log(response.data)
            }
            catch (error: any) {
                console.log(error?.response.data)
            }
        }

