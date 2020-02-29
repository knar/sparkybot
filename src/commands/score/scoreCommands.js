const dbScenarios = require('../../db/scenarios')
const helper = require('../../lib/helper')

function checkCommands(message, command, args) {
    return;
    if (command === 'scenarios') {
        const subCommand = args[0];
        const passedArgs = args.splice(1)
        if (subCommand === 'add') {
            addScenario(message, passedArgs);
        }
    
        if (subCommand === 'hide') {
            hideScenario(message, passedArgs);
        } 
    
        if (subCommand === 'list') {
            listScenarios(message);
        }
    }
}

async function addScenario(message, args) {
    const usage = 's-addscenario [scenario-name]'
    if (args.length !== 1) {
        message.channel.send(helper.userStringFromMessage(message) + ' usage: ' + usage);
    }
    if (typeof args[0] !== 'string') {
        message.channel.send(helper.userStringFromMessage(message) + ' usage: ' + usage);
    }

    const scenarioId = await dbScenarios.insert(args[0]);
    message.channel.send(
        helper.userStringFromMessage(message) + 
        ' created scenario: ' + args[0] +
        ' with id of: `' + scenarioId + '`');
}

async function hideScenario(message, args) {
    const usage = 's-deletscenario [scenario name|scenario id]'
    if (args.length !== 1) {
        message.channel.send(helper.userStringFromMessage(message) + ' usage: ' + usage);
    }

    result = await dbScenarios.remove(args[0])
    if (result) {
        message.channel.send(helper.userStringFromMessage(message) + ` scenario \`${args[0]}\` hidden`)
    } else {
        message.channel.send(helper.userStringFromMessage(message) + ' usage: ' + usage);
    }
}

async function listScenarios(message) {
    let scenariosArray = await dbScenarios.getAll();
    message.channel.send(JSON.stringify(scenariosArray))
    scenariosArray.sort((a, b) => {
        const upperA = a.scenarioName.toUpperCase();
        const uppserB = b.scenarioName.toUpperCase();
      
        let comparison = 0;
        if (upperA > uppserB) {
          comparison = 1;
        } else if (upperA < uppserB) {
          comparison = -1;
        }
        return comparison;
    })

    let messageToSend = `${helper.userStringFromMessage(message)}\n`;
    for (scenario of scenariosArray) {
        messageToSend += `\`${scenario.scenarioName}\` id: \`${scenario.scenarioId}\`\n`
    }

    message.channel.send(messageToSend);
}

module.exports = { checkCommands };