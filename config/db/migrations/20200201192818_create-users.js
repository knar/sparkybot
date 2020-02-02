
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl
        .integer('discordId')
        .unique()
        .notNullable();
    
    tbl
        .text('username')
        .notNullable();

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
