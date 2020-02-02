
exports.up = function(knex) {
    return knex.schema.createTable('scoreSubmissionHistory', tbl => {
        tbl
            .timestamp('timestamp')
            .defaultTo(knex.fn.now())
            .notNullable();

        tbl
            .integer('submissionId')
            .notNullable();
        
        tbl
            .boolean('approved')
            .notNullable()

        tbl
            .integer('reviewer')
            .notNullable();
        

        tbl
            .foreign('submissionId')
            .references('userScoreSubmissions.submissionId');

        tbl
            .foreign('reviewer')
            .references('users.discordId');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('scoreSubmissionHistory');
};
