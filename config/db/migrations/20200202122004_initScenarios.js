
exports.up = function(knex) {
    return knex.schema.createTable('scenarios', tbl => {
        tbl
            .increments('scenarioId')
        
        tbl
            .text('scenarioName')
            .unique()
            .notNullable();

        tbl
            .boolean('hidden')
            .defaultTo(false)
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('scenarios');
};
