
exports.up = async function(knex) {
    return await knex.schema
        .renameTable('clown', 'timeout');
};

exports.down = async function(knex) {
    await knex.schema
        .renameTable('timeout', 'clown')
};
