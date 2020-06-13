const helper = require('../lib/helper');

function checkRoleCount(message, command, args) {
    if (command == 'rolecount') {
        const guild = message.guild;
        const role = helper.roleFromName(guild, args[0]);
        if (role !== null) {
            const memberCount = guild.roles.get(role.id).members.size;
            message.channel.send(`${role.name} currently has ${memberCount} members`);
        } else {
            message.channel.send('no role with that name')
        }
    }
}

module.exports = { checkRoleCount };