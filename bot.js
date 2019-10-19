const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", message => {
    const ppw = client.emojis.get("629879183497232454");
    
    const rules = message.channel.guild.channels.find(channel => channel.id === '583486075323023380');
    const roles = message.channel.guild.channels.find(channel => channel.id === '447204176393666570');
    const tweets = message.channel.guild.channels.find(channel => channel.id === '626189188831903806');
    const streams = message.channel.guild.channels.find(channel => channel.id === '295657100636323840');
    const clips = message.channel.guild.channels.find(channel => channel.id === '439237455053455360');
    const commands = message.channel.guild.channels.find(channel => channel.id === '601484132006232064');

    if (message.author.bot) return;
    if(!config.admin_ids.includes(message.author.id)) {
            return;
    }

    // This is where we'll put our code.
    if (message.content.indexOf(config.prefix) !== 0) return;
   
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'noc') {
      message.channel.send('meow');
    }

    if(command === 'welcome') {
        let embed = new Discord.RichEmbed()
            .setTitle("Welcome to Sparky :zap:")
            .setColor("#D13762")
            .setDescription('Sparky is a community based around self improvement, primarly in fps/shooters but not exclusively.');
        message.channel.send({embed});

        embed = new Discord.RichEmbed()
            .setTitle("Starting out :books:")
            .setColor("#8E5BAD")
            .setDescription(`:white_small_square: Read the ${rules} and self-assign ${roles}.
            :white_small_square: Fold / mute the categories/channels that you're not interested in.
            :white_small_square: Feel free to make use of our :video_game: Game Tips and :notebook_with_decorative_cover: Improving tips.
            :white_small_square: Post ${clips}, ${tweets} and ${streams} in the respective channels.
            :white_small_square: We got more than 3 music bots, check it out in ${commands}.
            :white_small_square: Try and match your name on discord with your in-game name.`);
        message.channel.send({embed});
            
        embed = new Discord.RichEmbed()
            .setTitle("Invite your friends :mailbox_with_mail:")
            .setColor ("#62C377")
            .setDescription(':small_blue_diamond: Perma invite link: https://discord.gg/cXQbNSE');
        message.channel.send({embed});

        embed = new Discord.RichEmbed()
            .setTitle("Sparky Aim :dart:")
            .setColor ("#2FCFC2")
            .setDescription(`An aim community centered around self-improvement, with the intend to improve/challenge both great and upcoming aimers.`);
        message.channel.send({embed});

        embed = new Discord.RichEmbed()
            .setTitle("Joining Sparky Aim :sparkling_heart:")
            .setColor ("#FFCD00")
            .setDescription(`Apply here: https://forms.gle/g4TrwSi8bbce1Xt2A`);
        message.channel.send({embed});

        embed = new Discord.RichEmbed()
            .setTitle("Skill rank benchmarks :bar_chart:")
            .setColor ("#FF2262")
            .setDescription(`In order to upgrade your skill rank, you have to graduate through the form. You can check out the benchmarks below to see if you're eligible for an upgrade. Benchmarks: http://bit.ly/2PdgZlm`);
        message.channel.send({embed});

        embed = new Discord.RichEmbed()
            .setTitle("Graduate :mortar_board:")
            .setColor ("#2F3137")
            .setDescription(`The skill ranks are seperate from sparky aim. Graduate here: http://bit.ly/2NvOVqY`);
        message.channel.send({embed});
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
