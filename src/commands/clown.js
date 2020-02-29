const helper = require('../lib/helper');

function checkClown(message, command, args) {
    if (command == 'clown') {
        if (null !== helper.getHighestAdminHelperRole(message)) {
            if (args.length !== 1) {
                return;
            }

            const targetMemberId = helper.userIdFromString(args[0]);
            if ('' === targetMemberId) {
                return
            }

            const targetMember = helper.memberById(message, targetMemberId);
            const clownRole = helper.roleFromName(message, 'clown');
            const reasonString = [
                `clown role given to ${targetMember} by ${helper.userStringFromId(message.author.id)}`,
                `messagelink: ${helper.getLinkToMessage(message)}`
            ].join('\n');
            targetMember.addRole(clownRole, reasonString);
            const eventChannel = helper.channelFromName(message, 'log-events');
            eventChannel.send(reasonString);
        }
    }
}

module.exports = { checkClown };