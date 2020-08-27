"use strict";

exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables
  return knex('users').insert([{
    "name": "Var",
    "username": "Varsh",
    "password": "Varsh1",
    "phone-number": "4507075000",
    "address": "123 First st, Hayward, CA"
  }, {
    "name": "Pari",
    "username": "Parimala",
    "password": "Varsh1",
    "phone-number": "6507075000",
    "address": "123 First st, Hayward, CA",
    "role": "donor"
  }, {
    "name": "Harry",
    "username": "Harry Potter",
    "password": "Potter1",
    "phone-number": "5007075000",
    "address": "123 First st, Hayward, CA",
    "role": "donor"
  }, {
    "name": "Gandalf",
    "username": "Gandalf",
    "password": "dalf1",
    "phone-number": "4087075000",
    "address": "123 First st, Hayward, CA",
    "role": "volunteer"
  }, {
    "name": "Spencer",
    "username": "spencer",
    "password": "Spencer1",
    "phone-number": "5007075000",
    "address": "123 First st, Hayward, CA",
    "role": "donor"
  }, {
    "name": "Christina",
    "username": "christina",
    "password": "Christina1",
    "phone-number": "5007075000",
    "address": "123 First st, Hayward, CA",
    "role": "volunteer"
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