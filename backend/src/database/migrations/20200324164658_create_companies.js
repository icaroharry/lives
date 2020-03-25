exports.up = function(knex) {
  return knex.schema.createTable("companies", table => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("instagram").notNullable();
    table.string("category").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("companies");
};
