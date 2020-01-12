const fs = require('fs');
const appRoot = require('app-root-path');

function checkTextCommands(message, command, args) {
    if (command === 'dot') {
        fs.readFile(appRoot + '/storage/s-dot.txt', 'utf8', function(err, data) {
            if (err) {
                console.log('cant read file');
                return;
            }
            message.channel.send(data);
        });
    }
}

module.exports = { checkTextCommands };