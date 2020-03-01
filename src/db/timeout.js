const knex = require('knex');
const config = require('../../knexfile.js');
const moment = require('moment');

const db = knex(config.development);
const TABLE_NAME = 'timeout'
const TABLE_ID = 'timeoutId';

async function getAllUnprocessed() {
    return db(TABLE_NAME)
        .where({
            ended: false
        })
}

async function getAllForProcessing() {
    return db(TABLE_NAME)
    .where('end', '<=', moment().format())
    .where({
        ended: false
    })
}

async function getById(id) {
    return db(TABLE_NAME)
        .where( { TABLE_ID: String(id) });
}

async function insert(discordUserId, minutes) {
    let dateTime = moment();
    dateTime.add(minutes, 'minute');

    return db(TABLE_NAME)
        .insert({
            discordId: discordUserId,
            end: dateTime.format()
        }).catch((err) => {
            console.log('error inserting timeout');
        })
}

async function process(discordId) {
    return db(TABLE_NAME)
        .where({'discordId': discordId})
        .update({
            ended: true,
        });
}

module.exports = { 
    getAllUnprocessed,
    getAllForProcessing,
    getById,
    insert,
    process
}