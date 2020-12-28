"use strict";

var bcryptjs = require("bcryptjs");

exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables
  var rounds = process.env.BCRYPT_ROUNDS || 8; // hash the password

  return knex('users').insert([//   {
  //     "name": "Var",
  //     "username": "Varsh",
  //     "password": "Varsh1",
  //     "phoneNumber": "4507075000",
  //     "address": "123 First st, Hayward, CA"
  // },
  {
    "name": "Var",
    "username": "Varsh",
    "role": "both",
    "phoneNumber": "4507075000",
    "password": bcryptjs.hashSync("Varsh1", rounds)
  }, // {
  //   "name": "Pari",
  //   "username": "Parimala",
  //   "password": "pari1",
  //   "phoneNumber": "6507075000",
  //   "address": "123 First st, Hayward, CA",
  //   "role": "donor"
  // },
  {
    "name": "Pari",
    "username": "Parimala",
    "role": "donor",
    "phoneNumber": "6507075000",
    "password": bcryptjs.hashSync("pari1", rounds)
  }, // {
  //   "name": "Harry",
  //   "username": "Harry Potter",
  //   "password": "Potter1",
  //   "phoneNumber": "5007075000",
  //   "address": "123 First st, Hayward, CA",
  //   "role": "donor"
  // },
  {
    "name": "Harry",
    "username": "Harry Potter",
    "role": "donor",
    "phoneNumber": "5007075000",
    "password": bcryptjs.hashSync("Potter1", rounds)
  }, // {
  //   "name": "Gandalf",
  //   "username": "Gandalf",
  //   "password": "dalf1",
  //   "phoneNumber": "4087075000",
  //   "address": "123 First st, Hayward, CA",
  //   "role": "volunteer"
  // },
  {
    "name": "Gandalf",
    "username": "Gandalf",
    "role": "volunteer",
    "phoneNumber": "4087075000",
    "password": bcryptjs.hashSync("dalf1", rounds)
  }, // {
  //   "name": "Spencer",
  //   "username": "spencer",
  //   "password": "Spencer1",
  //   "phoneNumber": "5109009000",
  //   "address": "123 First st, Hayward, CA",
  //   "role": "donor"
  // },
  {
    "name": "Spencer",
    "username": "spencer",
    "role": "donor",
    "phoneNumber": "5109009000",
    "password": bcryptjs.hashSync("Spencer1", rounds)
  }, // {
  //   "name": "Christina",
  //   "username": "christina",
  //   "password": "Christina1",
  //   "phoneNumber": "5997075000",
  //   "address": "123 First st, Hayward, CA",
  //   "role": "volunteer"
  // }
  {
    "name": "Christina",
    "username": "christina",
    "role": "volunteer",
    "phoneNumber": "5997075000",
    "password": bcryptjs.hashSync("Christina1", rounds)
  }]);
}; // exports.seed = function(knex) {
//   return knex('table_name').del()/.truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
