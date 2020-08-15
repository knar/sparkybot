const CronJob = require('cron').CronJob;
const sheets = require('../lib/sheets');
const config = require('../../config')

const sheetsId = '11tKkn64O_y_WYCHzYQKnnR2_eECSXKSJRQL4hfdGBmg';
const range = 'Sorted!A1:J1';
const roleName = 'Challenger';

function challengerJob(client) {
    return new CronJob('5 * * * * *', async function () {
        const guild = client.guilds.cache.get(config.guild_id);
        const challengerRole = guild.roles.cache.find(role => role.name === roleName);

        sheets.useSheetData(sheetsId, range, (rows) => {
            const tags = rows.flat();

            challengerRole.members.forEach(member => {
                if (!tags.includes(member.user.tag)) {
                    member.roles.remove(challengerRole);
                }
            });
            
            tags.map(t => memberFromTag(guild, t)).forEach(member => {
                if (member && !member.roles.cache.get(challengerRole)) {
                    member.roles.add(challengerRole);
                }
            }); 
        });
    }, null, true, 'America/Los_Angeles');
}

function memberFromTag(guild, tag) {
    return guild.members.cache.find(m => m.user.tag === tag);
}

module.exports = { challengerJob };