
exports.up = function(knex) {
    return knex.schema
      .createTable("zoos", (tbl) => {
        tbl.increments();
        tbl.string("name", 255)
        .notNullable()
        .unique()
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')//CASCADE, RESTRICT, DO NOTHING, SET NULL
      })
      .createTable("species", (tbl) => {
        tbl.increments();
        tbl.string("name", 255).notNullable().unique()
        //Foreign key that references the id in tracks
        tbl.integer('zoo_id')
        .unsigned()
        .references('id')
        .inTable('zoos')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')//CASCADE, RESTRICT, DO NOTHING, SET NULL
      })
      .createTable("zoo_animals", (tbl) => {
          tbl.primary(["animal_id", "zoo_id"])
        // tbl.increments();
        // tbl.string("name", 255).notNullable().unique();
         tbl.integer("animal_id")
         .unsigned()
         .references("id")
         .inTable("animals")
         .onDelete('RESTRICT')
         .onUpdate('CASCADE')//CASCADE, RESTRICT, DO NOTHING, SET NULL

         tbl
           .integer("zoo_id")
           .unsigned()
           .references("id")
           .inTable("zoos")
           .onDelete('RESTRICT')
           .onUpdate('CASCADE')//CASCADE, RESTRICT, DO NOTHING, SET NULL
      })
      .createTable("animals", (tbl) => {
        tbl.increments();
        tbl.string("name", 255)
        .notNullable()
        .unique()
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')//CASCADE, RESTRICT, DO NOTHING, SET NULL
      });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('animals')
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos')
};
