const CronJob = require('cron').CronJob;
const timeoutDb = require('../db/timeout');
const helper = require('../lib/helper');

function timeoutJob(client) {
    return new CronJob('5 * * * * *', async function() {
        const guild = client.guilds.find(guild => guild.id === config.guild_id);
        const eventChannel = helper.channelFromName(guild, 'log-events');
        const rowsToBeProcessed = await timeoutDb.getAllForProcessing();
        for (const row of rowsToBeProcessed) {
            helper.removeTimeoutForMemberId(
                guild,
                row['discordId'],
                'sparkybot',
                eventChannel
            );
        }
    }, null, true, 'America/Los_Angeles');
}

module.exports = timeoutJob;
