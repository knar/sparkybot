const fs = require('fs');
const appRoot = require('app-root-path');
const nodemailer = require('nodemailer');
const config = require("../../config.json");
const Discord = require("discord.js");

const COMMAND_NAME = 0;
const CUSTOM_COMMANDS_FILE_PATH = appRoot + '/storage/customCommands.json';

function createCommand(message, command, args) {
    if (command === 'createcommand') {
        try {
            if (fs.existsSync(CUSTOM_COMMANDS_FILE_PATH)) {
                fs.readFile(CUSTOM_COMMANDS_FILE_PATH, 'utf8', function(err, data) {
                    if (err) {
                        console.log('cant read custom command file');
                        return;
                    }

                    if (args.length > 1) {
                        const commands = JSON.parse(data);
                        backupCommands(data);
                        const commandName = args[COMMAND_NAME];
                        const commandStringArray = args.slice(1);
                        const commandString = commandStringArray.join(' ');
                        commands[commandName] = commandString;

                        fs.writeFile(CUSTOM_COMMANDS_FILE_PATH, JSON.stringify(commands), function (err) {
                            if(err) {
                                console.log('create command error: ' + err);
                            }
                        });
                        message.channel.send('command created: ' + commandName);
                    } else {
                        message.channel.send('usage: `s-createcommand <name of command> <command message>`');
                    }
                    
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function customCommands(message, command, args) {
    fs.readFile(appRoot + '/storage/customCommands.json', 'utf8', function(err, data) {
        if (err) {
            console.log('cant read custom command file');
            return;
        }
        const commands = JSON.parse(data);

        for (commandName in commands) {
            if (command === commandName) {
                message.channel.send(commands[commandName]);
            }
        }
    });
}

function deleteCommand(message,command, args) {
    if (command === 'deletecommand') {
        try {
            if (fs.existsSync(CUSTOM_COMMANDS_FILE_PATH)) {
                fs.readFile(CUSTOM_COMMANDS_FILE_PATH, 'utf8', function(err, data) {
                    if (err) {
                        console.log('cant read custom command file');
                        return;
                    }

                    if (args.length === 1) {
                        const commands = JSON.parse(data);
                        backupCommands(data);
                        const commandName = args[COMMAND_NAME];
                        const commandStream = commands[commandName];
                        delete commands[commandName];

                        fs.writeFile(CUSTOM_COMMANDS_FILE_PATH, JSON.stringify(commands), function (err) {
                            if(err) {
                                console.log('create command error: ' + err);
                            }
                        });
                        message.channel.send('command deleted: ' + commandName + '\ncommand output: ' + commandStream);
                    } else {
                        message.channel.send('usage: `s-deletecommand <name of command to delete>`');
                    }
                    
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function listCommands(preCreatedCommandArray, message, command, args) {
    if (['help', 'listcommands', 'commands'].includes(command)) {
        if (message.channel.name !== 'commands') {
            message.channel.send("<@" + message.author.id + ">, please use this command in #commands, I have sent it there for you");
        }
        try {
            if (fs.existsSync(CUSTOM_COMMANDS_FILE_PATH)) {
                fs.readFile(CUSTOM_COMMANDS_FILE_PATH, 'utf8', function(err, data) {
                    if (err) {
                        console.log('cant read custom command file');
                        return;
                    }

                    const commands = JSON.parse(data);

                    const commandNameArray = [];
                    for (commandName in commands) {
                        commandNameArray.push(commandName);
                    }
                    commandNameArray.sort();
                    for (commandName of preCreatedCommandArray) {
                        commandNameArray.unshift(commandName);
                    }

                    descriptionString = '';
                    for (commandName of commandNameArray) {
                        if (typeof commandName === 'object') {
                            let commandString = commandName.sort();
                            commandString = commandString.join(", ");
                            descriptionString += commandName[0] + ': ' + commandString + '\n';
                        } else {
                            descriptionString += commandName + '\n';
                        }
                    }

                    let starting = new Discord.RichEmbed()
                        .setTitle("sparkybot commands")
                        .setColor("#8E5BAD")
                        .setDescription(descriptionString);

                    let channel = message.guild.channels.find(channel => channel.name === 'commands');
                    channel.send("<@" + message.author.id + ">\n");
                    channel.send(starting);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function backupCommands(commands) {
    if(!commands) {
        return;
    }
    let transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: config.email
    });
    
    const message = {
        from: 'sparkybot1234@gmail.com',
        to: 'jkieberking@gmail.com',
        subject: 'commands backup',
        html: commands,
    };
    transport.sendMail(message, function (err, info) {
        if(err) {
            console.log('error sending message: ' + err);
        }
     });
}

module.exports = { createCommand, customCommands, listCommands, deleteCommand };