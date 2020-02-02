const fs = require('fs');
const appRoot = require('app-root-path');
const nodemailer = require('nodemailer');
const config = require("../../../config.json");
const Discord = require("discord.js");
const dbUser = require('../../db/user');
const helper = require('../../lib/helper');
const roles = require('../../lib/roles');

function checkSendMessageToChannel(message, command, args) {
    if (command === 'submit') {
        const userString = helper.userStringFromMessage(message);
        const submissions = message.guild.channels.find(channel => channel.name === 'submissions');
        if (message.channel.name !== 'submit') {
            message.channel.send(userStringFromMessage + ', please submit in ' + submissions);
            return;
        }

        dbUser.insert(message.author.id, message.author.username);
        submissions.send(userString + ' has submitted scores')
            .then(message => {
                message.react('✅')
                    .then(() => message.react('❌'))
                    .catch(() => console.log('failed to react with emoji for score submission'));

                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id !== message.author.id;
                };

            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '✅') {
                        roles.addToRole(message, 'diamond')
                        message.edit(
                            message.content + '\n' +
                            'approved by ' + helper.userStringFromId(filter.arguments[1])
                        )
                    } else if (reaction.emoji.name === '❌'){
                        message.reply('rejected');
                    }
                })
                .catch(error => {
                    console.log(error)
                    message.reply(error);
                });
                    });
            }
}

module.exports = { checkSendMessageToChannel };