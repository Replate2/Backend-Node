exports.up = function (knex) {
  return knex.schema
    .createTable("locations", (tbl) => {
      tbl.increments();
      tbl
        .integer("owned_by")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.string("name", 255).notNullable();
    })
    .createTable("leftovers", (tbl) => {
      tbl.increments();
      tbl
        .integer("location_id")
        .unsigned()
        .notNullable()
        .references("locations.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.string("name", 255).notNullable();
      tbl.integer("quantity").unsigned().notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("leftovers")
    .dropTableIfExists("locations");
};
