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

module.exports = {
    userStringFromMessage,
    userStringFromId,
    userIdFromString,
    memberById
}