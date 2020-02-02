const knex = require('knex');
const config = require('../../knexfile.js');

const db = knex(config.development);
const TABLE_NAME = 'scenarios'
const TABLE_ID = 'scenarioId';

function getAll() {
    return db(TABLE_NAME)
            .where({ hidden: false })
            .catch((err) => {
                console.log(err);
            })
}

function getById(id) {
    return db(TABLE_NAME)
        .where( { id: Number(scenarioId) })
        .catch((err) => {
            console.log(err);
        });
}

async function insert(scenarioName) {
    return db(TABLE_NAME)
        .insert({
            scenarioName: scenarioName
        }).catch((err) => {
            console.log(err);
        })
}

function update(id, name) {
    if (id) {
        return updateFromName(id, name);
    }

    return updateFromId(name);
}

function updateFromId(scenarioId, scenarioName) {
    return db(TABLE_NAME)
        .where({[TABLE_ID]: scenarioId})
        .update({scenarioName: scenarioName})
        .catch((err) => {
            console.log(err);
        });
}

function updateFromName(oldName, newName) {
    return db(TABLE_NAME)
        .where({scenarioName: oldName})
        .update({scenarioName: newName})
        .catch((err) => {
            console.log(err);
        });
}

function remove(idOrName) {
    if (typeof idOrName === 'string') {
        return removeFromName(idOrName);
    } else if (typeof idOrName === 'number') {
        return removeFromId(idOrName);
    }

    return false;
}

function removeFromId(id) {
    return db(TABLE_NAME)
        .where(TABLE_ID, Number(id))
        .update({
            hidden: true
        })
        .catch((err) => {
            console.log(err);
        });
}

function removeFromName(name) {
    return db(TABLE_NAME)
        .where({'scenarioName': name})
        .update({
            hidden: true
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { 
    getAll,
    getById,
    insert,
    update,
    remove
}