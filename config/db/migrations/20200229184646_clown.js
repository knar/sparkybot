
exports.up = function(knex) {
    return knex.schema.createTable('clown', tbl => {
        tbl
            .increments('clownId')
        tbl
            .string('discordId')
            .notNullable();
        tbl
            .timestamp('start')
            .defaultTo(knex.fn.now())
            .notNullable();
        tbl
            .timestamp('end')
            .notNullable();
        tbl
            .boolean('ended')
            .defaultTo(false);
        tbl
            .foreign('discordId')
            .references('users.discordId');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('clown');
};
