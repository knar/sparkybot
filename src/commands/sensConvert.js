/** Created by vF Cody
 *  https://github.com/codyhan94/iq-bot
 */

const toFixed = require('tofixed');
const helper = require('../lib/helper');

const yawMap = {
    "cs":           0.022,
    "csgo":         0.022,
    "quake":        0.022,
    "source":       0.022,
    "overwatch":    0.0066,
    "ow":           0.0066,
    "rainbow6":     0.00572957795130823,
    "reflex":       0.00572957795130823,
    "fn":           0.55550,
    "fortnite":     0.55550,
    "doom":         0.0439453125,
    "qcde":         0.0439453125,
};
  
const CM_PER_INCH = 2.54;
const MM_PER_INCH = CM_PER_INCH * 10;
  
// for now just use degrees and cm as units. can add conversion tables later if
// desired.

// GetCM(yaw, sens, dpi)
function GetCM(yaw, sens, dpi) {
    // save increment (degrees per count)
    let inc = yaw * sens;
    let counts_per_rev = 360 / inc;
    return counts_per_rev / dpi * CM_PER_INCH;
}
  
// GetSens(yaw, cm, dpi)
function GetSens(yaw, cm, dpi) {
    let counts_per_rev = cm / CM_PER_INCH * dpi;
    let inc = 360 / counts_per_rev;
    return inc / yaw;
}
  
function DegToSens(yaw, deg, dpi) {
    let inc = deg * MM_PER_INCH / dpi;  // deg/mm * mm/inch * inch/count = deg/count
    return inc / yaw;
    // one-line: return deg * MM_PER_INCH / dpi / yaw;
}
  
function SensToDeg(yaw, sens, dpi) {
    let inc = sens * yaw;
    return inc * dpi / MM_PER_INCH;  // deg/count * count/inch * inch/mm = deg/mm
    // one-line: return yaw * sens * dpi / MM_PER_INCH
}

function GetYaw(arg) {
    let yaw = parseFloat(arg);
    if (!isNaN(yaw)) {
        return yaw;
    }
    game = arg.toLowerCase();
    if (!(game in yawMap)) {
        // use 0 so we can check truthiness of return value, as nothing has 0 yaw
        return 0;
    }
    return yawMap[game];
}

const usage = `
    commands:
    s-cm [game | yaw] sens cpi -> cm/rev
    s-convert [game1 | yaw1] to [game2 | yaw2] sens1 -> sens2
    s-sens [game | yaw] cm cpi -> sens
    s-deg [game | yaw] sens cpi -> deg (deg = 36/cm)
    s-games -> list of supported games
`
function checkSensConvertCommands(message, command, args) {
    let send_msg = true;
    let yaw, out;

    switch(command) {
        case 'convert-usage':
            out = usage;
            break;
        case 'sens':
            if (args.length != 3) {
                out = usage;
                break;
            }

            yaw = GetYaw(args[0]);

            if (!yaw) {
                out = 'Supported games: ' + Object.keys(yawMap).join(',');
                break;
            }
            cm = args[1];
            dpi = args[2];
            out = GetSens(yaw, cm, dpi).toFixed(4).toString();
            break;
        case 'convert':
            if (args.length != 4) {
                out = usage;
                break;
            }
            yaw1 = GetYaw(args[0]);
            yaw2 = GetYaw(args[2]);
            if (!(yaw1 && yaw2)) {
                out = 'Supported games: ' + Object.keys(yawMap).join(',');
                break;
            }
            sens = parseFloat(args[3]);
            inc1 = sens * yaw1;
            out = (inc1 / yaw2).toFixed(4).toString();
            break;
        case 'cm':
            if (args.length != 3) {
                out = usage;
                break;
            }
            yaw = GetYaw(args[0]);
            if (!yaw) {
                out = 'Supported games: ' + Object.keys(yawMap).join(',');
                break;
            }
            sens = args[1];
            dpi = args[2];
            out = GetCM(yaw, sens, dpi).toFixed(4).toString();
            break;
        case 'deg':
            if (args.length != 3) {
                out = usage;
                break;
            }
            yaw = GetYaw(args[0]);
            if (!yaw) {
                out = 'Supported games: ' + Object.keys(yawMap).join(',');
                break;
            }
            sens = args[1];
            dpi = args[2];
            out = SensToDeg(yaw, sens, dpi).toFixed(4).toString();
            break;
        case 'calc':
            const expr = args.join('');
            const expr_valid = /^([-+]?\d+(\.\d*)?\s*?[-+/*^]?\s*?)*/;
            let match = expr.match(expr_valid);
            if (match.length <= 0 || match[0] != expr) {
                out = "invalid expression to calc";
                break;
            }
            out = String(eval(expr));
            break;
        case 'game':
        case 'games':
            out = 'Supported games: ' + Object.keys(yawMap).join(',');
            break;
        default:
            send_msg = false;
    }

    if (send_msg && out.length > 0) {
        helper.checkAndWarnIfNotCommands(message);
        // trim trailing comma and whitespace
        out = out.replace(/,\s*$/g, '');
        // construct reply mentioning the user
        let reply = helper.userStringFromMessage(message) + ": " + out;
        console.log(message)
        let chan = helper.channelFromName(message, 'commands');
    
        chan.send(reply);
    }
}

module.exports = { checkSensConvertCommands }