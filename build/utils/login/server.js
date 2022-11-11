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
exports.start = void 0;
const console_1 = require("console");
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const open_1 = __importDefault(require("open"));
const os = require("os");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.CLI_SERVER_PORT || 1123;
// starts the server
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.AUTH_URL) {
        throw new Error("AUTH_URL is not present");
    }
    yield (0, open_1.default)(process.env.AUTH_URL);
    app.get('/callback', function (req, res) {
        res.sendFile(path_1.default.join(__dirname, './html_pages/callback.html'));
    });
    app.get('/', function (req, res) {
        var _a, _b;
        const idToken = (_a = req.query) === null || _a === void 0 ? void 0 : _a.id_token;
        if ((_b = req.query) === null || _b === void 0 ? void 0 : _b.error_description.contains(""))
            createFile(String(idToken));
        console.log(`Access token has been fetched. Press control + c and type kydos`);
        res.send();
    });
    const server = app.listen(port, function () {
        (0, console_1.debug)('Server listening on port ' + port);
    });
});
exports.start = start;
const createFile = (data) => {
    const userHomeDir = os.homedir();
    const filePath = process.env.CREDS_FILE || `${userHomeDir}/.kydos.token`;
    const fullPath = path_1.default.resolve(filePath);
    (0, fs_1.writeFileSync)(fullPath, JSON.stringify({
        id_token: data
    }), { flag: 'w' });
};
