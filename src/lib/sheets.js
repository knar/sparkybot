const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = './config/sheets/token.json';
const CREDENTIALS_PATH = './config/sheets/credentials.json'

// Callback receives 2d array of data from spreadsheet
function useSheetData(sheetId, range, callback) {
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        return authorize(JSON.parse(content), (auth) => {
            const sheets = google.sheets({ version: "v4", auth });
            sheets.spreadsheets.values.get(
                {
                    spreadsheetId: sheetId,
                    range: range,
                },
                (err, res) => {
                    if (err) return console.log("The API returned an error: " + err);
                    const rows = res.data.values; 
                    if (rows.length) {
                        callback(rows)
                    }
                    else {
                        console.log('No data found.');
                    }
                }
            );
        });
    });
}

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                return console.error(
                    "Error while trying to retrieve access token",
                    err
                );
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

module.exports = { useSheetData }