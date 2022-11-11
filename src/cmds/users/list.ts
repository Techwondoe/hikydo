import yargs from "yargs";
import {cleanupUnwantedArguments, objToStrMap, setHeadersFromArguments} from '../../utils/utils';
import axios from 'axios';

require("dotenv").config();

exports.command =  "list",
exports.desc = "",
exports.builder = {

  "page":{
    describe: '',
     demandOption: true,
    type: 'number',
    },
  "limit":{
    describe: '',
     demandOption: true,
    type: 'number',
    },
  "X-Correlation-ID":{
    describe: 'Internal Request ID',
    
    type: 'string',
    },

  }

  exports.handler = async (argv: any) => {
    try{
      const map = cleanupUnwantedArguments(objToStrMap(argv));
      const payloadMap: any = {};
      let url = `${process.env.API_BASE_URL}/users`;
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

                        const response = await axios.get(
                            url,
                                {
                                    params: Object.fromEntries(map),
                                    headers: setHeadersFromArguments('get', argv)
                                }
                        );
        console.log(response.data)
            }
            catch (error: any) {
                console.log(error?.response.data)
            }
        }

