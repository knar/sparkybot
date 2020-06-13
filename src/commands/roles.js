const helper = require('../lib/helper');

const BOT_ROLES = [
    'voicemaster',
]

function checkRoleCount(message, command, args) {
    if (command == 'rolecount') {
        const guild = message.guild;
        let roles = helper.allRolesFromName(guild, args[0].toLowerCase());
        roles = roles.sort(function(a, b){
            return a.name.length - b.name.length
        });

        if (roles !== null) {
            messageArray = [];
            let numRoles = 0;
            for (const [roleId, role] of roles) {
                if (BOT_ROLES.includes(role.name.toLowerCase())) { continue; }
                if (numRoles++ > 1) { break; }
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