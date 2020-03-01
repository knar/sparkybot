
exports.up = function(knex) {
    return knex.schema.createTable('scores', tbl => {
        tbl
            .string('discordId')
            .unique()
            .notNullable();

        tbl
            .integer('scenarioId')
            .unique()
            .notNullable();
        
        tbl
            .decimal('score')
            .notNullable()

        tbl
            .foreign('discordId')
            .references('users.discordId');

        tbl
            .foreign('scenarioId')
            .references('scenarios.scenarioId');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('scores');
};
