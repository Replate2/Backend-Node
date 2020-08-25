const db = require("../database/connection");

module.exports = {
  find,
  findBy,
};

function find() {
  return db("leftovers");
}

function findBy(prop) {
  return db("leftovers").where(prop);
}
