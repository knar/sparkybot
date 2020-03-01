
exports.up = function(knex) {
    return knex.schema.createTable('userRoles', tbl => {
        tbl
            .string('discordId')
            .notNullable();
      
        tbl
            .text('roleName')
            .notNullable();

        tbl
            .foreign('discordId')
            .references('users.discordId');

        tbl
            .foreign('roleName')
            .references('roles.roleName');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('userRoles');
};
