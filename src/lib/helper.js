/**
 * @param {*} discordId 
 */
function userStringFromMessage(message) {
    return '<@' + message.author.id + '>';
}

function userStringFromId(id) {
    return '<@' + id + '>';
}

function userIdFromString(string) {
    return string.match('<@(.*)>')[1]
}

function memberById(message, id) {
    return message.guild.members.get(id);
}

function channelFromName(message, channelName) {
    return message.guild.channels.find(channel => channel.name === channelName);
}

function checkAndWarnIfNotCommands(message) {
    if (message.channel.name !== 'commands') {
        message.channel.send(`${userStringFromMessage(message)}, please use this command in ${channelFromName(message, 'commands')}, I have sent it there for you`);
    }
}

module.exports = {
    userStringFromMessage,
    userStringFromId,
    userIdFromString,
    memberById,
    checkAndWarnIfNotCommands,
    channelFromName
}