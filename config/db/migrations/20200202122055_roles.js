
exports.up = function(knex) {
    return knex.schema.createTable('roles', tbl => {
        tbl
            .text('roleName')
            .unique()
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles');
};
