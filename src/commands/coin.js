function checkCoinCommand(message, command, args) {
    if (command === 'coin') {
        const headsTails = (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
        message.channel.send(headsTails);
    }
}

module.exports = { checkCoinCommand };