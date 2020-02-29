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
    return string.match('<@[!]?(.*)>')[1]
}

function memberById(message, id) {
    return message.guild.members.get(id);
}

function checkAndWarnIfNotCommands(message) {
    if (message.channel.name !== 'commands') {
        useCommandInCommandsChannel(message);
    }
}

function useCommandInCommandsChannel(message) {
    message.channel.send(`${userStringFromMessage(message)}, please use this command in ${channelFromName(message, 'commands')}, I have sent it there for you`);
}

function getHighestAdminHelperRole(message) {
    return message.member.roles.find(role => {
        for (const adminHelper of ['owner', 'moderator', 'helper']) {
            if (role.name.toLowerCase().includes(adminHelper)) {
                return true;
            }
        }
    });
}

function roleFromName(message, roleName) {
    return message.guild.roles.find(role => {
        if (role.name.toLowerCase().includes(roleName)) {
            return true;
        }
    });
}

function channelFromName(message, channelName) {
    return message.guild.channels.find(channel => {
        if (channel.name.toLowerCase().includes(channelName)) {
            return true;
        }
    });
}

function getLinkToMessage(message) {
    const serverId = message.guild.id;
    const channelId = message.channel.id;
    const messageId = message.id;

    return `https://discordapp.com/channels/${serverId}/${channelId}/${messageId}`;
}

module.exports = {
    userStringFromMessage,
    userStringFromId,
    userIdFromString,
    memberById,
    checkAndWarnIfNotCommands,
    useCommandInCommandsChannel,
    getHighestAdminHelperRole,
    roleFromName,
    channelFromName,
    getLinkToMessage
}