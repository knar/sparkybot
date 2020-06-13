const helper = require('../lib/helper');

function checkRoleCount(message, command, args) {
    if (command == 'rolecount') {
        const guild = message.guild;
        let roles = helper.allRolesFromName(guild, args[0].toLowerCase());
        roles = roles.sort(function(a, b){
            return a.name.length - b.name.length
        });

        if (roles !== null) {
            messageArray = [];
            for (const [roleId, role] of roles) {
                const memberCount = guild.roles.get(roleId).members.size;
                let membersMessage = (1 === memberCount) ? 'member' : 'members';
                messageArray.push(`**${role.name}** currently has **${memberCount}** **${membersMessage}**`);
            }

            message.channel.send(messageArray.join(' and '));
        } else {
            message.channel.send('no role with that name')
        }
    }
}

module.exports = { checkRoleCount };