import yargs from "yargs";
import {cleanupUnwantedArguments, objToStrMap, setHeadersFromArguments} from '../../utils/utils';
import axios from 'axios';

require("dotenv").config();

exports.command =  "give",
exports.desc = "",
exports.builder = {

  "X-Correlation-ID":{
    describe: 'Internal Request ID',
    
    type: 'string',
    },

    request_from:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
    request_to:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
    request_kydosPoints:{
        describe: '',
         demandOption: true,
        type: 'number',

  },
    request_message:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
  }

  exports.handler = async (argv: any) => {
    try{
      const map = cleanupUnwantedArguments(objToStrMap(argv));
      const payloadMap: any = {};
      let url = `${process.env.API_BASE_URL}/kydos`;
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

