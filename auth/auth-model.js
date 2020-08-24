const db = require("../database/connection");

module.exports = {
  findBy,
  add,
};

function findBy(prop) {
  return db("users").where(prop).first();
}

function add(user) {
  return db("users").insert(user);
}
