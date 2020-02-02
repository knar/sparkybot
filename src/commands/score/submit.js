const dbUser = require('../../db/users');
const helper = require('../../lib/helper');
const scenarios = require('../../db/scenarios')

const usage = `
    s-submit [1st scenario name/id?] [1st score] [1st screenshot/video link]
    [2cnd scenario name/id?] [2cnd score] [2cnd screenshot/video link]
    ... add a newline for each new scenario you want to submit
`

function submitScores(message, command, args) {
    if (command === 'submit') {
        const userString = helper.userStringFromMessage(message);
        const submissions = message.guild.channels.find(channel => channel.name === 'submissions');
        if (message.channel.name !== 'submit') {
            message.channel.send(userStringFromMessage + ', please submit in ' + submissions);
            return;
        }
        dbUser.insert(message.author.id, message.author.username);



    }
}

function validateScoreSubmissions(submissions) {
    const scenariosMap = scenarios.getAll();
    console.log(scneariosMap)
    if ((submissions.lengh - 1) % 3 !== 0) {
        return 'missing either a scenario name, score, or proof somewhere in your submission';
    }

    // scenarioName/id
    
    
}

module.exports = { submitScores };