import {ArgumentsCamelCase} from 'yargs';
import { readFileSync } from 'fs';
import path from "path";
const os = require("os");

export function objToStrMap(obj: { [x: string]: any }): Map<any, any> {
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

export function cleanupUnwantedArguments(map: Map<any, any>) {
  map.delete('_');
  map.delete('$0');
  return map;
}

export function setHeadersFromArguments(
    methodName: string,
    argv: ArgumentsCamelCase
) {
  const headers: { [k: string]: any } = {};
  if (methodName === 'post' || methodName === 'put') {
    if (argv.contentTypeHeader) {
      headers['Content-Type'] = argv.contentTypeHeader;
    }
  }
  if (argv.acceptHeader) {
    headers['Accept'] = argv.acceptHeader;
  }
  if (argv.authorizationHeader) {
    headers['Authorization'] = argv.authorizationHeader;
  } else if (process.env.API_KEY) {
    headers['Authorization'] = process.env.API_KEY;
  } else if (process.env.BEARER_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.BEARER_TOKEN}`;
  } else {
    headers['Authorization'] = getTokenFromFile();
  }
  return headers;
}


export function getTokenFromFile () {
  const userHomeDir = os.homedir();
  const filePath: string = process.env.CREDS_FILE || `${userHomeDir}/.kydos.token`
  const fullPath = path.resolve(filePath)
  let token;
  try {
    const tokenObj = readFileSync(fullPath);
    if (tokenObj) {
      const tokenJson =JSON.parse(tokenObj?.toString())
      const id_token = tokenJson?.id_token
      token = `Bearer ${id_token}` 
      return token  
    }} catch (error) {
    throw new Error("execute login-kydos auth to get access token")
  }

}