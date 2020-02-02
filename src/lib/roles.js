const rolesToNamesMap = {
    'diamond': ':gem: Diamond'
}

function addToRole(message, roleName) {
    const role = message.guild.roles.find(role => role.name === rolesToNamesMap[roleName]);
    message.member.addRole(role);
}

module.exports = { addToRole }