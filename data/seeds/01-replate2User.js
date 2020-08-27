const bcryptjs = require("bcryptjs");

exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables
  const rounds = process.env.BCRYPT_ROUNDS || 8;

  // hash the password
return knex('users').insert([
    //   {
    //     "name": "Var",
    //     "username": "Varsh",
    //     "password": "Varsh1",
    //     "phone-number": "4507075000",
    //     "address": "123 First st, Hayward, CA"
    // },
    {
      "name": "Var",
      "username": "Varsh",
      "role": "both",
      "phone-number": "4507075000",
      "password": bcryptjs.hashSync("Varsh1", rounds)
    },
    // {
    //   "name": "Pari",
    //   "username": "Parimala",
    //   "password": "pari1",
    //   "phone-number": "6507075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "donor"
    // },
    {
      "name": "Pari",
      "username": "Parimala",
      "role": "donor",
      "phone-number": "6507075000",
      "password": bcryptjs.hashSync("pari1", rounds)
    },
    // {
    //   "name": "Harry",
    //   "username": "Harry Potter",
    //   "password": "Potter1",
    //   "phone-number": "5007075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "donor"
    // },
    {
      "name": "Harry",
      "username": "Harry Potter",
      "role": "donor",
      "phone-number": "5007075000",
      "password": bcryptjs.hashSync("Potter1", rounds)
    },
    // {
    //   "name": "Gandalf",
    //   "username": "Gandalf",
    //   "password": "dalf1",
    //   "phone-number": "4087075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "volunteer"
    // },
    {
      "name": "Gandalf",
      "username": "Gandalf",
      "role": "volunteer",
      "phone-number": "4087075000",
      "password": bcryptjs.hashSync("dalf1", rounds)
    },
    // {
    //   "name": "Spencer",
    //   "username": "spencer",
    //   "password": "Spencer1",
    //   "phone-number": "5109009000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "donor"
    // },
    {
      "name": "Spencer",
      "username": "spencer",
      "role": "donor",
      "phone-number": "5109009000",
      "password": bcryptjs.hashSync("Spencer1", rounds)
    },
    // {
    //   "name": "Christina",
    //   "username": "christina",
    //   "password": "Christina1",
    //   "phone-number": "5997075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "volunteer"
    // }
    {
      "name": "Christina",
      "username": "christina",
      "role": "volunteer",
      "phone-number": "5997075000",
      "password": bcryptjs.hashSync("Christina1", rounds)
    }
    ]);
};

// exports.seed = function(knex) {
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
