const knex = require('knex');
const config = require('../../knexfile.js');

const db = knex(config.development);
const TABLE_NAME = 'users'
const TABLE_ID = 'discordId';

function getAll() {
    return db(TABLE_NAME);
}

function getById(id) {
    return db(TABLE_NAME)
        .where( { id: Number(id) });
}

function insert(discordId, username) {
    return db(TABLE_NAME)
        .insert({
            discordId: discordId,
            username: username
        }).catch((err) => {
            console.log('user already exists');
        })
}

function update(discordId, username) {
    return db(TABLE_NAME)
        .where(TABLE_ID, Number(discordId))
        .update(username);
}

function remove(discordId) {
    return db(TABLE_NAME)
        .where(TABLE_ID, Number(discordId))
        .del();
}

module.exports = { 
    getAll,
    getById,
    insert,
    update,
    remove
}