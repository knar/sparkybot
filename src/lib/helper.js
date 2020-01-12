function getChannelFromName(name, message) {
    return message.guild.channels.find(channel => channel.name === channelName);
}