const CHANNEL_NAME = 0;

function checkSendMessageToChannel(message, command, args) {
    const channelName = args[CHANNEL_NAME];
    const messageArray = args.slice(1);
    const messageString = messageArray.join(' ');

    if (args.length > 1) {
        let channel = message.guild.channels.find(channel => channel.name === channelName);
        console.log( JSON.stringify(message.guild.channels));
        channel.send(messageString);
    } else {
        message.channel.send('usage: `s-message <channel-name> <message>`');
    }
}

module.exports = { checkSendMessageToChannel };