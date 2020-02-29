
exports.up = function(knex) {
    return knex.schema.createTable('clown', tbl => {
        tbl
            .increments('clownId')
        
        tbl
            .text('scenarioName')
            .unique()
            .notNullable();

        tbl
            .boolean('hidden')
            .defaultTo(false)
        tbl
            .enu(
                'type',
                [
                    'click',
                    'track',
                    'switch',
                    'move'
                ]
            )
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('clown');
};
