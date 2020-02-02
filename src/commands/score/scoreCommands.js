const dbScenarios = require('../../db/scenarios')
const helper = require('../../lib/helper')

function checkCommands(message, command, args) {
    if (command === 'addscenario') {
        addScenario(message, args);
    }

    if (command === 'hidescenario') {
        hideScenario(message, args);
    } 

    if (command === 'listscenarios') {
        listScenarios(message);
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
        ' created command: ' + args[0] +
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