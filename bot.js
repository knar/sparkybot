const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const embedCommands = require('./src/commands/embeds');
const sensConvert = require('./src/commands/sensConvert');
const textCommands = require('./src/commands/text');
const sendMessageAsBot = require('./src/commands/sendMessage');
const customCommands = require('./src/commands/customCommand');
const submitCommands = require('./src/commands/score/submit');
const scoreCommands = require('./src/commands/score/scoreCommands')
const timeout = require('./src/commands/timeout');
const timeoutDb = require('./src/db/timeout');
const helper = require('./src/lib/helper');
const _ = require('lodash');

const SPARKY_VARIANTS = [
    'sparkyaimers',
    'sparkyaim',
    'sparky',
    'aim',
    'aimers'
];

const UPGRADE_VARIANTS = [
    'upgrade',
    'benchmark',
    'benchmarks',
    'graduate',
    'graduates'
];

const SUPPORT_VARIANTS = [
    'support',
    'donate'
];

const COMMAND_ARRAY = [
    SUPPORT_VARIANTS,
    UPGRADE_VARIANTS,
    SPARKY_VARIANTS,
]

const COMMAND_LIST = _.flatten([COMMAND_ARRAY]);
 
client.on("ready", () => {
  console.log("bot started");
});
 
client.on("message", message => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    if (['help', 'listcommands', 'commands'].includes(command)) {
        customCommands.listCommands(COMMAND_LIST, message, command, args);
    }

    if (UPGRADE_VARIANTS.includes(command)) {
        embedCommands.sendUpgradeEmbed(message);
    }
    
    if (SPARKY_VARIANTS.includes(command)) {
        embedCommands.sendSparkyAimEmbed(message);
    }

    if (command === 'mana') {
        message.channel.send('mana manages to manifest itself in shooters as an unknown entity... he is not a resource that can be used - he is the *user*');
    }
    
    if (SUPPORT_VARIANTS.includes(command)) {
        embedCommands.sendSupportSparkyEmbed(message);
    }

    try {
        textCommands.checkTextCommands(message, command, args);
        sensConvert.checkSensConvertCommands(message, command, args);
        customCommands.customCommands(message, command, args);
        submitCommands.submitScores(message, command, args);
        timeout.checkTimeout(message, command, args);
    } catch(error) {
        console.log(error);
    }

    if (!config.admin_ids.includes(message.author.id)) {
        return;
    }

    if (command === 'welcome') {
        embedCommands.sendWelcomeToChannel(message);
    }

    try {
        customCommands.createCommand(message,command, args);
        customCommands.deleteCommand(message,command, args);
        sendMessageAsBot.checkSendMessageToChannel(message, command, args);
        scoreCommands.checkCommands(message,command, args);
    } catch(error) {
        console.log(error);
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    // think there is an error when someone leaves a custom channel and the channel is deleted before
    // we can get the name of it, in that case just fail silently
    try {
        let newUserChannel = newMember.voiceChannel
        let oldUserChannel = oldMember.voiceChannel
        const guild = client.guilds.find(guild => guild.id === config.guild_id)
        const auditChannel = helper.channelFromName(guild, 'log-voice');

        let embed = new Discord.RichEmbed()
            .setTimestamp();

        let statusString = '';

        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            statusString += '*' + oldMember.displayName + '*' + ' entered ' + newUserChannel.name;
            embed.setTitle(statusString);
            embed.setColor('#7DD420');
            auditChannel.send(embed);
        } else if(newUserChannel === undefined){
            statusString += '*' + oldMember.displayName + '*' + ' left ' + oldUserChannel.name;
            embed.setTitle(statusString);
            embed.setColor('D8534E');
            auditChannel.send(embed);
        }
    } catch(error) {
        console.log(error);
    }
});
 
client.login(config.token);

/** crons - TODO refactor this to another file */
const CronJob = require('cron').CronJob;

var job = new CronJob('* * * * * *', async function() {
  const guild = client.guilds.find(guild => guild.id === config.guild_id)
  const rowsToBeProcessed = await timeoutDb.getAllForProcessing();
  for (const row of rowsToBeProcessed) {
      let member = helper.memberById(guild, row.discordId);
      if (!member) {
        const eventChannel = helper.channelFromName(guild, 'log-events');
        eventChannel.send(`tried to remove ${helper.userStringFromId(row.discordId)} from timeout role, but they left discord`);
        timeoutDb.process(row.discordId);
        continue;
      }
      let role = helper.roleFromName(guild, 'timeout')
      let removeMessage = `timeout role removed from ${helper.userStringFromId(member.id)}`
      member.removeRole(role, removeMessage)
      timeoutDb.process(member.id);

      const eventChannel = helper.channelFromName(guild, 'log-events');
      eventChannel.send(removeMessage);
  }

}, null, true, 'America/Los_Angeles');
job.start();