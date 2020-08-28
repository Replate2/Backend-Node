const knex = require("knex");

const knexfile = require("../knexfile.js");
const environment = process.env.NODE_ENV || "development";
// console.log('environment: ', environment);
// console.log('knexfile[environment]: ', knexfile[environment]);
module.exports = knex(knexfile[environment]);
