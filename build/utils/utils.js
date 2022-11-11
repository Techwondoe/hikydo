"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromFile = exports.setHeadersFromArguments = exports.cleanupUnwantedArguments = exports.objToStrMap = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const os = require("os");
function objToStrMap(obj) {
    const strMap = new Map();
    for (const k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
exports.objToStrMap = objToStrMap;
function cleanupUnwantedArguments(map) {
    map.delete('_');
    map.delete('$0');
    return map;
}
exports.cleanupUnwantedArguments = cleanupUnwantedArguments;
function setHeadersFromArguments(methodName, argv) {
    const headers = {};
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
    }
    else if (process.env.API_KEY) {
        headers['Authorization'] = process.env.API_KEY;
    }
    else if (process.env.BEARER_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.BEARER_TOKEN}`;
    }
    else {
        headers['Authorization'] = getTokenFromFile();
    }
    return headers;
}
exports.setHeadersFromArguments = setHeadersFromArguments;
function getTokenFromFile() {
    const userHomeDir = os.homedir();
    const filePath = process.env.CREDS_FILE || `${userHomeDir}/.kydos.token`;
    const fullPath = path_1.default.resolve(filePath);
    let token;
    try {
        const tokenObj = (0, fs_1.readFileSync)(fullPath);
        if (tokenObj) {
            const tokenJson = JSON.parse(tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.toString());
            const id_token = tokenJson === null || tokenJson === void 0 ? void 0 : tokenJson.id_token;
            token = `Bearer ${id_token}`;
            return token;
        }
    }
    catch (error) {
        throw new Error("execute login-kydos auth to get access token");
    }
}
exports.getTokenFromFile = getTokenFromFile;
