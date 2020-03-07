function timeUntilTimeout(timeoutTimeString) {
    const now = new Date();
    const timeoutDateTime = new Date(timeoutTimeString);

    var diffMs = (timeoutDateTime - now); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return diffMins;
}

module.exports = { timeUntilTimeout }