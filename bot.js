const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const embedCommands = require('./src/commands/embeds');
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", message => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    if (command === 'noc') {
        message.channel.send('meow');
    }

    if (command === 'crescendo') {
        message.channel.send('chad volleyballer');
    }
    
    if (command === 'upgrade') {
        embedCommands.sendUpgradeEmbed(message);
    }

    if (command === 'sparkyaimers') {
        embedCommands.sendSparkyAimEmbed(message);
    }

    if (command === 'mana') {
        message.channel.send('mana manages to manifest itself in shooters as an unknown entity... he is not a resource that can be used - he is the *user*');
    }

    if (!config.admin_ids.includes(message.author.id)) {
        return;
    }

    if (command === 'welcome') {
        embedCommands.sendWelcomeToChannel(message);
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    const auditChannel = client.channels.get('632982155835867168');

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
});
 
client.login(config.token);
