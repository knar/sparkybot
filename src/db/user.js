const knex = require('knex');
const config = require('../../knexfile.js');

const db = knex(config.development);
const USERS_DB_NAME = 'users'
const USERS_DB_ID = 'discordId';

function getAllUsers() {
    return db(USERS_DB_NAME);
}

function getByDiscordId(id) {
    return db(USERS_DB_NAME)
        .where( { id: Number(id) });
}

function insert(discordId, username) {
    return db(USERS_DB_NAME)
        .insert({
            discordId: discordId,
            username: username
        }).catch((err) => {
            console.log('user already exists');
        })
}

function update(discordId, username) {
    return db(USERS_DB_NAME)
        .where(USERS_DB_ID, Number(discordId))
        .update(username);
}

function remove(discordId) {
    return db(USERS_DB_NAME)
        .where(USERS_DB_ID, Number(discordId))
        .del();
}

module.exports = { 
    getAllUsers,
    getByDiscordId,
    insert,
    update,
    remove
}