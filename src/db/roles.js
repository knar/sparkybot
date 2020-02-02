const knex = require('knex');
const config = require('../../knexfile.js');

const db = knex(config.development);
const TABLE_NAME = 'roles'
const TABLE_ID = 'roleName';

function getAll() {
    return db(TABLE_NAME);
}

function getById(id) {
    return db(TABLE_NAME)
        .where( { id: String(id) });
}

function insert(roleName) {
    return db(TABLE_NAME)
        .insert({
            roleName: roleName
        }).catch((err) => {
            console.log('role already exists');
        })
}

function update(oldRoleName, newRoleName) {
    return db(TABLE_NAME)
        .where(TABLE_ID, String(oldRoleName))
        .update(newRoleName);
}

function remove(roleName) {
    return db(TABLE_NAME)
        .where(TABLE_ID, String(roleName))
        .del();
}

module.exports = { 
    getAll,
    getById,
    insert,
    update,
    remove
}