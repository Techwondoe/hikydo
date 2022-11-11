import yargs from "yargs";
import {cleanupUnwantedArguments, objToStrMap, setHeadersFromArguments} from '../../utils/utils';
import axios from 'axios';

require("dotenv").config();

exports.command =  "delete",
exports.desc = "",
exports.builder = {

  "emailId":{
    describe: '',
     demandOption: true,
    type: 'string',
    },
  "X-Correlation-ID":{
    describe: 'Internal Request ID',
    
    type: 'string',
    },

    request_name:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
    request_profilePicture:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
    request_status:{
        describe: '',
         demandOption: true,
        type: 'string',

  },
  }

  exports.handler = async (argv: any) => {
    try{
      const map = cleanupUnwantedArguments(objToStrMap(argv));
      const payloadMap: any = {};
      let url = `${process.env.API_BASE_URL}/users/{emailId}`;
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

                            const response = await axios.delete(
                                url,
                                    {
                                        params: Object.fromEntries(map),
                                        headers: setHeadersFromArguments('delete', argv)
                                    }
                            );
        console.log(response.data)
            }
            catch (error: any) {
                console.log(error?.response.data)
            }
        }

