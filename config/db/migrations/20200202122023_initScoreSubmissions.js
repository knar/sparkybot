
exports.up = function(knex) {
    return knex.schema.createTable('scoreSubmissions', tbl => {
        tbl
            .integer('submissionId')
            .notNullable();

        tbl
            .integer('scenarioId')
            .notNullable();
        
        tbl
            .decimal('score')
            .notNullable();

        tbl
            .foreign('submissionId')
            .references('userScoreSubmissions.submissionId');

        tbl
            .foreign('scenarioId')
            .references('scenarios.scenarioId');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('scoreSubmissions');
};
