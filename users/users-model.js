const db = require("../database/connection");

module.exports = {
  find,
  findBy,
};

function find() {
  return db("users");
}

function findBy(prop) {
  return db("users").where(prop).first();
}
