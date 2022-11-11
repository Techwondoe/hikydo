"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const utils_1 = require("../utils/utils");
const fse = __importStar(require("fs-extra"));
var ENVIRONMENT;
(function (ENVIRONMENT) {
    ENVIRONMENT["API_BASE_URL"] = "apiBaseUrl";
    ENVIRONMENT["API_KEY"] = "apiKey";
    ENVIRONMENT["BEARER_TOKEN"] = "bearerToken";
})(ENVIRONMENT || (ENVIRONMENT = {}));
yargs_1.default.command({
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
    handler(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = (0, utils_1.cleanupUnwantedArguments)((0, utils_1.objToStrMap)(argv));
            let data = '';
            map.forEach((value, key) => {
                const enumKey = Object.keys(ENVIRONMENT)[Object.values(ENVIRONMENT).indexOf(key)];
                if (enumKey) {
                    data += `${enumKey}=${value}\n`;
                }
            });
            fse.writeFileSync('./.env', data);
        });
    },
});
