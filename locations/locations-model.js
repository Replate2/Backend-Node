const db = require("../database/connection");

module.exports = {
  find,
  findBy,
};

function find() {
  return db("locations");
}

function findBy(prop) {
  return db("locations").where(prop);
}
