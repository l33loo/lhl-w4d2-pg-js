
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('public').createTable('milestones', function(table) {
      table.increments();
      table.date('date');
      table.text('event')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
