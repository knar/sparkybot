const fs = require('fs');

function checkTextCommands(message, command, args) {
    if (command === 'TeXit') {
        message.channel.send('beep boop hello brother beep boop');
    }

    if (command === 'noc') {
        message.channel.send('meow');
    }

    if (command === 'tony') {
        message.channel.send('chad volleyballer');
    }

    if (command === 'dot') {
        fs.readFile('../../storage/s-dot.txt', 'utf8', function(err, data) {
            if (err) {
                return;
            }
            message.channel.send('data');
        });
    }
}

module.exports = { checkTextCommands };