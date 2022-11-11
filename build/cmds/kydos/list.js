"use strict";
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
const utils_1 = require("../../utils/utils");
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
exports.command = "list",
    exports.desc = "",
    exports.builder = {
        "givenBy": {
            describe: 'email',
            type: 'string',
        },
        "receivedBy": {
            describe: 'email',
            type: 'string',
        },
        "startDate": {
            describe: 'Filter kydos rewarded on on the supplied start_date',
            type: 'string',
        },
        "endDate": {
            describe: 'Filter kydos rewarded before or on the supplied end_date',
            type: 'string',
        },
        "page": {
            describe: '',
            type: 'number',
        },
        "limit": {
            describe: '',
            type: 'number',
        },
        "X-Correlation-ID": {
            describe: 'Internal Request ID',
            type: 'string',
        },
    };
exports.handler = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const map = (0, utils_1.cleanupUnwantedArguments)((0, utils_1.objToStrMap)(argv));
        const payloadMap = {};
        let url = `${process.env.API_BASE_URL}/kydos`;
        map.forEach((value, key) => {
            //Remove path params
            if (url.includes(`{${key}}`)) {
                url = url.replace(`{${key}}`, value);
                map.delete(key);
            }
            //Remove payload params
            if (key.startsWith('request_')) {
                key = key.replace('request_', '');
                payloadMap[key] = value;
                map.delete(key);
            }
        });
        const response = yield axios_1.default.get(url, {
            params: Object.fromEntries(map),
            headers: (0, utils_1.setHeadersFromArguments)('get', argv)
        });
        console.log(response.data);
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.response.data);
    }
});
