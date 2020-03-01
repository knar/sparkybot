const helper = require('../lib/helper');
const clownDb = require('../db/clown');

const usage = [
    'usage:',
    's-clown <@user> <time-in-minutes>',
].join('\n')

async function checkClown(message, command, args) {
    if (command === 'clown') {
        if (null !== helper.getHighestAdminHelperRole(message)) {
            if (args.length !== 2) {
                message.channel.send(usage);
                return;
            }

            const targetMemberId = helper.userIdFromString(args[0]);
            if ('' === targetMemberId) {
                return
            }

            const targetMember = helper.memberById(message.guild, targetMemberId);
            const clownRole = helper.roleFromName(message.guild, 'clown');

            await clownDb.insert(targetMemberId, args[1]);
            const reasonString = [
                `clown role given to ${targetMember} by ${helper.userStringFromId(message.author.id)}`,
                `messagelink: ${helper.getLinkToMessage(message)}`
            ].join('\n');
            targetMember.addRole(clownRole, reasonString);
            const eventChannel = helper.channelFromName(message.guild, 'log-events');
            eventChannel.send(reasonString);
        }
    }
}

module.exports = { checkClown };