
exports.up = function(knex) {
    return knex.schema.createTable('roles', tbl => {
        tbl
            .integer('discordId')
            .notNullable();
      
        tbl
            .text('roleName')
            .notNullable();

        tbl
            .foreign('discordId')
            .references('users.discordId');
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles');
  };
  