"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("users", function (tbl) {
    tbl.increments();
    tbl.string("name", 128).notNullable().unique();
    tbl.string("username", 128).notNullable().unique().index();
    tbl.string("password", 256).notNullable().unique();
    tbl.string("phone-number", 256).notNullable().unique();
    tbl.text('address', 128).unsigned();
    tbl.enu('role', ['donor', 'volunteer', 'both', 'none']).defaultTo('both');
  }).createTable("foodItems", function (tbl) {
    tbl.increments();
    tbl.string("name", 128).notNullable().unique();
    tbl.string('type', 128).notNullable();
    tbl.string('quantity').notNullable();
  }).createTable("volunteer_donor_foodItem", function (tbl) {
    tbl.increments();
    tbl.string('pickupTime');
    tbl.integer("vol_id").unsigned().references("id").inTable('users').onDelete("RESTRICT").onUpdate("CASCADE");
    tbl.integer("donor_id").unsigned().references("id").inTable('users').onDelete("RESTRICT").onUpdate("CASCADE");
    tbl.integer("food_id").unsigned().references("id").inTable('foodItems').onDelete("RESTRICT").onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("volunteer_donor_foodItem").dropTableIfExists("foodItems").dropTableIfExists("donors").dropTableIfExists("volunteers").dropTableIfExists("users");
};