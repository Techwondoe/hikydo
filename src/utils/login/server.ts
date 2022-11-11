import { debug } from "console";
import express from "express";
import { writeFileSync } from 'fs';
import * as dotenv from "dotenv";
import path from "path";
import open from "open";
const os = require("os");

dotenv.config();

const app = express();
const port = process.env.CLI_SERVER_PORT || 1123;

// starts the server
export const start = async () => {
    if (!process.env.AUTH_URL) {
        throw new Error("AUTH_URL is not present");    
    }

    await open(process.env.AUTH_URL);
    app.get('/callback', function (req, res) {
        res.sendFile(path.join(__dirname, './html_pages/callback.html'));
    });

    app.get('/', function (req, res) {
        const idToken = req.query?.id_token;
        if (req.query?.error_description.contains(""))
        createFile(String(idToken))
        console.log(`Access token has been fetched. Press control + c and type kydos`);        
        res.send();
    });

    const server = app.listen(port, function () {
        debug('Server listening on port ' + port)
    })

}

const createFile = (data: string) => {
    const userHomeDir = os.homedir();
    const filePath: string = process.env.CREDS_FILE || `${userHomeDir}/.kydos.token`
    const fullPath = path.resolve(filePath)
    writeFileSync(fullPath, JSON.stringify({
        id_token: data
    }), { flag: 'w' });
}