const helper = require('../lib/helper');
const timeoutDb = require('../db/timeout');

const usage = [
    'usage:',
    's-timeout <@user> <time-in-minutes>',
].join('\n')

async function checkTimeout(message, command, args) {
    if (command === 'timeout') {
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
            const timeoutRole = helper.roleFromName(message.guild, 'timeout');

            await timeoutDb.insert(targetMemberId, args[1]);
            const reasonString = [
                `timeout role given to ${targetMember} by ${helper.userStringFromId(message.author.id)}`,
                `messagelink: ${helper.getLinkToMessage(message)}`
            ].join('\n');
            targetMember.addRole(timeoutRole, reasonString);
            const eventChannel = helper.channelFromName(message.guild, 'log-events');
            eventChannel.send(reasonString);
        }
    }
}

module.exports = { checkTimeout };